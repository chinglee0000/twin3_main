# Design Document: Message-Focused Scroll Behavior

## Overview

This design addresses the scroll behavior issue in the ChatLayout component where widget messages cause the viewport to scroll to the bottom of the widget, hiding the contextual message text above. The solution modifies the auto-scroll logic to prioritize message text visibility by scrolling to the text message that precedes a widget, rather than scrolling to the bottom of the entire message list.

The implementation will be minimal and focused, modifying only the scroll behavior logic in the existing useEffect hook without requiring changes to message rendering, widget components, or other chat functionality.

## Architecture

The solution operates within the existing ChatLayout component architecture:

```
ChatLayout Component
├── State Management (messages, isTyping, suggestions)
├── Scroll Management
│   ├── scrollRef (existing - positioned at bottom)
│   ├── useEffect hook (modified - smart scroll target selection)
│   └── scrollIntoView behavior (existing - smooth animation)
└── Message Rendering (unchanged)
    ├── Text Messages
    ├── Card Messages
    └── Widget Messages
```

The key architectural change is in the scroll management layer, where we introduce intelligent scroll target selection based on message type analysis.

## Components and Interfaces

### Modified Component: ChatLayout

**Location:** `src/features/chat/ChatLayout.tsx`

**Modified Hook:**
```typescript
useEffect(() => {
    if (scrollRef.current && messages.length > 1) {
        // Determine scroll target based on message types
        const scrollTarget = determineScrollTarget(messages);
        scrollTarget.scrollIntoView({ behavior: 'smooth' });
    }
}, [messages, isTyping, suggestions]);
```

### New Helper Function: determineScrollTarget

**Purpose:** Analyzes the message list to determine the optimal scroll target

**Signature:**
```typescript
function determineScrollTarget(messages: Message[]): HTMLElement | null
```

**Logic:**
1. Check if the last message is a widget message (type === 'widget')
2. If yes, find the most recent non-widget message before it
3. Return a ref to that message element
4. If no widget at the end, return the existing scrollRef (bottom)

**Implementation Approach:**
- Add data attributes to message elements during rendering (e.g., `data-message-id`)
- Use `document.querySelector` to find the target message element by ID
- Fall back to scrollRef if no suitable target is found

## Data Models

### Message Type (Existing)

```typescript
interface Message {
    id: string;
    role: 'user' | 'assistant';
    type: 'text' | 'card' | 'widget';
    content: string;
    widget?: string;  // Widget type identifier
    cardData?: any;
    timestamp: number;
}
```

**Relevant Fields for Scroll Logic:**
- `type`: Determines if message is a widget
- `id`: Used to locate the DOM element for scrolling

### Scroll Target Selection Logic

**Decision Tree:**
```
Is last message a widget?
├─ Yes: Find preceding non-widget message
│   ├─ Found: Scroll to that message element
│   └─ Not found: Scroll to widget itself (fallback)
└─ No: Scroll to bottom (existing behavior)
```

## Correctness Properties


A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Widget Message Scroll Targeting

*For any* message sequence ending with a widget message, when the scroll logic executes, the viewport SHALL be positioned at the most recent non-widget message that precedes the widget (or at the widget itself if no preceding message exists).

**Validates: Requirements 1.1, 1.4, 3.1, 5.1, 5.2, 5.3**

**Rationale:** This property ensures that regardless of widget type or message sequence, the scroll behavior consistently prioritizes text message visibility. It combines widget detection, message sequence analysis, and scroll target selection into one comprehensive correctness guarantee.

### Property 2: Text Message Scroll Behavior Preservation

*For any* message sequence ending with a non-widget message (text or card), when the scroll logic executes, the viewport SHALL be positioned at the bottom of the message list.

**Validates: Requirements 1.3**

**Rationale:** This property ensures backward compatibility by verifying that the existing scroll behavior for text-only messages remains unchanged. It serves as a regression test for the default scroll behavior.

### Property 3: Smooth Scroll Parameter Configuration

*For any* scroll operation, the scrollIntoView call SHALL use `{ behavior: 'smooth' }` as its parameter.

**Validates: Requirements 2.1**

**Rationale:** This is a simple configuration check that ensures all scroll operations use smooth animation. While we cannot test the actual animation timing, we can verify the correct parameter is passed.

## Error Handling

### Edge Cases

**Case 1: Widget as First Message**
- Scenario: A widget message is added when the message list is empty or contains only the widget
- Handling: Scroll to the widget itself (no preceding text to show)
- Implementation: The `determineScrollTarget` function checks if a preceding message exists before attempting to scroll to it

**Case 2: Multiple Consecutive Widgets**
- Scenario: Multiple widget messages are added in sequence without intervening text
- Handling: Scroll to the most recent non-widget message before the widget sequence
- Implementation: The lookup logic searches backward through the message array until it finds a non-widget message

**Case 3: ScrollRef Not Available**
- Scenario: The scrollRef.current is null (component not mounted or ref not attached)
- Handling: Skip scroll operation silently
- Implementation: Existing null check in useEffect prevents errors

**Case 4: Message Element Not Found**
- Scenario: The target message ID doesn't match any DOM element
- Handling: Fall back to scrolling to scrollRef (bottom)
- Implementation: `determineScrollTarget` returns scrollRef as fallback when querySelector returns null

### Error Conditions

The implementation should handle these error conditions gracefully:

1. **Invalid Message ID**: If a message ID is malformed or missing, fall back to default scroll behavior
2. **DOM Query Failure**: If querySelector fails or returns null, use scrollRef as fallback
3. **Concurrent Updates**: If messages are updated rapidly, ensure the scroll target is calculated from the latest message state

## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests to ensure comprehensive coverage:

**Unit Tests** focus on:
- Specific examples of message sequences (text → widget, multiple widgets, etc.)
- Edge cases (widget as first message, no preceding text)
- Integration with existing features (isTyping, suggestions)
- Error conditions (missing refs, invalid IDs)

**Property-Based Tests** focus on:
- Universal properties that hold for all message sequences
- Randomized message type combinations
- Widget type variations
- Message list length variations

Together, these approaches provide comprehensive coverage: unit tests catch concrete bugs in specific scenarios, while property tests verify general correctness across all possible inputs.

### Property-Based Testing Configuration

**Library:** fast-check (for TypeScript/React projects)

**Configuration:**
- Minimum 100 iterations per property test
- Each test references its design document property
- Tag format: `Feature: message-focused-scroll-behavior, Property {number}: {property_text}`

**Test Structure:**
```typescript
// Example property test structure
describe('Property 1: Widget Message Scroll Targeting', () => {
  it('should scroll to preceding text message for any widget type', () => {
    fc.assert(
      fc.property(
        fc.array(messageGenerator), // Generate random message sequences
        fc.constantFrom('twin_matrix', 'active_task', 'wallet_binding'), // Widget types
        (messages, widgetType) => {
          // Test implementation
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Unit Test Coverage

**Test Cases:**
1. Widget message with preceding text → scrolls to text
2. Text message only → scrolls to bottom
3. Widget as first message → scrolls to widget
4. Multiple consecutive widgets → scrolls to last text before widgets
5. isTyping state change → maintains scroll behavior
6. Suggestions update → maintains scroll behavior
7. Smooth scroll parameter → verifies 'smooth' is used

### Integration Testing

**Manual Testing Scenarios:**
1. Trigger Twin Matrix widget and verify text visibility
2. Send multiple text messages and verify bottom scroll
3. Trigger different widget types and verify consistent behavior
4. Rapidly send messages and verify scroll stability

**Acceptance Testing:**
- User can see complete message text when Twin Matrix appears
- User can see complete message text for all widget types
- Text-only messages still scroll to bottom as before
- Smooth scrolling animation is visible

# Requirements Document

## Introduction

This feature addresses the scroll behavior issue when widget messages (such as Twin Matrix) appear in the chat interface. Currently, when a widget is displayed, the viewport automatically scrolls to the bottom of the widget, forcing users to scroll up to read the accompanying message text. This creates a poor user experience where the context (message text) is hidden below the viewport.

The desired behavior prioritizes message text visibility, allowing users to see the complete message first, then discover widget content by scrolling down themselves. This approach maintains consistency across all chat interactions where text messages remain the primary focus.

## Glossary

- **Chat_System**: The chat interface component that displays messages and widgets
- **Widget_Message**: A message object with type='widget' that renders an interactive component (e.g., Twin Matrix, Active Task, etc.)
- **Text_Message**: A message object with type='text' or type='card' that displays textual content
- **Viewport**: The visible area of the chat interface where messages are displayed
- **ScrollRef**: A React ref element positioned at the bottom of the message list used for auto-scrolling
- **Message_Text**: The textual content that precedes or accompanies a widget, providing context to the user

## Requirements

### Requirement 1: Message Text Visibility Priority

**User Story:** As a user, I want to see the complete message text when a widget appears, so that I understand the context before viewing the widget content.

#### Acceptance Criteria

1. WHEN a Widget_Message is added to the chat, THE Chat_System SHALL scroll the Viewport to display the Text_Message that precedes the widget
2. WHEN a Widget_Message is added to the chat, THE Chat_System SHALL NOT scroll the Viewport to the bottom of the Widget_Message
3. WHEN a Text_Message without a widget is added, THE Chat_System SHALL maintain the existing scroll behavior (scroll to bottom)
4. WHEN multiple messages are added simultaneously (text followed by widget), THE Chat_System SHALL scroll to the top of the Text_Message

### Requirement 2: Smooth Scroll Behavior

**User Story:** As a user, I want smooth scrolling transitions when new messages appear, so that the interface feels polished and I can track content changes.

#### Acceptance Criteria

1. WHEN the Chat_System scrolls to display a message, THE Chat_System SHALL use smooth scrolling animation
2. WHEN the scroll target changes, THE Chat_System SHALL complete the scroll animation within 500ms

### Requirement 3: Widget Type Agnostic

**User Story:** As a developer, I want the scroll behavior to work consistently for all widget types, so that I don't need to implement custom scroll logic for each widget.

#### Acceptance Criteria

1. WHEN any Widget_Message is rendered (twin_matrix, active_task, wallet_binding, etc.), THE Chat_System SHALL apply the same message-focused scroll behavior
2. THE Chat_System SHALL NOT require widget-specific scroll configuration

### Requirement 4: Backward Compatibility

**User Story:** As a developer, I want the new scroll behavior to not break existing functionality, so that other chat features continue to work correctly.

#### Acceptance Criteria

1. WHEN the isTyping indicator is displayed, THE Chat_System SHALL maintain existing scroll behavior
2. WHEN suggestions are updated, THE Chat_System SHALL maintain existing scroll behavior
3. WHEN the user manually scrolls, THE Chat_System SHALL NOT override the user's scroll position until a new message is added

### Requirement 5: Message Sequence Detection

**User Story:** As a system, I need to detect when a widget message follows a text message, so that I can apply the correct scroll target.

#### Acceptance Criteria

1. WHEN analyzing the message list, THE Chat_System SHALL identify Widget_Messages by checking if message.type equals 'widget'
2. WHEN a Widget_Message is detected, THE Chat_System SHALL locate the most recent non-widget message that precedes it
3. IF no preceding Text_Message exists, THEN THE Chat_System SHALL scroll to the Widget_Message itself

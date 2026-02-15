# Implementation Plan: Message-Focused Scroll Behavior

## Overview

This implementation plan converts the design into discrete coding tasks that modify the scroll behavior in ChatLayout.tsx. The approach is incremental: first implement the core scroll target selection logic, then add message element identification, integrate with the existing useEffect hook, and finally add comprehensive tests.

## Tasks

- [x] 1. Add data attributes to message elements for identification
  - Modify the message rendering logic in ChatLayout.tsx to add `data-message-id` attributes to each message container
  - Ensure the attribute is added to the outermost div of each message (text, card, and widget types)
  - Verify that message IDs are unique and correspond to the message.id field
  - _Requirements: 5.1, 5.2_

- [ ] 2. Implement determineScrollTarget helper function
  - [x] 2.1 Create the determineScrollTarget function
    - Write a function that takes the messages array and scrollRef as parameters
    - Return type should be HTMLElement | null
    - Place the function inside ChatLayout component (before the useEffect hook)
    - _Requirements: 5.1, 5.2, 5.3_
  
  - [x] 2.2 Implement widget detection logic
    - Check if the last message in the array has type === 'widget'
    - If not a widget, return scrollRef.current (existing behavior)
    - _Requirements: 5.1_
  
  - [x] 2.3 Implement preceding message lookup
    - When last message is a widget, iterate backward through messages array
    - Find the first message where type !== 'widget'
    - Use document.querySelector with data-message-id to get the DOM element
    - Return the found element or scrollRef.current as fallback
    - _Requirements: 5.2, 5.3_

- [x] 3. Integrate determineScrollTarget with useEffect hook
  - Modify the existing useEffect hook that handles scrolling
  - Replace direct scrollRef.current usage with determineScrollTarget call
  - Maintain the existing null check and smooth scroll behavior
  - Ensure the dependency array remains [messages, isTyping, suggestions]
  - _Requirements: 1.1, 1.3, 2.1_

- [x] 4. Checkpoint - Manual testing
  - Test with Twin Matrix widget to verify text message visibility
  - Test with text-only messages to verify bottom scroll still works
  - Test with different widget types (active_task, wallet_binding, etc.)
  - Ensure smooth scrolling animation is visible
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Write unit tests for determineScrollTarget function
  - [x] 5.1 Test widget message with preceding text
    - Create a message array with text message followed by widget message
    - Mock document.querySelector to return a mock element
    - Verify determineScrollTarget returns the text message element
    - _Requirements: 1.1_
  
  - [x] 5.2 Test text-only message sequence
    - Create a message array with only text messages
    - Verify determineScrollTarget returns scrollRef.current
    - _Requirements: 1.3_
  
  - [x] 5.3 Test widget as first message (edge case)
    - Create a message array with only a widget message
    - Verify determineScrollTarget returns scrollRef.current as fallback
    - _Requirements: 5.3_
  
  - [x] 5.4 Test multiple consecutive widgets
    - Create a message array with text, then multiple widgets
    - Verify determineScrollTarget returns the text message before the widget sequence
    - _Requirements: 5.2_
  
  - [x] 5.5 Test DOM element not found
    - Create a message array with widget
    - Mock document.querySelector to return null
    - Verify determineScrollTarget returns scrollRef.current as fallback
    - _Requirements: Error Handling_

- [ ]* 6. Write property-based tests
  - [ ]* 6.1 Property test for widget message scroll targeting
    - **Property 1: Widget Message Scroll Targeting**
    - **Validates: Requirements 1.1, 1.4, 3.1, 5.1, 5.2, 5.3**
    - Use fast-check to generate random message sequences ending with widgets
    - Generate random widget types (twin_matrix, active_task, wallet_binding, etc.)
    - Verify scroll target is always the preceding non-widget message
    - Run 100 iterations minimum
  
  - [ ]* 6.2 Property test for text message scroll behavior
    - **Property 2: Text Message Scroll Behavior Preservation**
    - **Validates: Requirements 1.3**
    - Use fast-check to generate random message sequences ending with text/card messages
    - Verify scroll target is always scrollRef.current (bottom)
    - Run 100 iterations minimum
  
  - [ ]* 6.3 Property test for smooth scroll parameter
    - **Property 3: Smooth Scroll Parameter Configuration**
    - **Validates: Requirements 2.1**
    - Mock scrollIntoView to capture the behavior parameter
    - Generate random message sequences
    - Verify all scrollIntoView calls use { behavior: 'smooth' }
    - Run 100 iterations minimum

- [ ] 7. Write integration tests for backward compatibility
  - [x] 7.1 Test with isTyping state changes
    - Simulate isTyping state changes with various message sequences
    - Verify scroll behavior remains correct
    - _Requirements: 4.1_
  
  - [x] 7.2 Test with suggestions updates
    - Simulate suggestions array updates with various message sequences
    - Verify scroll behavior remains correct
    - _Requirements: 4.2_

- [x] 8. Final checkpoint - Comprehensive testing
  - Run all unit tests and verify they pass
  - Run all property-based tests and verify they pass
  - Perform manual testing with all widget types
  - Verify no regressions in existing chat functionality
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- The implementation is minimal and focused on the scroll logic only
- No changes required to widget components or message rendering (except data attributes)

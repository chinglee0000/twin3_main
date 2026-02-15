# Implementation Plan: Onboarding Flow Completion

## Overview

本實作計劃將 Twin3 平台的完整 Onboarding Flow 分解為離散的編碼任務。實作將按照用戶流程的自然順序進行：Stage 1 (Landing) → Stage 2 (Binding & Verification) → Stage 3 (Verification Hub) → Stage 4 (Task & Rewards)。

每個任務都建立在前一個任務的基礎上，確保增量進展和早期驗證。測試任務標記為可選（*），以便快速實現 MVP。

## Tasks

- [ ] 1. Set up error handling infrastructure and types
  - Create `src/types/errors.ts` with AppError, BindingError, ReCaptchaError, WidgetError, ClaimError interfaces
  - Create `src/components/ErrorBoundary.tsx` for global error catching
  - Create `src/components/ErrorModal.tsx` reusable error display component
  - Add error state to appStore (lastError, pendingSync)
  - _Requirements: 3.2, 5.1, 5.2, 9.1, 13.1, 14.5, 19.1_

- [ ]* 1.1 Write property test for error state management
  - **Property 14: State Persistence and Recovery**
  - **Validates: Requirements 19.1, 19.2, 19.3, 19.4**

- [ ] 2. Implement Landing Page component
  - [ ] 2.1 Create `src/features/landing/LandingPage.tsx` component
    - Implement video player with HTML5 video element
    - Add playback controls (play, pause, volume, fullscreen)
    - Track video state (played, completed) in local state
    - Display introductory text based on contextId
    - _Requirements: 1.1, 1.2, 1.5_

  - [ ] 2.2 Add CTA button and navigation logic
    - Display "Prove Humanity to Claim" button after video interaction
    - Implement onClick handler to navigate to wallet binding
    - Adjust CTA text for KOL referral context
    - _Requirements: 1.3, 1.4_

  - [ ]* 2.3 Write unit tests for Landing Page
    - Test video player controls presence
    - Test CTA button display after video completion/skip
    - Test navigation on CTA click
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 3. Implement Wallet Binding flow
  - [ ] 3.1 Create wallet service layer
    - Create `src/services/walletService.ts`
    - Implement `connectMetaMask()` using window.ethereum
    - Implement `connectTelegramBot()` calling backend API
    - Implement `checkBindingConflict(address)` calling `/api/wallet/check-binding`
    - Implement `bindWallet(address, telegramId)` calling `/api/wallet/bind`
    - _Requirements: 2.2, 2.4, 3.1_

  - [ ] 3.2 Create WalletBindingFlow component
    - Create `src/features/wallet/WalletBindingFlow.tsx`
    - Display two binding options (MetaMask / Telegram Bot)
    - Implement MetaMask selection handler
    - Implement Telegram Bot selection handler
    - Handle binding success: update appStore (walletAddress, userStatus='registered')
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ] 3.3 Implement binding conflict error handling
    - Create `src/features/wallet/BindingErrorModal.tsx`
    - Check for conflicts before binding
    - Display conflict error message with conflicted account info
    - Provide "Try Another Wallet" and "Contact Support" options
    - Log conflict attempts to backend
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ]* 3.4 Write property test for wallet binding
    - **Property 1: Wallet Binding State Consistency**
    - **Validates: Requirements 2.3, 2.5, 2.6**

  - [ ]* 3.5 Write property test for binding conflict prevention
    - **Property 2: Binding Conflict Prevention**
    - **Validates: Requirements 3.1, 3.2, 3.3**

- [ ] 4. Integrate Google reCAPTCHA
  - [ ] 4.1 Set up reCAPTCHA service
    - Create `src/services/recaptchaService.ts`
    - Implement `executeV3(action)` using Google reCAPTCHA v3 API
    - Implement `executeV2()` for challenge fallback
    - Implement `verifyToken(token)` calling `/api/recaptcha/verify`
    - Add reCAPTCHA script to index.html
    - _Requirements: 4.1, 4.5, 4.6_

  - [ ] 4.2 Create ReCaptchaGate component
    - Create `src/features/verification/ReCaptchaGate.tsx`
    - Auto-trigger v3 after wallet binding
    - Display v2 challenge if v3 score < 0.5
    - Handle verification success: set reCaptchaVerified in appStore
    - Navigate to Matrix display on success
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [ ] 4.3 Implement reCAPTCHA error handling
    - Create `src/features/verification/VerificationErrorModal.tsx`
    - Handle v2 failure after 3 attempts
    - Handle network errors
    - Display specific error messages
    - Provide retry button
    - Log failures to backend
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ]* 4.4 Write property test for reCAPTCHA flow
    - **Property 3: reCAPTCHA Flow Progression**
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.4, 5.5**

- [ ] 5. Checkpoint - Ensure basic flow works
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implement Matrix initialization and animation
  - [ ] 6.1 Enhance Matrix initialization logic
    - Update `src/features/twin-matrix/TwinMatrixCard.tsx`
    - Initialize Matrix with first trait at (0,0) value 51 on reCAPTCHA success
    - Set initial Humanity_Score to 51
    - Update appStore.matrixData
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ] 6.2 Create Matrix animation controller
    - Create `src/features/twin-matrix/MatrixAnimationController.ts`
    - Implement `animateTrait(trait)` with fade-in + glow CSS animation
    - Implement `animateMultipleTraits(traits)` with 0.2s intervals
    - Implement `updateDimensionProgress(dimension, percentage)` with smooth transitions
    - Use correct dimension colors (Physical: Red, Digital: Blue, Social: Yellow, Spiritual: Teal)
    - _Requirements: 6.5, 11.1, 11.2, 11.3, 11.5_

  - [ ] 6.3 Add optional sound effects
    - Create `src/utils/audioUtils.ts`
    - Implement trait unlock sound using Web Audio API
    - Add mute/unmute toggle
    - _Requirements: 11.4_

  - [ ]* 6.4 Write property test for Matrix initialization
    - **Property 4: Matrix Initialization Consistency**
    - **Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5**

  - [ ]* 6.5 Write property test for trait animation sequencing
    - **Property 9: Trait Animation Sequencing**
    - **Validates: Requirements 11.1, 11.2, 11.3**

- [ ] 7. Implement Weighted Widget List
  - [ ] 7.1 Create widget data models and API integration
    - Update `src/types/verification.ts` with VerificationWidget, WidgetVerificationResult interfaces
    - Create `src/services/widgetService.ts`
    - Implement `getWidgetList()` calling `/api/widgets/list`
    - Implement `submitVerification(widgetId, data)` calling `/api/verification/submit`
    - _Requirements: 8.1, 10.1_

  - [ ] 7.2 Create WeightedWidgetList component
    - Create `src/features/verification/WeightedWidgetList.tsx`
    - Display all available widgets with name, description, time, boost value
    - Mark completed widgets as disabled and show "Completed" badge
    - Implement widget selection handler
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ] 7.3 Implement widget verification flow
    - Update existing widget components to use new verification flow
    - On verification success: update completedWidgets in appStore
    - Calculate new Humanity_Score by summing widget weights
    - Unlock corresponding Matrix traits
    - Trigger trait animations
    - _Requirements: 8.3, 8.5, 8.6_

  - [ ] 7.4 Implement widget error handling
    - Create `src/features/verification/WidgetErrorModal.tsx`
    - Display specific error messages (biometric, social media, network)
    - Provide "Retry" and "Choose Another Method" options
    - Log failures to backend
    - Ensure score never decreases on failure
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

  - [ ]* 7.5 Write property test for widget score calculation
    - **Property 5: Widget Completion Score Calculation**
    - **Validates: Requirements 8.5, 8.6, 10.1, 10.2**

  - [ ]* 7.6 Write property test for widget non-repeatability
    - **Property 6: Widget Non-Repeatability**
    - **Validates: Requirements 8.3, 8.4**

  - [ ]* 7.7 Write property test for score non-decreasing invariant
    - **Property 7: Score Non-Decreasing Invariant**
    - **Validates: Requirements 9.6**

- [ ] 8. Implement database sync with retry logic
  - [ ] 8.1 Create sync service
    - Create `src/services/syncService.ts`
    - Implement `syncToBackend(operation)` with exponential backoff retry (3 attempts)
    - Implement `queuePendingSync(operation)` to store failed operations in local storage
    - Implement `retryPendingSync()` to manually retry queued operations
    - Add pendingSync array to appStore
    - _Requirements: 10.3, 10.4, 10.5_

  - [ ] 8.2 Add sync UI indicators
    - Create `src/components/SyncIndicator.tsx` to show sync status
    - Display "Sync Now" button when pendingSync is not empty
    - Show sync progress and success/failure feedback
    - _Requirements: 10.6_

  - [ ]* 8.3 Write property test for database sync with retry
    - **Property 8: Database Sync with Retry**
    - **Validates: Requirements 10.4, 10.5, 10.6**

- [ ] 9. Enhance Chat Interface integration
  - [ ] 9.1 Update Chat Interface for Growth Hub
    - Update `src/features/chat/ChatLayout.tsx`
    - Display Chat Interface when user enters Growth Hub stage
    - Show current Humanity_Score and Matrix progress in chat sidebar
    - Ensure chat works in both web and TMA environments
    - _Requirements: 7.1, 7.4, 7.5_

  - [ ] 9.2 Implement chat message handling
    - Update `src/services/geminiService.ts` to handle verification context
    - Persist chat history in appStore for current session
    - Display AI responses with proper formatting
    - _Requirements: 7.2, 7.3, 7.6_

  - [ ]* 9.3 Write property test for chat interface functionality
    - **Property 18: Chat Interface Functionality**
    - **Validates: Requirements 7.2, 7.3, 7.4, 7.6**

- [ ] 10. Checkpoint - Ensure verification flow works
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Implement Task Threshold System
  - [ ] 11.1 Create task service and models
    - Create `src/types/task.ts` with Task, TaskAvailability interfaces
    - Create `src/services/taskService.ts`
    - Implement `getTaskList()` calling `/api/tasks/list`
    - Implement `checkTaskAvailability(taskId, score)` logic
    - Implement `getScoreGap(taskId, score)` calculation
    - Implement `suggestWidgets(scoreGap)` recommendation logic
    - _Requirements: 12.1, 12.2, 13.2, 13.3_

  - [ ] 11.2 Create TaskGate component
    - Create `src/features/tasks/TaskGate.tsx`
    - Display task list with threshold scores
    - Show "Available" or "Locked" status based on user score
    - Display progress indicator for locked tasks
    - Update availability in real-time as score changes
    - _Requirements: 12.1, 12.3, 12.4, 12.5, 12.6_

  - [ ] 11.3 Implement insufficient score modal
    - Create `src/features/tasks/InsufficientScoreModal.tsx`
    - Display error message when user attempts locked task
    - Show score gap calculation
    - Suggest specific widgets to reach threshold
    - Provide "View Verification Options" button
    - Prevent task initiation until threshold met
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

  - [ ]* 11.4 Write property test for task availability determination
    - **Property 10: Task Availability Determination**
    - **Validates: Requirements 12.2, 12.3, 12.4, 12.5**

  - [ ]* 11.5 Write property test for task initiation gate
    - **Property 11: Task Initiation Gate**
    - **Validates: Requirements 13.2, 13.3, 13.5**

- [ ] 12. Implement Airdrop Claim functionality
  - [ ] 12.1 Create airdrop service
    - Create `src/services/airdropService.ts`
    - Implement `claimAirdrop(taskId, walletAddress)` calling smart contract
    - Implement `getTransactionStatus(txHash)` to poll transaction status
    - Implement `estimateGas(taskId)` for gas estimation
    - _Requirements: 14.2_

  - [ ] 12.2 Create AirdropClaim component
    - Create `src/features/airdrop/AirdropClaim.tsx`
    - Display "Claim Airdrop" button for completed tasks
    - Show gas estimation before claim
    - Display transaction pending state with hash
    - Show success message with claimed amount on confirmation
    - Handle transaction failures with retry option
    - Update token balance in appStore after success
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6_

  - [ ]* 12.3 Write property test for airdrop claim transaction flow
    - **Property 12: Airdrop Claim Transaction Flow**
    - **Validates: Requirements 14.2, 14.3, 14.4, 14.6**

- [ ] 13. Implement Reward Dashboard
  - [ ] 13.1 Create reward service
    - Create `src/services/rewardService.ts`
    - Implement `getTokenBalance(walletAddress)` calling ERC20 contract
    - Implement `getCompletedTasks(userId)` calling `/api/user/tasks`
    - Implement `getPendingAirdrops(userId)` calling `/api/user/airdrops`
    - Implement `getTransactionHistory(walletAddress)` from backend or The Graph
    - Implement `getTokenPrice()` from CoinGecko API for USD conversion
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.6_

  - [ ] 13.2 Create RewardDashboard component
    - Create `src/features/rewards/RewardDashboard.tsx`
    - Display $twin3 token balance
    - Display completed tasks list with rewards
    - Display pending airdrops ready to claim
    - Display transaction history with timestamps and amounts
    - Display total earned rewards in USD equivalent
    - Provide "Refresh" button to update all data
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6_

  - [ ]* 13.3 Write property test for dashboard data completeness
    - **Property 21: Dashboard Data Completeness**
    - **Validates: Requirements 15.1, 15.2, 15.3, 15.4, 15.5, 15.6**

- [ ] 14. Implement Invite Friends functionality
  - [ ] 14.1 Create referral service
    - Create `src/services/referralService.ts`
    - Implement `generateReferralLink(userId)` calling `/api/referral/generate`
    - Implement `getReferralStats(userId)` calling `/api/referral/stats`
    - Implement `trackReferralClick(referralCode)` for analytics
    - _Requirements: 16.1, 16.4, 16.5_

  - [ ] 14.2 Create InviteFlow component
    - Create `src/features/invite/InviteFlow.tsx`
    - Generate unique referral link on component mount
    - Display referral link with copy button
    - Provide share buttons for Telegram, Twitter
    - Display referral stats (total referrals, successful, earnings)
    - Optional: Display referral leaderboard
    - _Requirements: 16.1, 16.2, 16.4, 16.6_

  - [ ] 14.3 Implement referral bonus logic (backend integration)
    - Ensure backend credits referrer when referee completes registration
    - Update appStore with referral bonus when credited
    - _Requirements: 16.3_

  - [ ]* 14.4 Write property test for referral link uniqueness
    - **Property 13: Referral Link Uniqueness**
    - **Validates: Requirements 16.1, 16.3**

- [ ] 15. Implement Community Join flow
  - [ ] 15.1 Create community service
    - Create `src/services/communityService.ts`
    - Implement `getCommunityLinks()` calling `/api/community/links`
    - Implement `trackCommunityJoin(userId, platform)` calling `/api/community/join`
    - Implement `creditJoinBonus(userId, platform)` for bonus award
    - _Requirements: 17.2, 17.4, 17.5_

  - [ ] 15.2 Create CommunityJoin component
    - Create `src/features/community/CommunityJoin.tsx`
    - Display prompt after first task completion
    - Show links for Telegram, Discord, Twitter with member counts
    - Display join bonus for each platform
    - Open links in new tab on click
    - Track join status and award bonus
    - Display upcoming community events
    - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5, 17.6_

  - [ ]* 15.3 Write property test for community join incentive
    - **Property 22: Community Join Incentive**
    - **Validates: Requirements 17.4, 17.5**

- [ ] 16. Implement Future Tasks Preview
  - [ ] 16.1 Enhance task list with future tasks section
    - Update `src/features/tasks/TaskGate.tsx`
    - Add "Coming Soon" section for future tasks
    - Display task name, launch date, potential rewards
    - Implement subscription toggle for notifications
    - Display countdown timer for tasks within 7 days
    - Prevent starting future tasks
    - _Requirements: 18.1, 18.2, 18.3, 18.5, 18.6_

  - [ ] 16.2 Implement task launch notifications (backend integration)
    - Ensure backend sends notifications to subscribed users when task launches
    - _Requirements: 18.4_

  - [ ]* 16.3 Write property test for future task non-startability
    - **Property 23: Future Task Non-Startability**
    - **Validates: Requirements 18.2, 18.3, 18.6**

- [ ] 17. Checkpoint - Ensure task and reward flows work
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 18. Implement responsive design and mobile optimization
  - [ ] 18.1 Add responsive CSS and media queries
    - Update `src/styles/components.css` with responsive breakpoints
    - Ensure all components render correctly from 320px to 2560px
    - Add touch-optimized controls for mobile (larger tap targets)
    - Implement swipe gestures where appropriate
    - _Requirements: 20.1, 20.2_

  - [ ] 18.2 Optimize Matrix visualization for mobile
    - Update `src/features/twin-matrix/TwinMatrixCard.tsx`
    - Scale Matrix grid appropriately on small screens
    - Maintain readability of trait values
    - Adjust cell size based on screen width
    - _Requirements: 20.3_

  - [ ] 18.3 Optimize Chat Interface for mobile
    - Update `src/features/chat/ChatLayout.tsx`
    - Use mobile-friendly layout with fixed input bar at bottom
    - Adjust message bubble sizes for mobile
    - _Requirements: 20.4_

  - [ ] 18.4 Add device detection and performance optimization
    - Create `src/utils/deviceUtils.ts`
    - Implement device type detection
    - Reduce animations on low-end devices
    - Support portrait and landscape orientations
    - _Requirements: 20.5, 20.6_

  - [ ]* 18.5 Write property test for responsive layout adaptation
    - **Property 15: Responsive Layout Adaptation**
    - **Validates: Requirements 20.1, 20.2, 20.3**

- [ ] 19. Implement state persistence and error recovery
  - [ ] 19.1 Enhance local storage persistence
    - Update appStore persist configuration
    - Ensure wallet binding, verifications, score persist across sessions
    - Implement state restoration on app launch
    - _Requirements: 19.2, 19.3_

  - [ ] 19.2 Implement state conflict resolution
    - Create `src/services/stateService.ts`
    - Implement `resolveStateConflict(localState, remoteState)` logic
    - Prioritize database state in conflicts
    - Sync local storage with resolved state
    - _Requirements: 19.4_

  - [ ] 19.3 Add recovery UI
    - Create `src/components/RecoveryModal.tsx`
    - Display "Resume" button if incomplete flow detected
    - Provide "Clear Cache and Restart" option in settings
    - _Requirements: 19.5, 19.6_

  - [ ]* 19.4 Write property test for state persistence and recovery
    - **Property 14: State Persistence and Recovery** (already tested in 1.1, but add session recovery scenarios)
    - **Validates: Requirements 19.1, 19.2, 19.3, 19.4**

- [ ] 20. Integration and final wiring
  - [ ] 20.1 Wire all components into main flow
    - Update `src/App.tsx` and `src/features/chat/ChatLayout.tsx`
    - Integrate Landing Page → Wallet Binding → reCAPTCHA → Matrix → Verification Hub → Tasks → Rewards
    - Ensure proper navigation between stages
    - Handle all error states with appropriate modals
    - _Requirements: All_

  - [ ] 20.2 Add flow state management
    - Update `src/config/flowConfigs.ts` with new flow steps
    - Ensure context-aware routing works with new components
    - Update AI system prompts for new stages
    - _Requirements: All_

  - [ ]* 20.3 Write integration tests for complete flow
    - Test end-to-end: Landing → Binding → Verification → Task → Claim
    - Test error recovery scenarios
    - Test state persistence across sessions
    - _Requirements: All_

- [ ] 21. Final checkpoint - Comprehensive testing
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties (100+ iterations each)
- Unit tests validate specific examples and edge cases
- Integration tests validate end-to-end flows
- All components should be implemented with TypeScript for type safety
- Use existing patterns from the codebase (Zustand for state, React components, etc.)

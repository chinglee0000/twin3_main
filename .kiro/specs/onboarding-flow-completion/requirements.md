# Requirements Document: Onboarding Flow Completion

## Introduction

Twin3 是一個 Web3 + AI 驅動的 KOL 任務平台，旨在通過多層次的人類驗證機制建立可信的用戶身份系統。本需求文檔定義了完整的用戶入口流程（Onboarding Flow），涵蓋從初次訪問到任務完成的所有階段。

目前系統已實作部分人類驗證功能（HumanVerification Widget、TwinMatrixCard、基礎 score 計算），但根據完整流程圖，仍缺少關鍵的入口頁面、錢包綁定、異常處理、任務達成等功能。

本文檔將這些缺失功能組織為 4 個主要階段的需求，確保系統能夠提供完整、流暢且具備錯誤處理能力的用戶體驗。

## Glossary

- **System**: Twin3 平台的前端應用程式
- **User**: 訪問 Twin3 平台的使用者
- **Landing_Page**: 用戶首次訪問時看到的介紹頁面
- **Wallet**: 區塊鏈錢包（如 MetaMask）或 Telegram Bot 託管錢包
- **Binding**: 將用戶的社交帳號（如 Telegram）與錢包地址關聯的過程
- **reCAPTCHA**: Google 提供的人機驗證服務
- **Widget**: 驗證方式的互動組件（如生物辨識、社交媒體驗證等）
- **Matrix**: 16x16 的特徵網格，視覺化用戶的人類特徵分數
- **Trait**: Matrix 中的單一特徵點
- **Humanity_Score**: 用戶的人類驗證總分
- **Task_Threshold**: 解鎖特定任務所需的最低分數
- **Airdrop**: 代幣空投獎勵
- **Off-chain_DB**: 後端資料庫，儲存用戶驗證狀態和特徵數據
- **TMA**: Telegram Mini App
- **Chat_Interface**: 與 AI 助手互動的聊天介面
- **Reward_Dashboard**: 顯示用戶獎勵和代幣餘額的儀表板

## Requirements

### Requirement 1: Landing Page with Video Introduction

**User Story:** 作為新訪客，我想要在進入平台時看到清晰的介紹影片和說明，以便了解 Twin3 的價值主張和如何開始。

#### Acceptance Criteria

1. WHEN a user visits the platform for the first time, THE System SHALL display a Landing Page with a video introduction
2. WHEN the video is playing, THE System SHALL provide playback controls (play, pause, volume, fullscreen)
3. WHEN the user finishes watching the video or skips it, THE System SHALL display a clear Call-to-Action button labeled "Prove Humanity to Claim"
4. WHEN the user clicks the CTA button, THE System SHALL navigate to the wallet binding flow
5. THE Landing_Page SHALL include a brief text introduction explaining the airdrop opportunity and verification process

### Requirement 2: Wallet Binding Flow

**User Story:** 作為新用戶，我想要選擇我偏好的錢包綁定方式（自託管或託管），以便開始使用平台並保護我的資產。

#### Acceptance Criteria

1. WHEN a user initiates the binding process, THE System SHALL display two binding options: "Self-Custody (MetaMask)" and "No Wallet (TG Bot)"
2. WHEN a user selects "Self-Custody (MetaMask)", THE System SHALL initiate a MetaMask connection request
3. WHEN MetaMask connection succeeds, THE System SHALL store the wallet address in the global store
4. WHEN a user selects "No Wallet (TG Bot)", THE System SHALL create a custodial wallet via Telegram Bot integration
5. WHEN wallet binding completes successfully, THE System SHALL update the user status to 'registered' in the global store
6. THE System SHALL persist the binding information to Off-chain_DB

### Requirement 3: Binding Conflict Error Handling

**User Story:** 作為系統管理員，我想要防止同一個錢包綁定到多個帳號，以維護帳號的唯一性和安全性。

#### Acceptance Criteria

1. WHEN a user attempts to bind a wallet address, THE System SHALL check if the wallet is already bound to another account
2. IF the wallet is already bound to a different account, THEN THE System SHALL display an error message: "This wallet is already linked to another account"
3. WHEN a binding conflict is detected, THE System SHALL prevent the binding operation and maintain the current state
4. WHEN a binding conflict error is displayed, THE System SHALL provide an option to "Try Another Wallet" or "Contact Support"
5. THE System SHALL log binding conflict attempts to Off-chain_DB for security monitoring

### Requirement 4: Google reCAPTCHA v3 Integration

**User Story:** 作為平台運營者，我想要整合 Google reCAPTCHA v3 來防止機器人攻擊，同時不影響真實用戶的體驗。

#### Acceptance Criteria

1. WHEN a user completes wallet binding, THE System SHALL automatically trigger a reCAPTCHA v3 verification in the background
2. WHEN reCAPTCHA verification succeeds (score >= 0.5), THE System SHALL proceed to display the Matrix
3. IF reCAPTCHA verification fails (score < 0.5), THEN THE System SHALL display a challenge-based reCAPTCHA v2 fallback
4. WHEN reCAPTCHA v2 challenge is completed successfully, THE System SHALL proceed to display the Matrix
5. THE System SHALL send the reCAPTCHA token to the backend API for server-side validation
6. THE System SHALL store the reCAPTCHA verification result in Off-chain_DB

### Requirement 5: reCAPTCHA Failure Handling

**User Story:** 作為用戶，當我的 reCAPTCHA 驗證失敗時，我想要清楚地了解原因並獲得重試的機會。

#### Acceptance Criteria

1. IF reCAPTCHA v2 challenge fails after 3 attempts, THEN THE System SHALL display an error message: "Verification failed. Please try again later or contact support."
2. WHEN reCAPTCHA fails due to network issues, THE System SHALL display: "Network error. Please check your connection and try again."
3. WHEN reCAPTCHA fails, THE System SHALL provide a "Retry" button to restart the verification process
4. WHEN reCAPTCHA fails, THE System SHALL log the failure reason to Off-chain_DB for analysis
5. THE System SHALL prevent users from proceeding to the Matrix view until reCAPTCHA verification succeeds

### Requirement 6: Initial Matrix Display

**User Story:** 作為通過基礎驗證的用戶，我想要看到我的初始 Matrix 狀態，以便了解我的起始人類特徵分數。

#### Acceptance Criteria

1. WHEN reCAPTCHA verification succeeds, THE System SHALL display a 16x16 Matrix grid
2. THE System SHALL initialize the Matrix with the first red square at position (0,0) with value 51/255
3. THE System SHALL display the initial Humanity_Score as 51
4. THE System SHALL update the global store with the initial Matrix data
5. THE System SHALL animate the appearance of the first lit trait with a fade-in effect

### Requirement 7: Chat Interface Integration

**User Story:** 作為用戶，我想要通過聊天介面與 AI 助手互動，以便獲得個性化的驗證指導和任務建議。

#### Acceptance Criteria

1. WHEN a user enters the Growth Hub stage, THE System SHALL display a Chat Interface
2. THE Chat_Interface SHALL support text input and display AI responses
3. WHEN a user sends a message, THE System SHALL call the Gemini API to generate a contextual response
4. THE Chat_Interface SHALL display the user's current Humanity_Score and Matrix progress
5. THE Chat_Interface SHALL be accessible from both web and TMA (Telegram Mini App) environments
6. THE System SHALL persist chat history in the global store for the current session

### Requirement 8: Weighted Widget List Implementation

**User Story:** 作為用戶，我想要看到多種驗證方式選項，並了解每種方式對我的人類分數的貢獻，以便選擇最適合我的驗證路徑。

#### Acceptance Criteria

1. WHEN a user views the verification options, THE System SHALL display a list of available widgets with their respective weights
2. THE System SHALL display each widget's name, description, estimated time, and Humanity Index boost value
3. WHEN a user completes a widget verification, THE System SHALL mark that widget as completed
4. THE System SHALL prevent users from repeating the same widget verification
5. THE System SHALL calculate the total Humanity_Score by summing all completed widget weights
6. THE System SHALL update the Matrix visualization in real-time as widgets are completed

### Requirement 9: Widget Verification Failure Handling

**User Story:** 作為用戶，當我的驗證嘗試失敗時（例如生物辨識不符），我想要了解失敗原因並獲得重試或選擇其他驗證方式的選項。

#### Acceptance Criteria

1. IF a widget verification fails, THEN THE System SHALL display a specific error message explaining the failure reason
2. WHEN biometric verification fails, THE System SHALL display: "Biometric verification failed. Please ensure good lighting and try again."
3. WHEN social media verification fails, THE System SHALL display: "Unable to verify your social media account. Please check your privacy settings."
4. WHEN a verification fails, THE System SHALL provide options to "Retry" or "Choose Another Method"
5. THE System SHALL log verification failures to Off-chain_DB for analysis
6. THE System SHALL NOT deduct points for failed verification attempts

### Requirement 10: Off-chain Database Updates

**User Story:** 作為系統架構師，我想要確保所有驗證狀態和用戶數據都正確同步到後端資料庫，以便支援跨設備訪問和數據分析。

#### Acceptance Criteria

1. WHEN a user completes a widget verification, THE System SHALL send the verification result to the backend API
2. THE System SHALL update Off-chain_DB with the new trait data and Humanity_Score
3. WHEN the database update succeeds, THE System SHALL confirm the update in the UI
4. IF the database update fails, THEN THE System SHALL retry up to 3 times with exponential backoff
5. IF all retry attempts fail, THEN THE System SHALL display an error message and store the update in local storage for later sync
6. THE System SHALL provide a manual "Sync Now" button to retry failed database updates

### Requirement 11: Trait Lighting Animation

**User Story:** 作為用戶，當我完成驗證並解鎖新特徵時，我想要看到視覺化的動畫效果，以獲得成就感和即時反饋。

#### Acceptance Criteria

1. WHEN a new trait is unlocked, THE System SHALL animate the corresponding Matrix cell with a fade-in and glow effect
2. THE animation SHALL last 0.8 seconds and use the appropriate dimension color (Physical: Red, Digital: Blue, Social: Yellow, Spiritual: Teal)
3. WHEN multiple traits are unlocked simultaneously, THE System SHALL animate them sequentially with 0.2 second intervals
4. THE System SHALL play a subtle sound effect when a trait is lit (optional, can be muted)
5. THE System SHALL update the dimension progress bars with smooth transitions

### Requirement 12: Task Threshold Checking

**User Story:** 作為用戶，我想要知道我的當前分數是否足以解鎖特定任務，以便規劃我的驗證路徑。

#### Acceptance Criteria

1. WHEN a user views a task, THE System SHALL display the required Task_Threshold score
2. THE System SHALL compare the user's current Humanity_Score with the Task_Threshold
3. IF the user's score is below the threshold, THEN THE System SHALL display the task as "Locked" with the required score
4. IF the user's score meets or exceeds the threshold, THEN THE System SHALL display the task as "Available"
5. THE System SHALL update task availability in real-time as the Humanity_Score changes
6. THE System SHALL display a progress indicator showing how close the user is to unlocking locked tasks

### Requirement 13: Insufficient Score Handling

**User Story:** 作為用戶，當我嘗試開始一個我分數不足的任務時，我想要收到清晰的提示並獲得提升分數的建議。

#### Acceptance Criteria

1. WHEN a user attempts to start a locked task, THE System SHALL display an error message: "Your Humanity Score is too low. Complete more verifications to unlock this task."
2. THE System SHALL display the score gap (e.g., "You need 50 more points")
3. THE System SHALL suggest specific widgets that can help reach the required score
4. THE System SHALL provide a "View Verification Options" button that navigates to the widget list
5. THE System SHALL prevent task initiation until the score requirement is met

### Requirement 14: Airdrop Claim Functionality

**User Story:** 作為完成任務的用戶，我想要能夠領取我的空投獎勵，並確認交易成功。

#### Acceptance Criteria

1. WHEN a user completes a task that qualifies for an airdrop, THE System SHALL display an "Claim Airdrop" button
2. WHEN the user clicks "Claim Airdrop", THE System SHALL initiate a blockchain transaction
3. WHEN the transaction is pending, THE System SHALL display a loading state with transaction hash
4. WHEN the transaction succeeds, THE System SHALL display a success message with the claimed amount
5. IF the transaction fails, THEN THE System SHALL display an error message and allow retry
6. THE System SHALL update the user's token balance in the Reward_Dashboard after successful claim

### Requirement 15: Reward Dashboard

**User Story:** 作為用戶，我想要在一個集中的儀表板中查看我的所有獎勵、代幣餘額和交易歷史。

#### Acceptance Criteria

1. WHEN a user navigates to the Reward Dashboard, THE System SHALL display the user's $twin3 token balance
2. THE Reward_Dashboard SHALL display a list of completed tasks with their respective rewards
3. THE Reward_Dashboard SHALL display pending airdrops that are ready to claim
4. THE Reward_Dashboard SHALL display a transaction history with timestamps and amounts
5. THE Reward_Dashboard SHALL provide a "Refresh" button to update balances from the blockchain
6. THE Reward_Dashboard SHALL display the user's total earned rewards in USD equivalent

### Requirement 16: Invite Friends Functionality

**User Story:** 作為用戶，我想要邀請朋友加入平台並獲得推薦獎勵，以便擴大我的網絡並賺取額外收益。

#### Acceptance Criteria

1. WHEN a user accesses the "Invite Friends" feature, THE System SHALL generate a unique referral link
2. THE System SHALL provide options to share the referral link via Telegram, Twitter, and copy to clipboard
3. WHEN a referred user completes registration, THE System SHALL credit the referrer with a referral bonus
4. THE System SHALL display the number of successful referrals and total referral earnings
5. THE System SHALL track referral conversions in Off-chain_DB
6. THE System SHALL display a leaderboard of top referrers (optional)

### Requirement 17: Community Join Flow

**User Story:** 作為新用戶，我想要加入 Twin3 社群以獲得支援、了解最新消息並與其他用戶互動。

#### Acceptance Criteria

1. WHEN a user completes their first task, THE System SHALL display a prompt to join the community
2. THE System SHALL provide links to join Telegram, Discord, and Twitter communities
3. WHEN a user clicks a community link, THE System SHALL open the respective platform in a new tab
4. THE System SHALL track which communities the user has joined in Off-chain_DB
5. THE System SHALL offer a small bonus (e.g., 10 points) for joining each community platform
6. THE System SHALL display upcoming community events and announcements

### Requirement 18: Future Tasks Preview

**User Story:** 作為用戶，我想要預覽即將推出的任務，以便規劃我的參與策略並保持對平台的興趣。

#### Acceptance Criteria

1. WHEN a user views the task list, THE System SHALL display a "Coming Soon" section for future tasks
2. THE System SHALL display the task name, estimated launch date, and potential rewards for future tasks
3. THE System SHALL allow users to "Subscribe" to notifications for specific future tasks
4. WHEN a future task becomes available, THE System SHALL notify subscribed users via Telegram or email
5. THE System SHALL display a countdown timer for tasks launching within 7 days
6. THE System SHALL prevent users from attempting to start future tasks

### Requirement 19: Error Recovery and State Persistence

**User Story:** 作為用戶，當我遇到錯誤或關閉應用程式時，我想要能夠從上次的狀態恢復，而不需要重新開始整個流程。

#### Acceptance Criteria

1. WHEN an error occurs during any flow step, THE System SHALL save the current state to local storage
2. WHEN a user returns to the application after closing it, THE System SHALL restore the last saved state
3. THE System SHALL persist wallet binding, completed verifications, and Humanity_Score across sessions
4. IF the local state conflicts with Off-chain_DB state, THEN THE System SHALL prioritize the database state and sync local storage
5. THE System SHALL provide a "Clear Cache and Restart" option in settings for troubleshooting
6. THE System SHALL display a "Resume" button if an incomplete flow is detected on app launch

### Requirement 20: Responsive Design and Mobile Optimization

**User Story:** 作為移動設備用戶，我想要在手機和平板上獲得與桌面相同的流暢體驗。

#### Acceptance Criteria

1. THE System SHALL render all UI components responsively on screen widths from 320px to 2560px
2. WHEN viewed on mobile devices, THE System SHALL use touch-optimized controls (larger tap targets, swipe gestures)
3. THE Matrix visualization SHALL scale appropriately on small screens while maintaining readability
4. THE Chat_Interface SHALL use a mobile-friendly layout with a fixed input bar at the bottom
5. THE System SHALL detect the device type and adjust animations for performance (reduce motion on low-end devices)
6. THE System SHALL support both portrait and landscape orientations on mobile devices

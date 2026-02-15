# Design Document: Onboarding Flow Completion

## Overview

本設計文檔定義了 Twin3 平台完整 Onboarding Flow 的技術實作方案。系統採用 React + TypeScript + Vite 技術棧，使用 Zustand 進行全局狀態管理，並整合 Google Gemini AI 提供智能對話體驗。

設計目標：
1. 提供流暢的四階段用戶入口體驗（Entry → Binding → Verification → Achievement）
2. 實作健全的錯誤處理機制（綁定衝突、reCAPTCHA 失敗、驗證失敗、分數不足）
3. 整合區塊鏈錢包（MetaMask）和 Telegram Bot 託管錢包
4. 實現即時的視覺反饋（Matrix 動畫、分數更新）
5. 支援跨設備狀態持久化和錯誤恢復

現有基礎：
- ✅ Global store (appStore) 管理 context 和 matrix 狀態
- ✅ TwinMatrixCard 視覺化組件
- ✅ HumanVerification 基礎 widgets
- ✅ Gemini AI 聊天服務
- ✅ Context-aware routing 系統

需要新增：
- Landing Page 組件
- Wallet Binding 流程
- reCAPTCHA 整合
- 完整的錯誤處理 UI
- Task threshold 檢查邏輯
- Airdrop claim 功能
- Reward Dashboard
- Invite 和 Community 功能

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Landing Page │  │ Wallet Flow  │  │ Verification │      │
│  │  Component   │→ │  Component   │→ │    Hub       │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         ↓                  ↓                  ↓              │
│  ┌──────────────────────────────────────────────────┐       │
│  │         Global State (Zustand Store)             │       │
│  │  - User Status    - Matrix Data                  │       │
│  │  - Wallet Address - Humanity Score               │       │
│  │  - Flow Progress  - Completed Verifications      │       │
│  └──────────────────────────────────────────────────┘       │
│         ↓                  ↓                  ↓              │
├─────────────────────────────────────────────────────────────┤
│                      Service Layer                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Wallet     │  │  reCAPTCHA   │  │   Backend    │      │
│  │   Service    │  │   Service    │  │   API        │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
         ↓                  ↓                  ↓
┌─────────────────────────────────────────────────────────────┐
│                    External Services                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   MetaMask   │  │    Google    │  │   Backend    │      │
│  │   Provider   │  │  reCAPTCHA   │  │   Database   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### Flow State Machine

```
[Anonymous User]
      ↓
[Landing Page] ──(skip)──→ [Wallet Binding]
      ↓                           ↓
   (watch video)          (select wallet type)
      ↓                           ↓
   [CTA Click] ──────────→ [Wallet Connection]
                                  ↓
                          (binding conflict?) ──Yes→ [Error: Conflict]
                                  ↓ No                      ↓
                          [reCAPTCHA v3] ←────────────(retry)
                                  ↓
                          (score >= 0.5?) ──No→ [reCAPTCHA v2]
                                  ↓ Yes              ↓
                          [Matrix Display] ←──(challenge pass)
                                  ↓
                          [Verification Hub]
                                  ↓
                          (complete widgets)
                                  ↓
                          [Score Check] ──(insufficient)→ [Suggest Widgets]
                                  ↓ (sufficient)
                          [Task Available]
                                  ↓
                          [Complete Task]
                                  ↓
                          [Claim Airdrop]
                                  ↓
                          [Reward Dashboard]
```

### Component Hierarchy

```
App
├── ChatLayout (existing)
│   ├── LandingPage (new)
│   │   ├── VideoPlayer
│   │   └── CTAButton
│   ├── WalletBindingFlow (new)
│   │   ├── WalletTypeSelector
│   │   ├── MetaMaskConnector
│   │   ├── TelegramBotConnector
│   │   └── BindingErrorModal
│   ├── ReCaptchaGate (new)
│   │   ├── ReCaptchaV3Wrapper
│   │   ├── ReCaptchaV2Fallback
│   │   └── VerificationErrorModal
│   ├── VerificationHub (enhanced)
│   │   ├── ChatInterface (existing)
│   │   ├── WeightedWidgetList (new)
│   │   ├── TwinMatrixCard (existing)
│   │   └── WidgetErrorModal (new)
│   ├── TaskGate (new)
│   │   ├── TaskCard
│   │   ├── ThresholdIndicator
│   │   └── InsufficientScoreModal
│   ├── AirdropClaim (new)
│   │   ├── ClaimButton
│   │   ├── TransactionStatus
│   │   └── SuccessAnimation
│   ├── RewardDashboard (new)
│   │   ├── TokenBalance
│   │   ├── TaskHistory
│   │   └── TransactionList
│   ├── InviteFlow (new)
│   │   ├── ReferralLinkGenerator
│   │   ├── ShareButtons
│   │   └── ReferralStats
│   └── CommunityJoin (new)
│       ├── PlatformLinks
│       └── JoinBonusIndicator
└── ErrorBoundary (new)
    └── ErrorRecoveryModal
```

## Components and Interfaces

### 1. Landing Page Component

**Purpose**: 首次訪問時的介紹頁面，包含影片和 CTA

**Interface**:
```typescript
interface LandingPageProps {
  onCTAClick: () => void;
  contextId: ContextId;
}

interface LandingPageState {
  videoPlayed: boolean;
  videoCompleted: boolean;
}
```

**Behavior**:
- 自動播放介紹影片（可跳過）
- 追蹤影片觀看狀態
- 顯示 "Prove Humanity to Claim" CTA
- 根據 contextId 調整文案（KOL referral 顯示推薦人）

### 2. Wallet Binding Flow

**Purpose**: 處理錢包連接和綁定邏輯

**Interface**:
```typescript
interface WalletBindingFlowProps {
  onBindingComplete: (walletAddress: string, bindingType: 'metamask' | 'telegram') => void;
  onBindingError: (error: BindingError) => void;
}

interface BindingError {
  type: 'conflict' | 'connection_failed' | 'user_rejected';
  message: string;
  conflictedAccount?: string;
}

interface WalletService {
  connectMetaMask(): Promise<string>;
  connectTelegramBot(): Promise<string>;
  checkBindingConflict(walletAddress: string): Promise<boolean>;
  bindWallet(walletAddress: string, telegramId: string): Promise<void>;
}
```

**Behavior**:
- 顯示兩種綁定選項（MetaMask / Telegram Bot）
- MetaMask: 調用 `window.ethereum.request({ method: 'eth_requestAccounts' })`
- Telegram Bot: 調用後端 API 創建託管錢包
- 在綁定前檢查衝突（調用 `/api/wallet/check-binding`）
- 綁定成功後更新 appStore.userStatus = 'registered'

### 3. reCAPTCHA Integration

**Purpose**: 防止機器人攻擊的人機驗證

**Interface**:
```typescript
interface ReCaptchaGateProps {
  onVerificationSuccess: (token: string) => void;
  onVerificationFailure: (error: ReCaptchaError) => void;
}

interface ReCaptchaError {
  type: 'low_score' | 'network_error' | 'max_attempts_exceeded';
  message: string;
  retryAllowed: boolean;
}

interface ReCaptchaService {
  executeV3(action: string): Promise<{ token: string; score: number }>;
  executeV2(): Promise<string>;
  verifyToken(token: string): Promise<boolean>;
}
```

**Behavior**:
- 綁定完成後自動觸發 reCAPTCHA v3
- v3 score >= 0.5: 直接通過
- v3 score < 0.5: 顯示 v2 challenge
- v2 失敗 3 次: 顯示錯誤並禁止重試 5 分鐘
- 驗證成功後調用 `/api/recaptcha/verify` 進行後端驗證

### 4. Weighted Widget List

**Purpose**: 顯示所有可用的驗證方式及其權重

**Interface**:
```typescript
interface WeightedWidgetListProps {
  widgets: VerificationWidget[];
  completedWidgets: string[];
  onWidgetSelect: (widgetId: string) => void;
}

interface VerificationWidget {
  id: string;
  name: string;
  description: string;
  icon: string;
  estimatedTime: string;
  humanityIndexBoost: number;
  category: 'physical' | 'digital' | 'social' | 'spiritual';
  enabled: boolean;
}

interface WidgetVerificationResult {
  success: boolean;
  widgetId: string;
  traitsUnlocked: MatrixTrait[];
  scoreGained: number;
  error?: WidgetError;
}

interface WidgetError {
  type: 'biometric_failed' | 'social_auth_failed' | 'network_error';
  message: string;
  retryable: boolean;
}
```

**Behavior**:
- 從後端 API 獲取 widget 列表（`/api/widgets/list`）
- 顯示每個 widget 的權重和預估時間
- 已完成的 widget 顯示為灰色並標記 "Completed"
- 點擊 widget 啟動對應的驗證流程
- 驗證成功後調用 `/api/verification/submit` 更新後端

### 5. Matrix Animation System

**Purpose**: 視覺化特徵解鎖的動畫效果

**Interface**:
```typescript
interface MatrixAnimationController {
  animateTrait(trait: MatrixTrait): Promise<void>;
  animateMultipleTraits(traits: MatrixTrait[]): Promise<void>;
  updateDimensionProgress(dimension: DimensionType, newPercentage: number): void;
}

interface MatrixTrait {
  row: number;
  col: number;
  value: number; // 0-255
  dimension: 'physical' | 'digital' | 'social' | 'spiritual';
  unlockTimestamp: number;
}
```

**Behavior**:
- 使用 CSS animations 實現 fade-in + glow 效果
- 動畫持續時間: 0.8 秒
- 多個 traits 依序動畫，間隔 0.2 秒
- 同時更新對應 dimension 的進度條（smooth transition）
- 可選音效（使用 Web Audio API）

### 6. Task Threshold System

**Purpose**: 檢查用戶分數是否滿足任務要求

**Interface**:
```typescript
interface TaskThresholdChecker {
  checkTaskAvailability(taskId: string, currentScore: number): TaskAvailability;
  getScoreGap(taskId: string, currentScore: number): number;
  suggestWidgets(scoreGap: number): VerificationWidget[];
}

interface TaskAvailability {
  taskId: string;
  available: boolean;
  requiredScore: number;
  currentScore: number;
  scoreGap: number;
  suggestedWidgets: VerificationWidget[];
}

interface Task {
  id: string;
  name: string;
  description: string;
  thresholdScore: number;
  reward: {
    amount: number;
    token: string;
  };
  estimatedTime: string;
}
```

**Behavior**:
- 從後端獲取任務列表和門檻（`/api/tasks/list`）
- 實時比較 `currentScore` 和 `task.thresholdScore`
- 分數不足時計算 gap 並推薦高權重 widgets
- 分數達標時顯示 "Start Task" 按鈕
- 嘗試開始鎖定任務時顯示 InsufficientScoreModal

### 7. Airdrop Claim Component

**Purpose**: 處理空投領取的區塊鏈交易

**Interface**:
```typescript
interface AirdropClaimProps {
  taskId: string;
  rewardAmount: number;
  onClaimSuccess: (txHash: string) => void;
  onClaimError: (error: ClaimError) => void;
}

interface ClaimError {
  type: 'insufficient_gas' | 'transaction_failed' | 'already_claimed';
  message: string;
  txHash?: string;
}

interface AirdropService {
  claimAirdrop(taskId: string, walletAddress: string): Promise<string>;
  getTransactionStatus(txHash: string): Promise<TransactionStatus>;
  estimateGas(taskId: string): Promise<number>;
}

interface TransactionStatus {
  status: 'pending' | 'confirmed' | 'failed';
  txHash: string;
  blockNumber?: number;
  confirmations: number;
}
```

**Behavior**:
- 點擊 "Claim Airdrop" 按鈕觸發
- 估算 gas fee 並顯示給用戶
- 調用智能合約的 `claimAirdrop(taskId)` 函數
- 顯示交易狀態（pending → confirmed）
- 交易確認後更新 RewardDashboard
- 失敗時顯示錯誤並允許重試

### 8. Reward Dashboard

**Purpose**: 集中顯示用戶的獎勵和交易歷史

**Interface**:
```typescript
interface RewardDashboardProps {
  walletAddress: string;
}

interface RewardDashboardState {
  tokenBalance: number;
  usdValue: number;
  completedTasks: CompletedTask[];
  pendingAirdrops: PendingAirdrop[];
  transactionHistory: Transaction[];
  loading: boolean;
}

interface CompletedTask {
  taskId: string;
  taskName: string;
  completedAt: number;
  reward: number;
  claimed: boolean;
}

interface PendingAirdrop {
  taskId: string;
  amount: number;
  claimableAt: number;
}

interface Transaction {
  txHash: string;
  type: 'claim' | 'transfer' | 'stake';
  amount: number;
  timestamp: number;
  status: 'confirmed' | 'pending' | 'failed';
}
```

**Behavior**:
- 從區塊鏈讀取 $twin3 餘額（調用 ERC20 `balanceOf`）
- 從後端 API 獲取任務歷史（`/api/user/tasks`）
- 顯示待領取的 airdrops
- 顯示交易歷史（從 The Graph 或後端索引）
- 提供 "Refresh" 按鈕手動更新數據
- 顯示 USD 等值（從 CoinGecko API 獲取價格）

### 9. Invite Friends Component

**Purpose**: 生成推薦連結並追蹤推薦獎勵

**Interface**:
```typescript
interface InviteFlowProps {
  userId: string;
  onShare: (platform: SharePlatform) => void;
}

interface ReferralData {
  referralCode: string;
  referralLink: string;
  totalReferrals: number;
  successfulReferrals: number;
  totalEarnings: number;
  referralBonus: number;
}

interface SharePlatform {
  name: 'telegram' | 'twitter' | 'clipboard';
  shareUrl: string;
  shareText: string;
}

interface ReferralService {
  generateReferralLink(userId: string): Promise<string>;
  getReferralStats(userId: string): Promise<ReferralData>;
  trackReferralClick(referralCode: string): Promise<void>;
  creditReferralBonus(referrerId: string, refereeId: string): Promise<number>;
}
```

**Behavior**:
- 生成唯一的推薦碼（`/api/referral/generate`）
- 構建推薦連結: `https://twin3.app?ref={referralCode}`
- 提供分享按鈕（Telegram、Twitter、複製連結）
- 顯示推薦統計（總推薦數、成功註冊數、總收益）
- 被推薦人完成註冊後，推薦人獲得獎勵（後端處理）
- 可選：顯示推薦排行榜

### 10. Community Join Component

**Purpose**: 引導用戶加入社群平台

**Interface**:
```typescript
interface CommunityJoinProps {
  onPlatformJoin: (platform: CommunityPlatform) => void;
}

interface CommunityPlatform {
  name: 'telegram' | 'discord' | 'twitter';
  link: string;
  memberCount: number;
  joinBonus: number;
  joined: boolean;
}

interface CommunityService {
  getCommunityLinks(): Promise<CommunityPlatform[]>;
  trackCommunityJoin(userId: string, platform: string): Promise<void>;
  creditJoinBonus(userId: string, platform: string): Promise<number>;
}
```

**Behavior**:
- 顯示三個社群平台（Telegram、Discord、Twitter）
- 每個平台顯示成員數和加入獎勵
- 點擊後在新分頁開啟社群連結
- 後端追蹤加入狀態（通過 OAuth 或手動確認）
- 加入後給予小額獎勵（如 10 分）
- 顯示即將到來的社群活動

## Data Models

### Global Store Schema (Zustand)

```typescript
interface AppStore {
  // User Identity
  userStatus: UserStatus;
  walletAddress?: string;
  telegramId?: string;
  bindingType?: 'metamask' | 'telegram';
  
  // Verification State
  humanityScore: number;
  matrixData: TwinMatrixData;
  completedWidgets: string[];
  reCaptchaVerified: boolean;
  
  // Flow Control
  contextId: ContextId;
  currentStep: string;
  completedSteps: string[];
  
  // Task State
  availableTasks: Task[];
  completedTasks: string[];
  pendingAirdrops: PendingAirdrop[];
  
  // Referral
  referralCode?: string;
  referredBy?: string;
  
  // Error Recovery
  lastError?: AppError;
  pendingSync: SyncOperation[];
  
  // Actions
  setWalletBinding: (address: string, type: 'metamask' | 'telegram') => void;
  setReCaptchaVerified: (verified: boolean) => void;
  addCompletedWidget: (widgetId: string, scoreGained: number) => void;
  updateMatrixData: (data: TwinMatrixData) => void;
  setTaskAvailability: (tasks: Task[]) => void;
  addPendingSync: (operation: SyncOperation) => void;
  clearPendingSync: (operationId: string) => void;
}
```

### Matrix Data Model

```typescript
interface TwinMatrixData {
  totalTraits: number; // 256
  discoveredTraits: number;
  journeyProgress: number; // 0-100%
  dimensions: {
    physical: DimensionData;
    digital: DimensionData;
    social: DimensionData;
    spiritual: DimensionData;
  };
  traits: MatrixTrait[];
}

interface DimensionData {
  percentage: number; // 0-100%
  score255: number; // 0-255
  unlockedTraits: number;
  totalTraits: number; // 64 per dimension
}
```

### API Request/Response Models

```typescript
// Wallet Binding
interface BindWalletRequest {
  walletAddress: string;
  telegramId: string;
  signature: string;
}

interface BindWalletResponse {
  success: boolean;
  userId: string;
  conflict?: boolean;
  conflictedAccount?: string;
}

// reCAPTCHA Verification
interface VerifyReCaptchaRequest {
  token: string;
  action: string;
}

interface VerifyReCaptchaResponse {
  success: boolean;
  score: number;
  challenge_ts: string;
}

// Widget Verification
interface SubmitVerificationRequest {
  userId: string;
  widgetId: string;
  verificationData: Record<string, any>;
}

interface SubmitVerificationResponse {
  success: boolean;
  traitsUnlocked: MatrixTrait[];
  scoreGained: number;
  newTotalScore: number;
}

// Task Availability
interface GetTasksResponse {
  tasks: Task[];
  userScore: number;
}

// Airdrop Claim
interface ClaimAirdropRequest {
  taskId: string;
  walletAddress: string;
}

interface ClaimAirdropResponse {
  success: boolean;
  txHash: string;
  amount: number;
}
```

### Local Storage Schema

```typescript
interface LocalStorageData {
  // Persisted from Zustand
  userStatus: UserStatus;
  walletAddress?: string;
  humanityScore: number;
  matrixData: TwinMatrixData;
  completedSteps: string[];
  
  // Error Recovery
  pendingSync: SyncOperation[];
  lastSyncTimestamp: number;
  
  // Session
  sessionId: string;
  lastActiveTimestamp: number;
}

interface SyncOperation {
  id: string;
  type: 'widget_verification' | 'task_completion' | 'airdrop_claim';
  data: Record<string, any>;
  timestamp: number;
  retryCount: number;
}
```

### Error Models

```typescript
interface AppError {
  code: string;
  message: string;
  type: 'binding_conflict' | 'recaptcha_failed' | 'widget_failed' | 'insufficient_score' | 'claim_failed' | 'network_error';
  recoverable: boolean;
  retryAction?: () => void;
  timestamp: number;
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I identified several areas where properties can be consolidated:

**Redundancy Analysis:**
1. **State Persistence Properties**: Multiple requirements (2.6, 3.5, 4.6, 5.4, 9.5, 10.2, 16.5, 17.4) all test that data is persisted to Off-chain_DB. These can be combined into a single comprehensive property about data persistence.

2. **Error Logging Properties**: Requirements 3.5, 5.4, and 9.5 all test logging behavior. These can be consolidated into one property about error logging.

3. **UI State Update Properties**: Requirements 2.3, 2.5, 6.4, 8.3, 14.6, 19.3 all test that state is updated in the global store. These can be combined into a property about state synchronization.

4. **Navigation Properties**: Requirements 1.4, 4.2, 4.4, 7.1 all test navigation between flow stages. These can be consolidated into a property about flow progression.

5. **Retry Mechanism Properties**: Requirements 5.3, 9.4, 10.4, 14.5 all test retry functionality. These can be combined into a property about error recovery.

6. **Real-time Update Properties**: Requirements 8.6, 12.5 both test reactive UI updates. These can be consolidated.

**Consolidated Properties:**
After reflection, I will create properties that:
- Combine related state management behaviors
- Consolidate error handling patterns
- Merge similar UI update behaviors
- Unify data persistence requirements

This reduces redundancy while maintaining comprehensive coverage of all requirements.

### Core Properties

**Property 1: Wallet Binding State Consistency**
*For any* successful wallet binding (MetaMask or Telegram Bot), the system SHALL update the global store with the wallet address, set userStatus to 'registered', and persist the binding to the backend database, ensuring all three operations complete atomically or none complete.
**Validates: Requirements 2.3, 2.5, 2.6**

**Property 2: Binding Conflict Prevention**
*For any* wallet address that is already bound to an account, any subsequent binding attempt SHALL be rejected, the current state SHALL remain unchanged, and an error message SHALL be displayed to the user.
**Validates: Requirements 3.1, 3.2, 3.3**

**Property 3: reCAPTCHA Flow Progression**
*For any* user completing wallet binding, the system SHALL automatically trigger reCAPTCHA v3, and based on the score: if score >= 0.5, proceed to Matrix display; if score < 0.5, display reCAPTCHA v2 challenge; only after successful verification SHALL the Matrix be accessible.
**Validates: Requirements 4.1, 4.2, 4.3, 4.4, 5.5**

**Property 4: Matrix Initialization Consistency**
*For any* successful reCAPTCHA verification, the system SHALL initialize the Matrix with exactly one trait at position (0,0) with value 51, set the Humanity_Score to 51, update the global store, and animate the trait appearance.
**Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5**

**Property 5: Widget Completion Score Calculation**
*For any* set of completed widgets, the total Humanity_Score SHALL equal the sum of all completed widget weights, and this score SHALL be reflected consistently in the global store, Matrix visualization, and backend database.
**Validates: Requirements 8.5, 8.6, 10.1, 10.2**

**Property 6: Widget Non-Repeatability**
*For any* widget that has been marked as completed, the system SHALL prevent that widget from being selected or executed again, ensuring each widget contributes to the score exactly once.
**Validates: Requirements 8.3, 8.4**

**Property 7: Score Non-Decreasing Invariant**
*For any* verification attempt (successful or failed), the user's Humanity_Score SHALL never decrease, maintaining a monotonically increasing score throughout the user's journey.
**Validates: Requirements 9.6**

**Property 8: Database Sync with Retry**
*For any* data update operation (widget completion, task completion, airdrop claim), if the backend update fails, the system SHALL retry up to 3 times with exponential backoff, and if all retries fail, SHALL store the operation in local storage for later synchronization.
**Validates: Requirements 10.4, 10.5, 10.6**

**Property 9: Trait Animation Sequencing**
*For any* set of N traits unlocked simultaneously, the system SHALL animate them sequentially with 0.2 second intervals, using the correct dimension color for each trait, with each animation lasting 0.8 seconds.
**Validates: Requirements 11.1, 11.2, 11.3**

**Property 10: Task Availability Determination**
*For any* task with threshold T and user with score S, the task SHALL be displayed as "Available" if S >= T, and "Locked" if S < T, with this determination updating in real-time as S changes.
**Validates: Requirements 12.2, 12.3, 12.4, 12.5**

**Property 11: Task Initiation Gate**
*For any* task with threshold T, the system SHALL prevent task initiation if the user's score S < T, displaying the score gap and suggesting widgets that can help reach T.
**Validates: Requirements 13.2, 13.3, 13.5**

**Property 12: Airdrop Claim Transaction Flow**
*For any* airdrop claim, the system SHALL initiate a blockchain transaction, display pending status with transaction hash, and upon confirmation, update the token balance in both the global store and Reward Dashboard.
**Validates: Requirements 14.2, 14.3, 14.4, 14.6**

**Property 13: Referral Link Uniqueness**
*For any* user accessing the Invite Friends feature, the system SHALL generate a unique referral code that maps to that user, and when a referred user completes registration, SHALL credit the referrer with the referral bonus exactly once.
**Validates: Requirements 16.1, 16.3**

**Property 14: State Persistence and Recovery**
*For any* critical state change (wallet binding, verification completion, score update), the system SHALL persist the state to local storage, and upon app relaunch, SHALL restore the last saved state, with database state taking precedence in case of conflicts.
**Validates: Requirements 19.1, 19.2, 19.3, 19.4**

**Property 15: Responsive Layout Adaptation**
*For any* screen width W in the range [320px, 2560px], all UI components SHALL render correctly and remain functional, with touch-optimized controls on mobile devices and appropriate scaling for the Matrix visualization.
**Validates: Requirements 20.1, 20.2, 20.3**

### UI Interaction Properties

**Property 16: Video Player Controls Presence**
*For any* video player instance, the system SHALL provide all standard playback controls (play, pause, volume, fullscreen), and these controls SHALL be functional throughout the video playback.
**Validates: Requirements 1.2**

**Property 17: CTA Display After Video**
*For any* video completion or skip event, the system SHALL display the "Prove Humanity to Claim" CTA button, and clicking this button SHALL navigate to the wallet binding flow.
**Validates: Requirements 1.3, 1.4**

**Property 18: Chat Interface Functionality**
*For any* message sent in the Chat Interface, the system SHALL call the Gemini API, display the AI response, persist the message to session history, and maintain display of the current Humanity_Score and Matrix progress.
**Validates: Requirements 7.2, 7.3, 7.4, 7.6**

**Property 19: Widget Information Completeness**
*For any* widget displayed in the verification list, the system SHALL show the widget's name, description, estimated time, and Humanity Index boost value, ensuring users have complete information to make informed choices.
**Validates: Requirements 8.1, 8.2**

**Property 20: Error Message Specificity**
*For any* verification failure, the system SHALL display an error message specific to the failure type (biometric, social media, network), provide retry and alternative method options, and log the failure to the backend without affecting the user's score.
**Validates: Requirements 9.1, 9.4, 9.5**

**Property 21: Dashboard Data Completeness**
*For any* Reward Dashboard view, the system SHALL display the token balance, completed tasks list, pending airdrops, transaction history, and USD equivalent value, with all data refreshable via a manual refresh button.
**Validates: Requirements 15.1, 15.2, 15.3, 15.4, 15.5, 15.6**

**Property 22: Community Join Incentive**
*For any* community platform (Telegram, Discord, Twitter), when a user joins, the system SHALL track the join event in the database, award the join bonus, and display the bonus confirmation to the user.
**Validates: Requirements 17.4, 17.5**

**Property 23: Future Task Non-Startability**
*For any* task marked as "Coming Soon", the system SHALL prevent any attempt to start the task, display the estimated launch date and potential rewards, and allow users to subscribe to launch notifications.
**Validates: Requirements 18.2, 18.3, 18.6**

### Edge Cases and Examples

The following criteria are best tested as specific examples or edge cases rather than universal properties:

**Example Test 1: First-Time Landing Page Display**
When a user visits the platform for the first time (no existing session), the Landing Page component should be rendered with a video element and introductory text.
**Validates: Requirements 1.1, 1.5**

**Example Test 2: Wallet Binding Options Display**
When the wallet binding flow is initiated, exactly two options should be displayed: "Self-Custody (MetaMask)" and "No Wallet (TG Bot)".
**Validates: Requirements 2.1**

**Example Test 3: Binding Conflict Error Message**
When a wallet address that is already bound to account A is used to bind to account B, the error message "This wallet is already linked to another account" should be displayed with options to "Try Another Wallet" or "Contact Support".
**Validates: Requirements 3.2, 3.4**

**Example Test 4: reCAPTCHA v2 Max Attempts**
When reCAPTCHA v2 challenge fails 3 times consecutively, the error message "Verification failed. Please try again later or contact support." should be displayed.
**Validates: Requirements 5.1**

**Example Test 5: reCAPTCHA Network Error**
When reCAPTCHA fails due to network issues, the error message "Network error. Please check your connection and try again." should be displayed.
**Validates: Requirements 5.2**

**Example Test 6: Biometric Verification Failure Message**
When biometric verification fails, the error message "Biometric verification failed. Please ensure good lighting and try again." should be displayed.
**Validates: Requirements 9.2**

**Example Test 7: Social Media Verification Failure Message**
When social media verification fails, the error message "Unable to verify your social media account. Please check your privacy settings." should be displayed.
**Validates: Requirements 9.3**

**Example Test 8: Insufficient Score Error Message**
When a user attempts to start a locked task, the error message "Your Humanity Score is too low. Complete more verifications to unlock this task." should be displayed along with the score gap.
**Validates: Requirements 13.1**

## Error Handling

### Error Categories

1. **Binding Errors**
   - Conflict: Wallet already bound to another account
   - Connection Failed: MetaMask not installed or user rejected
   - Network Error: Backend API unreachable

2. **Verification Errors**
   - reCAPTCHA Failed: Low score or challenge failed
   - Widget Failed: Biometric/social verification failed
   - Network Error: API call failed

3. **Transaction Errors**
   - Insufficient Gas: Not enough ETH for transaction
   - Transaction Failed: Smart contract revert
   - Already Claimed: Airdrop already claimed

4. **Sync Errors**
   - Database Update Failed: Backend API error
   - State Conflict: Local and remote state mismatch
   - Network Timeout: Request exceeded timeout

### Error Recovery Strategies

**Immediate Retry**:
- Network errors with exponential backoff (3 attempts)
- reCAPTCHA failures (allow manual retry)
- Widget verification failures (allow retry or alternative method)

**Deferred Sync**:
- Database update failures → queue in local storage
- Provide manual "Sync Now" button
- Auto-retry on next app launch

**User Guidance**:
- Display specific error messages
- Suggest corrective actions
- Provide alternative paths (e.g., choose another widget)

**State Preservation**:
- Save state to local storage on any error
- Allow "Resume" from last checkpoint
- Provide "Clear Cache and Restart" for unrecoverable errors

### Error UI Components

```typescript
interface ErrorModalProps {
  error: AppError;
  onRetry?: () => void;
  onDismiss: () => void;
  onAlternative?: () => void;
}

// Error modal displays:
// - Error icon (color-coded by severity)
// - Error message (user-friendly)
// - Technical details (collapsible)
// - Action buttons (Retry, Dismiss, Alternative)
```

## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests to ensure comprehensive coverage:

**Unit Tests**: Focus on specific examples, edge cases, and error conditions
- Test specific error messages (binding conflict, reCAPTCHA failures)
- Test initial state (first trait at (0,0) with value 51)
- Test specific UI elements (CTA button, wallet options)
- Test integration points (MetaMask API, Gemini API, backend API)

**Property-Based Tests**: Verify universal properties across all inputs
- Test state consistency across all wallet binding scenarios
- Test score calculation across all widget combinations
- Test animation sequencing for any number of traits
- Test responsive layout across all screen widths
- Test error recovery across all failure scenarios

**Balance**: Avoid writing too many unit tests for scenarios that property tests already cover. Unit tests should focus on concrete examples and integration points, while property tests handle comprehensive input coverage.

### Property-Based Testing Configuration

**Library**: Use `fast-check` for TypeScript/JavaScript property-based testing

**Configuration**:
- Minimum 100 iterations per property test
- Each test tagged with: `Feature: onboarding-flow-completion, Property {number}: {property_text}`
- Each correctness property implemented by a SINGLE property-based test

**Example Test Structure**:
```typescript
// Feature: onboarding-flow-completion, Property 5: Widget Completion Score Calculation
test('total score equals sum of completed widget weights', () => {
  fc.assert(
    fc.property(
      fc.array(fc.record({
        id: fc.string(),
        weight: fc.integer({ min: 1, max: 100 })
      })),
      (widgets) => {
        const completedWidgets = widgets.slice(0, Math.floor(Math.random() * widgets.length));
        const expectedScore = completedWidgets.reduce((sum, w) => sum + w.weight, 0);
        const actualScore = calculateHumanityScore(completedWidgets);
        return actualScore === expectedScore;
      }
    ),
    { numRuns: 100 }
  );
});
```

### Test Coverage Goals

**Component Tests**:
- Landing Page: Video player, CTA button, navigation
- Wallet Binding: MetaMask connection, Telegram Bot, conflict detection
- reCAPTCHA: v3 execution, v2 fallback, error handling
- Verification Hub: Widget list, completion tracking, score updates
- Matrix: Animation, trait unlocking, dimension progress
- Task Gate: Threshold checking, availability updates
- Airdrop Claim: Transaction flow, status updates
- Reward Dashboard: Balance display, transaction history
- Invite Flow: Link generation, sharing, referral tracking
- Community Join: Platform links, bonus tracking

**Integration Tests**:
- End-to-end flow: Landing → Binding → Verification → Task → Claim
- State persistence: Save → Close → Reopen → Restore
- Error recovery: Fail → Retry → Success
- Cross-device: Desktop → Mobile → Tablet

**Property Tests** (100+ iterations each):
- Property 1-23 as defined in Correctness Properties section
- Each property test validates multiple requirements
- Focus on state consistency, score calculation, error handling

### Testing Tools

- **Unit Testing**: Vitest
- **Property Testing**: fast-check
- **Component Testing**: React Testing Library
- **E2E Testing**: Playwright
- **Blockchain Testing**: Hardhat (for smart contract interactions)
- **API Mocking**: MSW (Mock Service Worker)

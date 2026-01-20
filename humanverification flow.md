<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# 我要你結合前面的一起給我 或是跟我說我要怎麼一個步驟一個步驟給他哪些東西

好！我幫你整理成 **6 個完整步驟**，每一步都包含完整的 Prompt，你可以依序貼給 Antigravity。

***

## 📋 Antigravity 執行步驟指南

### 準備工作

在開始之前，先把你現有的這些檔案準備好：

- `TwinMatrixCard.tsx`
- `types.ts` (Twin Matrix 的)
- `utils.ts` (Twin Matrix 的)

***

## Step 1️⃣: 初始化架構與類型定義

**貼給 Antigravity：**

> 我要開發一個名為 `HumanVerification` 的 Widget，它會在對話視窗中以互動卡片形式出現。
>
> \#\#\# 任務 1：建立基礎架構
>
> 請在 `src/components/HumanVerification/` 資料夾下建立以下檔案結構：
>
> ```> src/components/HumanVerification/ > ├── types.ts              # 型別定義 > ├── variants.ts           # 狀態變體常數 > ├── data/ > │   ├── verificationMethods.ts > │   └── mockProfiles.ts > ├── components/ > │   ├── VerificationOptions.tsx > │   ├── VerificationLoader.tsx > │   └── HumanityStatusCard.tsx > └── HumanVerification.tsx  # 主 Widget >```
>
> \#\#\# 任務 2：建立 `types.ts`
>
> ```typescript > export type FlowState =  >   | 'initial'  >   | 'selecting_method'  >   | 'verifying'  >   | 'verification_complete'  >   | 'matrix_view'  >   | 'simulate_kol'; > > export interface VerificationMethod { >   id: string; >   name: string; >   icon: string;  // lucide-react icon name >   weight: number; // 0-1 之間的權重 > } > > export type MethodCardVariant = 'default' | 'selected' | 'completed'; > export type HumanityCardVariant = 'locked' | 'unlocked'; > ```
>
> \#\#\# 任務 3：建立 `variants.ts`
>
> ```typescript > export const WIDGET_STATES = { >   INITIAL: 'initial', >   SELECTING: 'selecting_method', >   VERIFYING: 'verifying', >   COMPLETE: 'verification_complete', >   MATRIX_VIEW: 'matrix_view', >   SIMULATE_KOL: 'simulate_kol', > } as const; > > export const ANIMATION_DURATION = { >   VERIFICATION: 2500,    // 驗證進度條動畫 >   FADE_OUT: 300,         // 遮罩淡出 >   FADE_IN: 300,          // 卡片淡入 >   PULSE: 2000,           // 按鈕脈衝 > } as const; > ```
>
> 請先完成這些檔案。

***

## Step 2️⃣: 建立驗證方式數據與 Mock Profiles

**貼給 Antigravity：**

> \#\#\# 任務 4：建立 `data/verificationMethods.ts`
>
> 請建立驗證方式清單，此次 POC 只會使用 `recaptcha-v3`：
>
> ```typescript > import type { VerificationMethod } from '../types'; > > export const verificationMethods: VerificationMethod[] = [ >   { >     id: 'recaptcha-v3', >     name: 'Google reCAPTCHA v3', >     icon: 'ShieldCheck', >     weight: 0.20 >   }, >   { >     id: 'recaptcha-v2', >     name: 'Google reCAPTCHA v2', >     icon: 'Shield', >     weight: 0.15 >   }, >   { >     id: 'biometric-liveness', >     name: 'Liveness Detection', >     icon: 'UserCheck', >     weight: 0.40 >   }, >   { >     id: 'sms-verification', >     name: 'SMS Verification', >     icon: 'Smartphone', >     weight: 0.25 >   }, >   { >     id: 'social-auth', >     name: 'Social Identity Link', >     icon: 'Users', >     weight: 0.18 >   }, >   { >     id: 'wallet-signature', >     name: 'Web3 Wallet Signature', >     icon: 'Wallet', >     weight: 0.22 >   }, >   { >     id: 'poh-sbt', >     name: 'Proof of Humanity', >     icon: 'Award', >     weight: 0.35 >   }, >   { >     id: 'image-puzzle', >     name: 'Visual Puzzle', >     icon: 'Puzzle', >     weight: 0.12 >   }, >   { >     id: 'behavioral-biometrics', >     name: 'Behavioral Analysis', >     icon: 'Fingerprint', >     weight: 0.16 >   }, >   { >     id: 'hardware-key', >     name: 'Hardware Security Key', >     icon: 'Key', >     weight: 0.28 >   } > ]; > > export function calculateHumanityIndex(completedMethodIds: string[]): number { >   const totalWeight = completedMethodIds.reduce( >     (sum, id) => { >       const method = verificationMethods.find(m => m.id === id); >       return sum + (method?.weight || 0); >     }, >     0 >   ); >   return Math.round(Math.min(totalWeight, 1.0) * 255); > } > ```
>
> \#\#\# 任務 5：建立 `data/mockProfiles.ts`
>
> 我稍後會提供我現有的 `TwinMatrixData` 類型。請先建立兩個 profile：
>
> 1. **initialProfile**: 所有 traits 的 `discovered: false`，只有 `trait[^0]` (Humanity Index) 根據完成的驗證動態更新。
> 2. **travelKOLProfile**: 參考我之前提供的數值（0000=135, 0041=192, 0090=232 等）。
>
> 請等我提供 TwinMatrixData 介面後再實作這部分。

***

## Step 3️⃣: 定義 Component Variants 規格

**貼給 Antigravity：**

> \#\#\# Component Variants 完整定義
>
> 請記住以下變體規格，在開發組件時嚴格遵守：
>
> ---
>
> \#\#\#\# **1. `VerificationOptions` 卡片變體**
>
> | Variant | 觸發條件 | UI 表現 |
> |---------|---------|---------|
> | `default` | 未選中且未完成 | 白色背景 + 灰色邊框 + 灰色 icon |
> | `selected` | 點擊後選中 | 藍色邊框 `border-blue-500` + 淡藍色背景 `bg-blue-50 dark:bg-blue-900/20` |
> | `completed` | 驗證完成 | 綠色邊框 + 淡綠色背景 + 右上角綠色勾選 icon + 禁用點擊 |
>
> ---
>
> \#\#\#\# **2. `HumanityStatusCard` 變體**
>
> | Variant | 觸發條件 | UI 表現 |
> |---------|---------|---------|
> | `locked` | `completedMethods.length === 0` | 分數 0/255，按鈕灰色 + 鎖頭遮罩 |
> | `unlocked` | `completedMethods.length > 0` | 分數更新，遮罩 fade-out，按鈕變藍色 + pulse 動畫 |
>
> **解鎖動畫細節：**
> - 遮罩層以 300ms `fade-out` 消失
> - 按鈕從灰色變為藍色漸變 `bg-gradient-to-r from-blue-500 to-blue-600`
> - 按鈕啟用 `animate-pulse`（持續 2 秒後停止）
>
> ---
>
> \#\#\#\# **3. POC 精確數值**
>
> ```typescript > // 初始狀態 > const INITIAL_STATE = { >   humanityIndex: 0, >   percentage: 0, >   completedMethods: [] > }; > > // 完成 Google reCAPTCHA v3 後 > const AFTER_RECAPTCHA_V3 = { >   humanityIndex: 51,        // 0.20 × 255 = 51 >   percentage: 20,           // (51 / 255) × 100 = 20% >   completedMethods: ['recaptcha-v3'] > }; > ```
>
> **請在所有組件中使用這些精確數值。**

***

## Step 4️⃣: 開發子組件

**貼給 Antigravity：**

> \#\#\# 任務 6：開發 `VerificationOptions.tsx`
>
> 請建立驗證選項卡片組件，符合對話視窗樣式：
>
> **Props:**
> ```typescript > interface VerificationOptionsProps { >   methods: VerificationMethod[]; >   completedMethods: string[]; >   onSelect: (methodId: string) => void; > } > ```
>
> **UI 要求：**
> - 最大寬度 `max-w-md`（適合對話視窗）
> - 網格佈局，每個卡片顯示 icon + 名稱
> - **此次 POC**：只有 `recaptcha-v3` 可點擊，其他顯示「Coming Soon」標籤並禁用
> - 使用前面定義的 variants（default/selected/completed）
>
> ---
>
> \#\#\# 任務 7：開發 `VerificationLoader.tsx`
>
> **Props:**
> ```typescript > interface VerificationLoaderProps { >   methodName: string; >   onComplete: () => void; > } > ```
>
> **UI 要求：**
> - 顯示「驗證中...」標題
> - 副標題顯示驗證方式名稱（如「Google reCAPTCHA v3」）
> - 進度條從 0% → 100%（持續 2500ms）
> - 使用 loading spinner icon (`Loader2` with `animate-spin`)
> - 完成後自動呼叫 `onComplete`
>
> ---
>
> \#\#\# 任務 8：開發 `HumanityStatusCard.tsx`
>
> **Props:**
> ```typescript > interface HumanityStatusCardProps { >   humanityIndex: number; >   completedMethods: string[]; >   availableMethods: VerificationMethod[]; >   onViewMatrix: () => void; > } > ```
>
> **UI 區塊：**
> 1. **進度顯示**：大數字顯示分數（如 51/255）+ 進度條（20%）
> 2. **已完成驗證**：綠色區塊列表，顯示 `✓ Google reCAPTCHA v3  +51`
> 3. **可用驗證**：灰色列表，顯示未完成的選項（帶 info icon）
> 4. **解鎖按鈕**：「View My Twin Matrix」
>    - `locked` 變體：灰色 + 遮罩層
>    - `unlocked` 變體：藍色漸變 + pulse 動畫
>
> **重要：** 請實作解鎖動畫（遮罩 fade-out 300ms + 按鈕 pulse 2s）

***

## Step 5️⃣: 開發主 Widget

**貼給 Antigravity：**

> \#\#\# 任務 9：整合主 Widget `HumanVerification.tsx`
>
> 請建立主組件，管理所有狀態切換：
>
> **State Management:**
> ```typescript > const [currentState, setCurrentState] = useState<FlowState>('initial'); > const [completedMethods, setCompletedMethods] = useState<string[]>([]); > const [humanityIndex, setHumanityIndex] = useState(0); > const [currentMatrixData, setCurrentMatrixData] = useState(initialProfile); > ```
>
> **流程控制：**
>
> 1. `initial`: 顯示按鈕「Click Here to Proof I'm a Human」
> 2. `selecting_method`: 顯示 `<VerificationOptions />`
> 3. `verifying`: 顯示 `<VerificationLoader methodName="Google reCAPTCHA v3" />`
> 4. `verification_complete`: 顯示 `<HumanityStatusCard humanityIndex={51} />`
> 5. `matrix_view`: 顯示我提供的 `<TwinMatrixCard data={currentMatrixData} />`
> 6. `simulate_kol`: 切換數據為 `travelKOLProfile`
>
> **動畫時間軸（請嚴格遵守）：**
> ```> 0ms    : 點擊 reCAPTCHA v3 > 0ms    : 進入 verifying 狀態 > 2500ms : 進度完成 > 2800ms : 進入 verification_complete（fade-in 300ms） > 2800ms : 同步更新分數為 51/255 > 2800ms : 遮罩 fade-out 開始 > 3100ms : 按鈕 pulse 動畫開始 > 5100ms : Pulse 結束 >```
>
> **Props:**
> ```typescript > interface HumanVerificationProps { >   onComplete?: (humanityIndex: number) => void; > } > ```

***

## Step 6️⃣: 整合 Twin Matrix 並完成 POC

**貼給 Antigravity：**

> \#\#\# 最終整合任務
>
> 我現在提供我的 `TwinMatrixCard` 組件和相關 types：
>
> [在這裡貼上你的 TwinMatrixCard.tsx, types.ts, utils.ts]
>
> **請完成以下整合：**
>
> 1. 在 `mockProfiles.ts` 中建立兩個 profile：
>    - `initialProfile`: 只有 trait 的 `discovered: true`, `strength: 51`
>    - `travelKOLProfile`: 使用之前提供的完整數值
>
> 2. 在 `matrix_view` 狀態下：
>    - 顯示 `<TwinMatrixCard data={currentMatrixData} />`
>    - 底部顯示按鈕「🎭 模擬 KOL Persona」
>
> 3. 點擊模擬按鈕後：
>    - 切換到 `simulate_kol` 狀態
>    - 更新 `currentMatrixData` 為 `travelKOLProfile`
>    - 顯示 KOL 資訊橫幅
>
> **請確保所有數值、動畫時間、variants 都符合前面的定義。**

***

## 📌 執行建議

1. **按順序執行**：從 Step 1 到 Step 6，每完成一步確認沒問題再進行下一步
2. **在 Step 6 之前**：準備好你的 TwinMatrixCard 相關檔案
3. **測試檢查點**：
    - Step 4 完成後：測試單個組件是否正確渲染
    - Step 5 完成後：測試完整流程是否順暢
    - Step 6 完成後：測試 Matrix 整合是否正確

需要我補充任何細節嗎？
<span style="display:none">[^1][^2][^3][^4][^5][^6][^7]</span>

<div align="center">⁂</div>

[^1]: About twin3.pdf

[^2]: Twin Matrix 編碼.pdf

[^3]: types.ts

[^4]: utils.ts

[^5]: mockData.ts

[^6]: index.ts

[^7]: TwinMatrixCard.tsx


# Twin3 Main — 專案技術規格 (Spec)

> **文件版本**：1.1  
> **最後更新**：2025-12-22  
> **產品負責人**：Via

---

## 1. 專案概述

**專案名稱**：twin3.ai 新版官網  
**專案目錄**：`/Users/umi/Documents/01-Projects/01-twin3/00 Vibecoding-projects/twin3_main`

### 1.1 產品願景

Twin3 是一個 **對話式互動介面 (Conversational UI)**，作為 **Twin Matrix 系統** 的使用者入口。

**核心功能**：
- C 端 KOL 接收品牌任務 (產品體驗、業配合作)
- 透過 Web3 獎勵 (TWIN Token / BTC) 鼓勵使用者參與
- 真實人類驗證 (Proof of Humanity)

---

## 2. 技術棧

| 項目 | 決策 |
|---|---|
| 前端框架 | **React + TypeScript** |
| 建置工具 | **Vite** |
| UI 協議 | **Google A2UI (v0.8)** — 嚴格遵循 |
| 後端 AI | **Google Gemini** |
| **Design System** | **Google Material Design 3 (M3)** |
| **圖標** | **Lucide Icons** ([lucide.dev](https://lucide.dev/icons/)) |

---

## 3. 設計規範

### 3.1 參考介面

**目標**：外觀和體驗類似市面上的生成式 AI 對話介面 (如 Gemini, ChatGPT)

**主要佈局**：
- 側邊欄：對話歷史 / 功能選單
- 中央：大型對話區域 (訊息氣泡 + 卡片)
- 底部：輸入框 + 快捷提示按鈕
- 頂部：簡潔 Header (Logo + 狀態)

### 3.2 Material Design 3 (M3)

**官方資源**：[m3.material.io](https://m3.material.io/)

| 項目 | 規範 |
|---|---|
| 色彩系統 | M3 Dynamic Color (Dark theme 為主) |
| 字型 | Roboto / Inter |
| 圓角 | M3 Shape tokens |
| 陰影 | M3 Elevation tokens |
| 元件 | 按 M3 規範設計 Button, Card, Input, Chip 等 |

### 3.3 圖標系統

**使用 Lucide Icons**：
- 官網：[https://lucide.dev/icons/](https://lucide.dev/icons/)
- NPM 套件：`lucide-react`
- 風格：線條圖標、1.5px stroke、圓角

---

## 4. A2UI 協議重點

**官方網站**：[a2ui.org](https://a2ui.org/)

### 4.1 核心概念

| 概念 | 說明 |
|---|---|
| **Streaming Messages** | UI 透過 JSONL 串流從 Agent 傳送到 Client |
| **Declarative Components** | UI 是「資料描述」，不是可執行程式碼 |
| **Catalog** | Client 定義支援的元件清單，Agent 只能使用這些元件 |

### 4.2 訊息類型

| 訊息 | 方向 | 用途 |
|---|---|---|
| `surfaceUpdate` | Server → Client | 定義或更新 UI 元件 |
| `dataModelUpdate` | Server → Client | 更新應用程式狀態 |
| `beginRendering` | Server → Client | 通知 Client 開始渲染 |
| `userAction` | Client → Server | 回報使用者操作 |

### 4.3 元件 Catalog (初步定義)

| 元件名稱 | 用途 |
|---|---|
| `Text` | 文字顯示 |
| `Button` | 按鈕 |
| `Image` | 圖片 |
| `Row` / `Column` | 排版容器 |
| `Card` | 卡片容器 |
| `TaskOpportunityCard` | **KOL 任務機會卡 (自訂元件)** |

---

## 5. 設計原則

| 原則 | 說明 |
|---|---|
| **Conversational UI** | 對話式介面，外觀類似 Gemini / ChatGPT |
| **Card-based** | 卡片式元件，不依賴傳統網頁排版 |
| **Guided Flow** | 有劇本、有引導，非開放式 AI 聊天 |
| **A2UI UX 原則** | 每個節點提供明確的「下一步」建議按鈕 |
| **所有功能皆卡片** | Dashboard、上傳、互動全部以卡片形式呈現於對話流中 |

### 5.1 輸入區快速按鈕

| 按鈕 | 功能 |
|---|---|
| 📊 Dashboard | 叫出任務看板卡片（顯示進行中/待審核/已完成任務） |
| 📎 附件 | 上傳檔案 |
| 🖼️ 圖片 | 上傳圖片 |
| **Trigger Words** | 每個元件定義觸發詞，供 LLM 學習使用 |
| **跨平台** | 同一份 JSON 可渲染於 Web, Telegram, Discord |

---

## 6. MVP User Story：KOL 接任務

**目標使用者**：C 端 KOL (微網紅)

### 6.1 流程

| 步驟 | 使用者看到的畫面 |
|---|---|
| **1. Welcome** | 歡迎訊息 + Twin3 介紹 + 提示泡泡/任務卡片 |
| **2. 查看詳情** | 點擊任務卡 → 展開任務詳情 (品牌、獎勵、要求) |
| **3. 接受任務** | 點擊「接案」按鈕 → 確認接案成功 |

### 6.2 任務卡片內容 (範例)

| 欄位 | 範例值 |
|---|---|
| 品牌 | L'Oréal Paris |
| 任務標題 | 新品唇膏濾鏡挑戰 |
| 任務描述 | 拍攝 15-60 秒 Reels，使用指定濾鏡展示 #666 色號 |
| 獎勵 | 💰 500 TWIN + 🎁 全套公關品 (價值 $3000) |
| 狀態 | ✨ 招募中 (剩 3 名額) |

---

## 7. 待辦事項

- [x] 確認 Spec 內容
- [x] 初始化 Vite 專案
- [ ] 安裝 M3 Design Tokens 和 Lucide Icons
- [ ] 重構 UI 為 Gemini-like 介面
- [ ] 實作 A2UI 完整協議 (JSONL streaming)
- [ ] 接入 Gemini API

---

## 8. 相關文件

- [A2UI 官方規範](https://a2ui.org/specification/v0.8-a2ui/)
- [Material Design 3](https://m3.material.io/)
- [Lucide Icons](https://lucide.dev/icons/)
- twin3fluence MVP v1 (Google Doc)
- Twin Matrix 編碼.pdf

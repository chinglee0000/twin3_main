# Twin3.ai - 對話式互動介面

> **專案目錄**: `/Users/umi/Documents/01-Projects/01-twin3/00 Vibecoding-projects/twin3_main`

## 專案概述

Twin3 是一個對話式互動介面 (Conversational UI)，作為 Twin Matrix 系統的使用者入口。

### 核心功能
- C 端 KOL 接收品牌任務 (產品體驗、業配合作)
- 透過 Web3 獎勵 (TWIN Token / BTC) 鼓勵使用者參與
- 真實人類驗證 (Proof of Humanity)

## 技術棧

- **前端框架**: React + TypeScript
- **建置工具**: Vite
- **UI 協議**: Google A2UI (v0.8)
- **後端 AI**: Google Gemini
- **Design System**: Material Design 3 (M3)
- **圖標**: Lucide Icons

## 快速開始

```bash
# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 建置生產版本
npm run build
```

## 專案結構

```
twin3_main/
├── src/
│   ├── components/      # 共用元件
│   ├── features/        # 功能模組
│   │   ├── chat/       # 對話介面
│   │   ├── twin-matrix/ # Twin Matrix 視覺化
│   │   ├── widgets/    # 各種小工具
│   │   └── human-verification/ # 人類驗證
│   ├── data/           # 資料定義
│   ├── services/       # API 服務
│   ├── store/          # 狀態管理
│   └── styles/         # 全域樣式
├── docs/               # 專案文件
├── scripts/            # 工具腳本
└── public/             # 靜態資源
```

## 文件

詳細文件請參考 [docs/README.md](./docs/README.md)

### 核心文件
- [專案技術規格](./docs/spec.md)
- [UI 設計規範](./docs/ui-spec.md)
- [人類驗證流程](./docs/human-verification-flow.md)
- [情境路由指南](./docs/context-routing-guide.md)

### 開發指南
- [動畫測試指南](./docs/ANIMATION-TEST-GUIDE.md)
- [強制重新加載](./docs/FORCE-RELOAD.md)
- [解鎖動畫調試](./docs/UNLOCK-ANIMATION-DEBUG.md)

## 開發工具

### 調試腳本
```bash
# 檢查 Matrix 狀態
node scripts/check-matrix-status.js

# 調試動畫
node scripts/debug-animation.js
```

### 動畫測試
在瀏覽器中打開 `docs/animation-test.html` 來測試 Twin Matrix 解鎖動畫效果。

## 環境變數

複製 `.env.example` 到 `.env` 並填入必要的 API 金鑰：

```bash
cp .env.example .env
```

## 授權

Copyright © 2026 Twin3.ai

# Twin3 快速開始指南

> 5 分鐘快速上手 Twin3 專案

---

## 📦 安裝

```bash
# 1. 安裝依賴
npm install

# 2. 複製環境變數
cp .env.example .env

# 3. 編輯 .env 並填入你的 Gemini API Key
# 取得 API Key: https://aistudio.google.com/apikey
```

---

## 🚀 啟動

```bash
# 開發模式
npm run dev

# 建置生產版本
npm run build

# 預覽生產版本
npm run preview
```

---

## 📁 專案結構

```
src/
├── components/      # 共用元件
├── features/        # 功能模組
│   ├── chat/       # 對話介面
│   ├── twin-matrix/ # Twin Matrix 視覺化
│   ├── widgets/    # 功能小工具
│   └── human-verification/ # 人類驗證
├── data/           # 資料定義
├── services/       # API 服務
├── store/          # 狀態管理 (Zustand)
├── styles/         # 全域樣式
└── utils/          # 工具函數
```

---

## 🎨 開發規範

### 樣式
- 優先使用 CSS Classes (`.widget-header`, `.btn-primary`)
- 遵循標準數值 (padding: `16px 20px`, borderRadius: `12px`)
- 使用 CSS Variables (`var(--color-primary)`)

### 程式碼
- 使用 `logger` 而非 `console.log`
- TypeScript 嚴格模式
- 遵循 ESLint 規則

---

## 📚 重要文件

| 文件 | 用途 |
|------|------|
| [README.md](./README.md) | 專案說明 |
| [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) | 完整開發指南 |
| [docs/STYLE-PATTERNS.md](./docs/STYLE-PATTERNS.md) | 樣式模式參考 |
| [docs/ui-spec.md](./docs/ui-spec.md) | UI 設計規範 |

---

## 🛠️ 常用指令

```bash
# 開發
npm run dev              # 啟動開發服務器
npm run lint             # 檢查程式碼
npm run lint:fix         # 自動修復問題
npm run type-check       # TypeScript 檢查

# 建置
npm run build            # 建置生產版本
npm run preview          # 預覽建置結果

# 清理
npm run clean            # 清理快取
```

---

## 🐛 常見問題

### 動畫不顯示？
```bash
# 清除 localStorage
localStorage.clear()
location.reload()
```
詳見: [docs/FORCE-RELOAD.md](./docs/FORCE-RELOAD.md)

### TypeScript 錯誤？
```bash
# 清除快取並重新安裝
npm run clean
npm install
```

### API 錯誤？
檢查 `.env` 檔案中的 `VITE_GEMINI_API_KEY` 是否正確

---

## 💡 開發提示

1. **使用 CSS Classes**: 查看 `src/styles/components.css`
2. **參考樣式模式**: 查看 `docs/STYLE-PATTERNS.md`
3. **使用日誌工具**: `import { logger } from '@/utils/logger'`
4. **遵循命名規範**: 查看 `docs/CODE-QUALITY-CHECKLIST.md`

---

## 🤝 貢獻

1. 查閱 [DEVELOPMENT.md](./docs/DEVELOPMENT.md)
2. 遵循 [STYLE-PATTERNS.md](./docs/STYLE-PATTERNS.md)
3. 檢查 [CODE-QUALITY-CHECKLIST.md](./docs/CODE-QUALITY-CHECKLIST.md)
4. 提交 Pull Request

---

## 📞 支援

- 技術問題: 查閱 `docs/` 目錄
- 樣式問題: 參考 `docs/STYLE-PATTERNS.md`
- 開發問題: 參考 `docs/DEVELOPMENT.md`

---

**快速開始完成！** 🎉

現在你可以開始開發了。需要更多資訊請查閱 [完整文件](./docs/README.md)。

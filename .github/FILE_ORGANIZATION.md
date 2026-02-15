# 檔案整理記錄

> 整理日期：2026-02-15

## 整理內容

### 1. 移動檔案到適當目錄

#### 移至 `docs/`
- `ANIMATION-TEST-GUIDE.md` → `docs/ANIMATION-TEST-GUIDE.md`
- `FORCE-RELOAD.md` → `docs/FORCE-RELOAD.md`
- `UNLOCK-ANIMATION-DEBUG.md` → `docs/UNLOCK-ANIMATION-DEBUG.md`
- `animation-test.html` → `docs/animation-test.html`
- `Twin3 FAQ - 純文字問答（FAQ）.csv` → `docs/faq-data.csv`

#### 移至 `scripts/`
- `check-matrix-status.js` → `scripts/check-matrix-status.js`
- `debug-animation.js` → `scripts/debug-animation.js`

### 2. 刪除檔案
- `tsc_output.txt` - TypeScript 編譯錯誤輸出（臨時檔案）

### 3. 新增文件

#### 根目錄
- `README.md` - 重寫為完整的專案說明文件

#### docs/
- `DEVELOPMENT.md` - 完整開發指南
- `README.md` - 更新文件索引

#### scripts/
- `README.md` - 工具腳本說明

### 4. 更新檔案
- `.gitignore` - 加入 TypeScript 編譯輸出忽略規則

## 整理後的目錄結構

```
twin3_main/
├── .github/
│   └── FILE_ORGANIZATION.md    # 本文件
├── docs/                        # 📚 所有專案文件
│   ├── README.md               # 文件索引
│   ├── DEVELOPMENT.md          # 開發指南
│   ├── spec.md                 # 技術規格
│   ├── ui-spec.md              # UI 設計規範
│   ├── design-system.md        # 設計系統
│   ├── context-routing-guide.md
│   ├── human-verification-*.md
│   ├── ANIMATION-TEST-GUIDE.md
│   ├── UNLOCK-ANIMATION-DEBUG.md
│   ├── FORCE-RELOAD.md
│   ├── animation-test.html     # 動畫測試頁面
│   └── faq-data.csv            # FAQ 資料
├── scripts/                     # 🛠️ 工具腳本
│   ├── README.md               # 腳本說明
│   ├── check-matrix-status.js
│   ├── debug-animation.js
│   └── cleanup.sh
├── src/                         # 💻 原始碼
│   ├── components/
│   ├── features/
│   ├── data/
│   ├── services/
│   ├── store/
│   └── styles/
├── public/                      # 🎨 靜態資源
├── .env.example
├── .gitignore
├── README.md                    # 專案說明
├── package.json
└── vite.config.ts
```

## 整理原則

1. **文件集中化**：所有文件統一放在 `docs/` 目錄
2. **工具腳本分離**：調試和維護腳本放在 `scripts/` 目錄
3. **根目錄簡潔**：只保留必要的配置檔案和 README
4. **文件命名規範**：
   - 技術文件使用小寫加連字符（kebab-case）
   - 指南文件使用大寫（UPPERCASE）
   - 資料檔案使用描述性名稱

## 文件導航

### 新手入門
1. 閱讀 [README.md](../README.md)
2. 查看 [docs/spec.md](../docs/spec.md) 了解技術規格
3. 參考 [docs/DEVELOPMENT.md](../docs/DEVELOPMENT.md) 設置開發環境

### 開發者
- UI 開發：[docs/ui-spec.md](../docs/ui-spec.md)
- 功能開發：[docs/context-routing-guide.md](../docs/context-routing-guide.md)
- 調試問題：[scripts/README.md](../scripts/README.md)

### 測試人員
- 動畫測試：[docs/ANIMATION-TEST-GUIDE.md](../docs/ANIMATION-TEST-GUIDE.md)
- 驗證流程：[docs/human-verification-flow.md](../docs/human-verification-flow.md)

## 維護建議

1. **新增文件時**：
   - 技術文件放在 `docs/`
   - 工具腳本放在 `scripts/`
   - 更新對應的 README.md 索引

2. **刪除檔案時**：
   - 檢查是否有其他文件引用
   - 更新相關的 README.md

3. **重構時**：
   - 保持目錄結構清晰
   - 更新文件中的路徑引用
   - 維護 FILE_ORGANIZATION.md

## 後續改進建議

- [ ] 考慮將 `archive/` 目錄內容整理或刪除
- [ ] 統一文件語言（中文或英文）
- [ ] 建立自動化文件生成工具
- [ ] 加入文件版本控制

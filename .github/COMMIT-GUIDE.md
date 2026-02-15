# Git Commit 指南

## 本次整理的 Commit 建議

### Commit 1: 文件整理與規範建立

```bash
git add docs/ .github/ scripts/ .gitattributes .env.example README.md QUICK-START.md
git add src/styles/components.css src/utils/logger.ts

git commit -m "docs: 專案文件整理與開發規範建立

- 整理文件結構：移動調試文件到 docs/，工具腳本到 scripts/
- 新增開發指南：DEVELOPMENT.md, STYLE-PATTERNS.md, CODE-QUALITY-CHECKLIST.md
- 新增快速開始指南：QUICK-START.md
- 建立樣式規範：新增 14 個可重用的 CSS Classes
- 創建日誌工具：src/utils/logger.ts
- 擴充環境變數說明：.env.example
- 新增 Git 配置：.gitattributes
- 更新專案說明：README.md

整理記錄：
- .github/FILE_ORGANIZATION.md
- .github/STYLE-ORGANIZATION.md  
- .github/FINAL-ORGANIZATION-SUMMARY.md

預期效益：
- 減少 500+ 行重複程式碼（待重構）
- 統一開發規範和樣式標準
- 提升程式碼可維護性"
```

### Commit 2: 功能開發變更（如果有的話）

```bash
# 檢查是否有功能相關的變更
git add src/features/

git commit -m "feat: [描述你的功能變更]"
```

---

## 執行步驟

1. **先 commit 文件整理**（推薦）
2. **再 commit 功能變更**（如果有）
3. **最後 push 到遠端**

---

## 如果需要先 pull

```bash
# 如果遠端有更新，先 pull
git pull --rebase origin main

# 解決衝突（如果有）
# 然後繼續
git rebase --continue
```

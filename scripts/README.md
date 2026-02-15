# Twin3 工具腳本

這個目錄包含用於開發和調試的工具腳本。

## 調試腳本

### check-matrix-status.js
檢查 Twin Matrix 的當前狀態。

**使用方式**：
在瀏覽器 Console 中執行此腳本的內容。

**功能**：
- 檢查 localStorage 中的 Matrix 數據
- 顯示 discoveredTraits 和 humanityIndex
- 檢查 Trait 00 (Humanity Index) 的狀態
- 驗證 unlockedAt 時間戳

### debug-animation.js
調試 Twin Matrix 解鎖動畫。

**使用方式**：
在瀏覽器 Console 中執行此腳本的內容。

**功能**：
- 檢查 localStorage 數據
- 檢查 DOM 元素是否正確渲染
- 驗證 CSS 動畫定義
- 提供調試建議

## 維護腳本

### cleanup.sh
清理專案中的臨時檔案和快取。

**使用方式**：
```bash
bash scripts/cleanup.sh
```

## 使用建議

1. **調試動畫問題**：先執行 `check-matrix-status.js` 確認數據狀態，再執行 `debug-animation.js` 檢查動畫配置
2. **清除快取**：如果遇到奇怪的行為，執行 `cleanup.sh` 清理快取
3. **開發工具**：建議在 Chrome DevTools 中使用這些腳本，可以更好地查看輸出

## 相關文件

- [動畫測試指南](../docs/ANIMATION-TEST-GUIDE.md)
- [解鎖動畫調試](../docs/UNLOCK-ANIMATION-DEBUG.md)
- [強制重新加載](../docs/FORCE-RELOAD.md)

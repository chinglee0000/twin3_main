# 樣式整理記錄

> 整理日期：2026-02-15

## 整理目標

1. 統一常用的樣式模式
2. 減少重複的 inline styles
3. 提高程式碼一致性和可維護性
4. 建立清晰的樣式規範文件

## 發現的問題

### 1. 重複的樣式模式

通過程式碼分析，發現以下高頻重複模式：

#### Widget Header
```typescript
// 出現 15+ 次
padding: '16px 20px',
borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
background: 'linear-gradient(135deg, rgba(40, 40, 45, 0.5), rgba(30, 30, 35, 0.5))',
```

#### 按鈕樣式
```typescript
// 出現 30+ 次
padding: '12px 16px',
borderRadius: '12px',
background: '#ffffff',
border: '1px solid transparent',
```

#### 圖標按鈕
```typescript
// 出現 20+ 次
width: '44px',
height: '44px',
borderRadius: '12px',
background: 'rgba(255, 255, 255, 0.04)',
border: '1px solid rgba(255, 255, 255, 0.08)',
```

#### 資訊卡片
```typescript
// 出現 25+ 次
padding: '16px',
borderRadius: '12px',
background: 'rgba(255, 255, 255, 0.04)',
border: '1px solid rgba(255, 255, 255, 0.08)',
```

### 2. 不一致的數值

- BorderRadius: 發現 `10px`, `12px`, `15px`, `16px` 混用
- Padding: 發現 `14px 22px`, `15px 18px`, `16px 20px` 混用
- Transition: 發現 `0.15s`, `0.2s`, `0.3s` 混用

### 3. 缺少文件

- 沒有統一的樣式模式參考文件
- 開發者需要在多個檔案中尋找樣式範例
- 容易產生不一致的實作

## 解決方案

### 1. 新增 CSS Classes

在 `src/styles/components.css` 中新增：

```css
/* Widget 相關 */
.widget-header
.widget-header-success
.widget-header-warning
.widget-header-error
.widget-content
.widget-footer
.widget-list-item

/* 資訊卡片 */
.info-card
.info-card-success
.info-card-warning
.info-card-info
.info-card-error

/* 圖標按鈕 */
.icon-btn
.icon-btn-sm

/* 列表項目 */
.list-item

/* 分隔線 */
.divider
.divider-vertical

/* Badge */
.badge
.badge-success
.badge-warning
.badge-info
.badge-error
```

### 2. 建立樣式模式文件

創建 `docs/STYLE-PATTERNS.md`，包含：

- **卡片樣式**: Header, Content, Footer 標準模式
- **按鈕樣式**: Primary, Ghost, Icon 按鈕
- **佈局模式**: Flex, Grid 常用組合
- **互動狀態**: Hover, Active, Disabled
- **響應式模式**: 移動版調整規則
- **常用組合**: 完整的元件樣式範例

### 3. 統一設計規範

在 `docs/STYLE-PATTERNS.md` 中明確定義：

#### 標準 Padding
- Header/Footer: `16px 20px`
- Button: `12px 16px`
- Content: `24px 20px`
- Icon Button: `0` (使用 width/height)

#### 標準 BorderRadius
- 按鈕/輸入框/小卡片: `12px`
- 大卡片: `16px`
- Chip/圓形按鈕: `9999px`

#### 標準 Transition
- 統一使用: `all 0.2s ease`

#### 標準顏色
- 使用 CSS Variables 而非硬編碼
- 強調色統一使用紫色 `var(--color-info)`

## 使用指南

### Before (舊方式)

```typescript
// ❌ 每次都要寫一堆 inline styles
<div style={{
  padding: '16px 20px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
  background: 'linear-gradient(135deg, rgba(40, 40, 45, 0.5), rgba(30, 30, 35, 0.5))',
}}>
  Header Content
</div>
```

### After (新方式)

```typescript
// ✅ 使用 CSS Class
<div className="widget-header">
  Header Content
</div>

// ✅ 需要變體時
<div className="widget-header widget-header-success">
  Success Header
</div>
```

## 重構建議

### 優先級 1: 高頻元件

建議優先重構以下元件使用新的 CSS Classes：

1. **Widget Headers** (15+ 個檔案)
   - `src/features/widgets/*.tsx`
   - 使用 `.widget-header` 替換 inline styles

2. **按鈕** (30+ 個檔案)
   - 使用 `.btn-primary`, `.btn-ghost` 替換重複樣式

3. **圖標按鈕** (20+ 個檔案)
   - 使用 `.icon-btn`, `.icon-btn-sm` 替換

4. **資訊卡片** (25+ 個檔案)
   - 使用 `.info-card` 及其變體

### 優先級 2: 樣式統一

1. 將所有 `borderRadius: '10px'` 改為 `'12px'`
2. 將所有 `borderRadius: '15px'` 改為 `'16px'`
3. 統一 transition 為 `'all 0.2s ease'`

### 優先級 3: 文件更新

1. 在 Code Review 時檢查是否遵循新規範
2. 新元件必須參考 `STYLE-PATTERNS.md`
3. 定期更新樣式模式文件

## 效益評估

### 程式碼減少

- 每個 Widget Header: 減少 ~5 行程式碼
- 每個按鈕: 減少 ~8 行程式碼
- 每個資訊卡片: 減少 ~6 行程式碼

**預估**: 整體程式碼可減少 500+ 行

### 一致性提升

- 所有 Widget 外觀統一
- 按鈕樣式一致
- 減少視覺不一致的問題

### 維護性提升

- 修改樣式只需更新 CSS 檔案
- 不需要在多個元件中搜尋替換
- 新開發者更容易遵循規範

## 相關文件

- [樣式模式指南](../docs/STYLE-PATTERNS.md) - 完整的樣式模式參考
- [UI 設計規範](../docs/ui-spec.md) - 原始設計規範
- [設計系統](../docs/design-system.md) - CSS Variables 參考
- [開發指南](../docs/DEVELOPMENT.md) - 開發流程

## 後續行動

### 立即執行
- [x] 建立 `STYLE-PATTERNS.md` 文件
- [x] 新增 CSS Classes 到 `components.css`
- [x] 更新文件索引

### 短期 (1-2 週)
- [ ] 重構 Widget Headers 使用新 Classes
- [ ] 重構按鈕樣式
- [ ] 統一 borderRadius 數值

### 中期 (1 個月)
- [ ] 重構所有資訊卡片
- [ ] 重構圖標按鈕
- [ ] Code Review 檢查清單加入樣式規範

### 長期 (持續)
- [ ] 定期審查新增的樣式模式
- [ ] 更新樣式模式文件
- [ ] 建立自動化檢查工具

## 維護原則

1. **優先使用 CSS Classes**: 能用 Class 就不用 inline styles
2. **保持一致性**: 新增樣式前先檢查是否已有類似模式
3. **文件先行**: 新模式先寫入文件再實作
4. **定期審查**: 每月檢查是否有新的重複模式
5. **漸進式重構**: 不強制一次性重構，但新程式碼必須遵循規範

## 檢查清單

開發新元件時：

- [ ] 查閱 `STYLE-PATTERNS.md` 尋找可用的模式
- [ ] 優先使用已定義的 CSS Classes
- [ ] Padding 使用標準值
- [ ] BorderRadius 使用標準值
- [ ] 顏色使用 CSS Variables
- [ ] Transition 統一使用 `all 0.2s ease`
- [ ] 發現新模式時更新文件

Code Review 時：

- [ ] 檢查是否有重複的 inline styles
- [ ] 檢查是否遵循標準數值
- [ ] 檢查是否使用 CSS Variables
- [ ] 建議使用已定義的 CSS Classes
- [ ] 評估是否需要新增新的 Class

## 總結

通過這次整理，我們：

1. ✅ 識別了高頻重複的樣式模式
2. ✅ 建立了統一的樣式規範文件
3. ✅ 新增了可重用的 CSS Classes
4. ✅ 提供了清晰的使用指南
5. ✅ 制定了重構計劃

這將大幅提升程式碼的一致性和可維護性，減少開發時間，並降低視覺不一致的問題。

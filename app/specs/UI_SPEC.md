# twin3 UI Design System

> **目的**: 本文件定義 twin3 的 UI 設計規範，供前端工程師與 AI Agent (Claude/Gemini) 實作參考。
> **基礎框架**: Material Design 3 (MUI) — 未定義項目皆沿用 MUI 預設值。

---

## 1. Brand Identity

| 項目 | 值 | 說明 |
|------|---|------|
| Site Title | `twin3.ai` | 瀏覽器標籤名稱 |
| Logo | `/public/twin3_logo.svg` | Favicon, Sidebar header |
| Promo Image | `/public/twin3-promo.png` | Marketing 素材 |

---

## 2. Typography

### 2.1 Font Families

| 用途 | Font | Fallback | Google Fonts |
|------|------|----------|--------------|
| **標題** (H1-H4, Logo) | Montserrat | Inclusive Sans, Sora, Geologica | `wght@400;500` |
| **內文** (Body, Button, Caption) | Inter | Roboto, Open Sans | `wght@300;400;500` |

```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
```

### 2.2 Font Weights

> ⚠️ **規則**: 最大字重為 **500 (Medium)**，禁止使用 600+

### 2.3 Type Scale

| Variant | Font | Weight | Size | 備註 |
|---------|------|--------|------|------|
| `h1` | Montserrat | 500 | 2.5rem (40px) | |
| `h2` | Montserrat | 500 | 1.5rem (24px) | |
| `h3` | Montserrat | 500 | 1.125rem (18px) | |
| `h4` | Montserrat | 500 | 1rem (16px) | |
| `body1` | Inter | 300 | 1rem (16px) | 主要內文 |
| `body2` | Inter | 300 | 0.875rem (14px) | 次要內文 |
| `caption` | Inter | 300 | 0.75rem (12px) | 標籤、提示 |
| `button` | Inter | 500 | 0.875rem (14px) | `textTransform: none` |

### 2.4 Responsive Sizing

使用 MUI `responsiveFontSizes()` 自動縮放：

```typescript
theme = responsiveFontSizes(theme, {
  variants: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2'],
});
```

---

## 3. Color Palette

### 3.1 Dark Mode (預設)

```typescript
const darkPalette = {
  primary:    { main: '#FFFFFF' },           // 按鈕、主要操作
  secondary:  { main: '#8E8E93' },           // 次要元素
  background: {
    default: '#0A0A0A',                      // 頁面背景
    paper: 'rgba(28, 28, 30, 0.72)',         // 卡片、表面
  },
  text: {
    primary: '#FFFFFF',                      // 標題、內文
    secondary: '#8E8E93',                    // 描述文字
    disabled: '#636366',                     // 提示、placeholder
  },
  success: { main: '#30D158' },              // 成功狀態
  warning: { main: '#FF9F0A' },              // 警告狀態
  error:   { main: '#FF453A' },              // 錯誤狀態
  info:    { main: '#8B5CF6' },              // 連結、強調 (twin3 accent purple)
};
```

### 3.2 Light Mode

```typescript
const lightPalette = {
  primary:    { main: '#1F1F1F' },           // 按鈕、主要操作
  secondary:  { main: '#444746' },           // 次要元素
  background: {
    default: '#F0F4F8',                      // 頁面背景
    paper: '#FFFFFF',                        // 卡片、表面
  },
  text: {
    primary: '#1F1F1F',                      // 標題、內文
    secondary: '#444746',                    // 描述文字
    disabled: '#9AA0A6',                     // 提示、placeholder
  },
  success: { main: '#34A853' },              // 成功狀態
  warning: { main: '#D97706' },              // 警告狀態 (WCAG AA compliant)
  error:   { main: '#EA4335' },              // 錯誤狀態
  info:    { main: '#7C3AED' },              // 連結、強調
};
```

---

## 4. Border Radius

| Token | Value | 用途 |
|-------|-------|------|
| `sm` | 8px | 小元素、內部卡片 |
| `md` | 12px | 按鈕、輸入框、Chip |
| `lg` | 16px | 卡片、容器 |
| `xl` | 24px | Modal、大面板 |
| `2xl` | 32px | 大型按鈕、面板 |
| `full` | 9999px | 藥丸、圓形按鈕 |

---

## 5. Effects

### 5.1 Glassmorphism (iOS Style)

> ⚠️ MUI 無原生支援，需使用 `sx` prop 或 styled components

**Dark Mode:**
```typescript
const darkGlassStyle = {
  background: 'rgba(28, 28, 30, 0.72)',
  backdropFilter: 'blur(40px) saturate(180%)',
  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
};
```

**Light Mode:**
```typescript
const lightGlassStyle = {
  background: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(0, 0, 0, 0.06)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
};
```

### 5.2 Shadow Guidelines

| 元素類型 | 處理方式 |
|----------|----------|
| Glass 元素 | `elevation={0}`, 僅用邊框 |
| Dark Mode 卡片 | 無陰影，靠 glass + border |
| Light Mode 卡片 | `0 2px 8px rgba(0,0,0,0.04)` |
| Modal/Dialog | `0 8px 32px rgba(0,0,0,0.12)` |
| 非 glass 元素 | 使用 MUI elevation |

### 5.3 Button Hover (Invert Effect)

Primary 按鈕 hover 時反轉：填滿 → 描邊

| Mode | Default | Hover |
|------|---------|-------|
| Dark | 白底黑字 | 透明、白框白字 |
| Light | 黑底白字 | 透明、黑框黑字 |

---

## 6. Layout & Responsive

### 6.1 Breakpoints (MUI Default)

| Breakpoint | Width | Device |
|------------|-------|--------|
| `xs` | 0 - 599px | Mobile |
| `sm` | 600 - 899px | Large Mobile |
| `md` | 900 - 1199px | Tablet |
| `lg` | 1200 - 1535px | Desktop |
| `xl` | 1536px+ | Large Desktop |

### 6.2 Grid System

| Device | Columns | Gutter | Margin |
|--------|---------|--------|--------|
| Mobile | 4 | 16px | 16px |
| Tablet | 8 | 24px | 24px |
| Desktop | 12 | 24px | Auto |

### 6.3 Layout Rules

| Device | Sidebar | Chat Input | Content |
|--------|---------|------------|---------|
| Mobile | Hidden (hamburger) | Fixed bottom | 100% |
| Tablet | Collapsible drawer | Fixed bottom | 100% |
| Desktop | Fixed left | Inline | Max 1200px |

---

## 7. Global CSS Overrides

在 `index.css` 或 `CssBaseline` 設定：

### 7.1 Custom Scrollbar
```css
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(142, 142, 147, 0.3); border-radius: 99px; }
::-webkit-scrollbar-thumb:hover { background: rgba(142, 142, 147, 0.5); }
```

### 7.2 Text Selection
```css
::selection {
  background: rgba(139, 92, 246, 0.3); /* twin3 accent purple with opacity */
  color: inherit;
}
```

---

## 8. Icons

| 項目 | 規範 |
|------|------|
| Library | **Lucide React** |
| ✅ 使用 | `<Coins>`, `<Gift>`, `<Clock>`, `<Users>`, `<CheckCircle>`, `<X>`, `<Settings>`, `<Send>` |
| ❌ 禁止 | Emoji |

---

## 9. Language Rules

| 規則 | 說明 |
|------|------|
| UI 語言 | English only |
| Token 格式 | `500 $twin3` |
| 禁止 | 單獨使用 "TWIN" |

---

## 10. Component Theming

所有 `/src/features/` 元件須支援 dark/light mode，使用 `useTheme()` hook：

```typescript
const theme = useTheme();
const isDark = theme.palette.mode === 'dark';
```

### 10.1 Cards
| Component | Dark | Light |
|-----------|------|-------|
| TaskDetailModal | Glass BG, 白字 | 白底, 黑字 |
| TaskOpportunityCard | Glass BG, 白邊框 | 白底, 淡陰影 |

### 10.2 Chat
| Component | Dark | Light |
|-----------|------|-------|
| ChatLayout | `#000000` BG | `#F0F4F8` BG |
| MessageBubble (User) | 淺 glass | `#E8EAED` |
| MessageBubble (AI) | 深 glass | 白底 + 陰影 |

### 10.3 Widgets
| Component | 備註 |
|-----------|------|
| GlobalDashboardWidget | Glass (dark) / White (light) |
| ActiveTaskWidget | Success green 依 mode 不同 |
| DevConsole | 永遠 dark mode |

---

## 11. Widget Display Rules

| 規則 | 說明 |
|------|------|
| 預設 | Inline in chat |
| Popup | 僅 "View Details" 或明確要求時 |
| Chat Avatars | 無 |
| Chat Labels | 無 |

---

## 12. MUI Defaults (沿用不覆寫)

以下使用 MUI 預設值，但顏色仍套用本文件定義的 Palette：

**Tokens**: Spacing, Elevation (非 glass), Transitions, Divider, Overlay  
**Components**: Form inputs, Secondary buttons, Disabled/Focus states, Toast, Tooltip, Skeleton, Link, Tabs  
**Typography**: Line height  
**A11y**: Focus visible, Contrast ratios

---

## 13. File Reference

| 用途 | 路徑 |
|------|------|
| MUI Theme | `/src/theme.ts` |
| Global CSS | `/src/index.css` |
| Chat Layout | `/src/features/chat/ChatLayout.tsx` |
| Task Modal | `/src/features/cards/TaskDetailModal.tsx` |
| Widgets | `/src/features/widgets/` |

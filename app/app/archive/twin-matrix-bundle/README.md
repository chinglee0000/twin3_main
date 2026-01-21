# Twin Matrix Component Bundle

這份資料夾包含了 `Twin Matrix` 元件所需的所有核心檔案。請按照以下步驟將其整合到新的專案中。

## 1. 檔案搬移

請將以下資料夾結構複製到您的 Next.js 專案中 (假設使用 `src/` 目錄結構)：

- `components/twin-matrix-card.tsx` -> `src/components/user/twin-matrix-card.tsx` (或是您喜歡的位置)
- `lib/types/matrix.ts` -> `src/lib/types/matrix.ts`
- `lib/mock-data/` -> `src/lib/mock-data/`

**注意**：`twin-matrix-card.tsx` 中使用了 `@/` 作為 import alias。如果您的專案設定不同，請記得調整引入路徑。

## 2. 安裝依賴

此元件依賴於 `lucide-react` 以及 Shadcn UI 的元件。

```bash
npm install lucide-react
```

確保您的專案中已經安裝並設定好 Shadcn UI。需安裝以下元件：

```bash
npx shadcn@latest add card progress tooltip
```

## 3. 設定樣式 (CSS Variables)

請打開 `styles/matrix-theme.css`，將其中的內容複製並貼上到您專案的 `src/app/globals.css` (或全域 CSS 檔案) 的 `:root` 和 `.dark` 區塊中。

這些變數定義了矩陣四個維度（Physical, Social, Digital, Spiritual）的顏色。

## 4. 使用方式

在您的頁面中引入並使用元件：

```tsx
import { TwinMatrixCard } from "@/components/user/twin-matrix-card"
import { web3EngineerMatrixData } from "@/lib/mock-data/twin-matrix-persona"

export default function Page() {
  return (
    <div className="p-4">
      <TwinMatrixCard data={web3EngineerMatrixData} />
    </div>
  )
}
```

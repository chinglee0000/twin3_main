#!/bin/bash
# Twin3 專案優化腳本
# 執行方式: chmod +x scripts/cleanup.sh && ./scripts/cleanup.sh

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "🚀 開始 Twin3 專案優化..."
echo "📁 專案路徑: $PROJECT_ROOT"
echo ""

# ============================================
# 1. 清理備份文件
# ============================================
echo "=== 步驟 1/6: 清理備份文件 ==="

if [ -d "archive/nested-backup" ]; then
    rm -rf "archive/nested-backup"
    echo "✅ 已刪除 archive/nested-backup/"
else
    echo "⏭️  archive/nested-backup/ 不存在，跳過"
fi

if [ -f "archive/TwinMatrixDemo.tsx" ]; then
    rm -f "archive/TwinMatrixDemo.tsx"
    echo "✅ 已刪除 archive/TwinMatrixDemo.tsx"
else
    echo "⏭️  archive/TwinMatrixDemo.tsx 不存在，跳過"
fi

# 檢查 archive 是否為空，若為空則刪除
if [ -d "archive" ] && [ -z "$(ls -A archive 2>/dev/null)" ]; then
    rm -rf "archive"
    echo "✅ archive 目錄已為空，已刪除"
fi

# ============================================
# 2. 歸檔可疑的大型 HTML 文件
# ============================================
echo ""
echo "=== 步驟 2/6: 歸檔 docs/index.html ==="

if [ -f "docs/index.html" ]; then
    mkdir -p "archive/docs-backup"
    mv "docs/index.html" "archive/docs-backup/index.html.bak"
    echo "✅ 已歸檔 docs/index.html 至 archive/docs-backup/"
else
    echo "⏭️  docs/index.html 不存在，跳過"
fi

# ============================================
# 3. 清理空目錄
# ============================================
echo ""
echo "=== 步驟 3/6: 清理空目錄 ==="

if [ -d "docs/brands" ] && [ -z "$(ls -A docs/brands 2>/dev/null)" ]; then
    rm -rf "docs/brands"
    echo "✅ 已刪除空目錄 docs/brands/"
else
    echo "⏭️  docs/brands/ 不為空或不存在，跳過"
fi

# ============================================
# 4. 整合 Mock Data
# ============================================
echo ""
echo "=== 步驟 4/6: 整合 Mock Data ==="

mkdir -p "src/data/matrix"
mkdir -p "src/data/profiles"

# 移動 matrix 相關資料
if [ -f "src/data/initialMatrixData.ts" ]; then
    mv "src/data/initialMatrixData.ts" "src/data/matrix/"
    echo "✅ 已移動 initialMatrixData.ts 至 src/data/matrix/"
fi

if [ -f "src/data/travelKOLMatrixData.ts" ]; then
    mv "src/data/travelKOLMatrixData.ts" "src/data/matrix/"
    echo "✅ 已移動 travelKOLMatrixData.ts 至 src/data/matrix/"
fi

if [ -f "src/features/twin-matrix/mockData.ts" ]; then
    cp "src/features/twin-matrix/mockData.ts" "src/data/matrix/twinMatrixMockData.ts"
    echo "✅ 已複製 twin-matrix/mockData.ts 至 src/data/matrix/"
    echo "   ⚠️  原始文件保留，需手動更新 import 後刪除"
fi

# 移動 profiles 相關資料
if [ -f "src/features/human-verification/data/mockProfiles.ts" ]; then
    cp "src/features/human-verification/data/mockProfiles.ts" "src/data/profiles/"
    echo "✅ 已複製 mockProfiles.ts 至 src/data/profiles/"
    echo "   ⚠️  原始文件保留，需手動更新 import 後刪除"
fi

# 建立 index.ts 匯出檔
cat > "src/data/matrix/index.ts" << 'EOF'
// Matrix Mock Data
export * from './initialMatrixData';
export * from './travelKOLMatrixData';
export * from './twinMatrixMockData';
EOF
echo "✅ 已建立 src/data/matrix/index.ts"

cat > "src/data/profiles/index.ts" << 'EOF'
// Profile Mock Data
export * from './mockProfiles';
EOF
echo "✅ 已建立 src/data/profiles/index.ts"

# ============================================
# 5. 移動 i18n 資源
# ============================================
echo ""
echo "=== 步驟 5/6: 移動 i18n 資源 ==="

if [ -d "docs/i18n" ]; then
    mkdir -p "src/i18n"
    cp -r docs/i18n/* "src/i18n/"
    echo "✅ 已複製 docs/i18n/ 至 src/i18n/"
    echo "   ⚠️  原始文件保留，確認無問題後可刪除 docs/i18n/"
else
    echo "⏭️  docs/i18n/ 不存在，跳過"
fi

# ============================================
# 6. 驗證專案
# ============================================
echo ""
echo "=== 步驟 6/6: 驗證專案 ==="

if [ -f "package.json" ]; then
    echo "🔍 執行 TypeScript 編譯檢查..."
    if npx tsc --noEmit 2>/dev/null; then
        echo "✅ TypeScript 編譯檢查通過"
    else
        echo "⚠️  TypeScript 編譯有警告或錯誤，請手動檢查"
    fi
else
    echo "⏭️  未找到 package.json，跳過編譯檢查"
fi

# ============================================
# 完成摘要
# ============================================
echo ""
echo "============================================"
echo "🎉 優化完成！"
echo "============================================"
echo ""
echo "已完成的操作:"
echo "  ✅ 清理備份文件"
echo "  ✅ 歸檔 docs/index.html"
echo "  ✅ 清理空目錄"
echo "  ✅ 整合 Mock Data 至 src/data/"
echo "  ✅ 移動 i18n 資源至 src/i18n/"
echo ""
echo "⚠️  需要手動處理的項目:"
echo "  1. 更新 import 路徑後刪除:"
echo "     - src/features/twin-matrix/mockData.ts"
echo "     - src/features/human-verification/data/mockProfiles.ts"
echo "     - docs/i18n/ (確認無問題後)"
echo ""
echo "  2. ChatLayout.tsx 重構（1496行）需另行處理"
echo ""
echo "完成時間: $(date '+%Y-%m-%d %H:%M:%S')"

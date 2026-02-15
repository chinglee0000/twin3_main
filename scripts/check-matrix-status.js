// 在 Console 中執行此腳本來檢查 Matrix 狀態
console.log('=== Twin Matrix 狀態檢查 ===\n');

// 1. 檢查 localStorage
const stored = localStorage.getItem('twin3-context-v3');
if (stored) {
    const data = JSON.parse(stored);
    const matrix = data.state?.matrixData;
    
    console.log('1️⃣ Matrix 數據:');
    console.log('  - discoveredTraits:', matrix?.discoveredTraits);
    console.log('  - humanityIndex:', matrix?.humanityIndex);
    console.log('  - avgStrength:', matrix?.avgStrength);
    
    const trait00 = matrix?.traits?.find(t => t.id === '00');
    console.log('\n2️⃣ Trait 00 (Humanity Index):');
    if (trait00) {
        console.log('  - discovered:', trait00.discovered);
        console.log('  - strength:', trait00.strength);
        console.log('  - name:', trait00.name);
        console.log('  - unlockedAt:', trait00.unlockedAt);
        
        if (trait00.unlockedAt) {
            const timeDiff = Date.now() - new Date(trait00.unlockedAt).getTime();
            console.log('  - 時間差:', Math.round(timeDiff / 1000), '秒');
            console.log('  - 是否在 10 秒內:', timeDiff < 10000 ? '✅ 是' : '❌ 否');
        }
    } else {
        console.log('  ⚠️ 找不到 Trait 00');
    }
} else {
    console.log('❌ 找不到 localStorage 數據');
}

console.log('\n3️⃣ 建議:');
if (!stored || JSON.parse(stored).state?.matrixData?.discoveredTraits === 0) {
    console.log('  Matrix 還是空的，可能是:');
    console.log('  1. 驗證還沒完成');
    console.log('  2. 驗證完成但數據沒有更新');
    console.log('  3. 需要硬重新加載頁面 (Cmd+Shift+R)');
}

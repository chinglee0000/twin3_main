// Twin Matrix 解鎖動畫調試腳本
// 在瀏覽器 Console 中執行此腳本來檢查問題

console.log('🔍 開始調試 Twin Matrix 解鎖動畫...\n');

// 1. 檢查 localStorage
console.log('1️⃣ 檢查 localStorage:');
const storedData = localStorage.getItem('twin3-context-v2');
if (storedData) {
    const parsed = JSON.parse(storedData);
    console.log('  - matrixData.discoveredTraits:', parsed.state?.matrixData?.discoveredTraits);
    console.log('  - matrixData.humanityIndex:', parsed.state?.matrixData?.humanityIndex);
    const trait00 = parsed.state?.matrixData?.traits?.find(t => t.id === '00');
    if (trait00) {
        console.log('  - Trait 00 (Humanity Index):');
        console.log('    - discovered:', trait00.discovered);
        console.log('    - strength:', trait00.strength);
        console.log('    - unlockedAt:', trait00.unlockedAt);
        if (trait00.unlockedAt) {
            const timeDiff = Date.now() - new Date(trait00.unlockedAt).getTime();
            console.log('    - 時間差:', timeDiff, 'ms (', Math.round(timeDiff/1000), '秒)');
            console.log('    - isRecent (< 10s):', timeDiff < 10000);
        }
    }
} else {
    console.log('  ⚠️ 沒有找到 localStorage 數據');
}

// 2. 檢查 DOM 元素
console.log('\n2️⃣ 檢查 DOM 元素:');
const trait00Button = document.querySelector('[aria-label*="Humanity Index"]');
if (trait00Button) {
    console.log('  ✅ 找到 Trait 00 按鈕');
    console.log('  - classList:', trait00Button.classList.toString());
    console.log('  - backgroundColor:', getComputedStyle(trait00Button).backgroundColor);
    console.log('  - animation:', getComputedStyle(trait00Button).animation);
} else {
    console.log('  ⚠️ 沒有找到 Trait 00 按鈕');
    console.log('  - 嘗試查找所有 button 元素...');
    const allButtons = document.querySelectorAll('button[aria-label]');
    console.log('  - 找到', allButtons.length, '個帶 aria-label 的按鈕');
    if (allButtons.length > 0) {
        console.log('  - 前 5 個按鈕的 aria-label:');
        Array.from(allButtons).slice(0, 5).forEach((btn, i) => {
            console.log(`    ${i + 1}. ${btn.getAttribute('aria-label')}`);
        });
    }
}

// 3. 檢查 CSS 動畫
console.log('\n3️⃣ 檢查 CSS 動畫:');
const styleSheets = Array.from(document.styleSheets);
let foundAnimation = false;
styleSheets.forEach(sheet => {
    try {
        const rules = Array.from(sheet.cssRules || []);
        rules.forEach(rule => {
            if (rule.cssText && rule.cssText.includes('trait-unlock')) {
                console.log('  ✅ 找到動畫定義:', rule.cssText.substring(0, 100) + '...');
                foundAnimation = true;
            }
        });
    } catch (e) {
        // CORS 錯誤，跳過
    }
});
if (!foundAnimation) {
    console.log('  ⚠️ 沒有找到 trait-unlock 動畫定義');
}

// 4. 建議
console.log('\n4️⃣ 建議:');
console.log('  如果動畫沒有播放，請嘗試:');
console.log('  1. 清除 localStorage: localStorage.clear(); location.reload()');
console.log('  2. 檢查 Console 是否有錯誤訊息');
console.log('  3. 檢查是否有 "🎬 Triggering unlock animation" 日誌');
console.log('  4. 確認驗證完成後 Twin Matrix Widget 是否出現');

console.log('\n✅ 調試完成');

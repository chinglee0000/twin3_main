# Twin3 POC 流程圖

```mermaid
flowchart TD
    Start([使用者進入頁面]) --> CTA1[點擊 CTA 按鈕]
    
    CTA1 --> Card1[顯示對話視窗<br/>人類驗證選項卡片]
    
    Card1 --> Options{顯示驗證方式選項}
    Options --> Opt1[Google reCAPTCHA v2]
    Options --> Opt2[Google reCAPTCHA v3]
    Options --> Opt3[Image CAPTCHA]
    Options --> Opt4[SMS Verification]
    Options --> Opt5[Social Sign-In<br/>Apple/Google/Facebook]
    Options --> Opt6[Biometric Verification]
    Options --> Opt7[Math/Logic CAPTCHA]
    Options --> Opt8[Audio CAPTCHA]
    Options --> Opt9[Wallet Signature<br/>Web3]
    Options --> Opt10[更多驗證方式...]
    
    Opt1 --> SelectVerify[使用者選擇一種驗證方式]
    Opt2 --> SelectVerify
    Opt3 --> SelectVerify
    Opt4 --> SelectVerify
    Opt5 --> SelectVerify
    Opt6 --> SelectVerify
    Opt7 --> SelectVerify
    Opt8 --> SelectVerify
    Opt9 --> SelectVerify
    Opt10 --> SelectVerify
    
    SelectVerify --> Progress[顯示驗證進度條<br/>模擬驗證中<br/>跳過實際驗證流程]
    
    Progress --> HumanityCard[顯示 Humanity Index 卡片]
    
    HumanityCard --> Display1[顯示已完成驗證:<br/>✓ Google reCAPTCHA]
    Display1 --> Display2[進度條更新:<br/>0000 Humanity Index = 135/255]
    Display2 --> Display3[顯示未完成驗證列表<br/>帶 info icon + hover tooltip<br/>說明可增加人類分數]
    
    Display3 --> Unlock[卡片下方解鎖動畫<br/>View My Twin Matrix 按鈕可用]
    
    Unlock --> Decision1{使用者操作?}
    
    Decision1 -->|點擊其他驗證| Options
    Decision1 -->|點擊 View My Twin Matrix| Matrix
    
    Matrix[顯示 Twin Matrix 卡片<br/>16×16 網格]
    
    Matrix --> MatrixState[左上角格子 0,0 有顏色<br/>Humanity Index = 135<br/>其餘 255 格為空/灰色]
    
    MatrixState --> ClickGrid{使用者點擊格子?}
    
    ClickGrid -->|點擊 0,0| Tooltip[顯示 Tooltip:<br/>00 Humanity Index<br/>Score: 135/255 53%<br/>Physical 維度<br/>紅色色階]
    
    ClickGrid -->|點擊其他空格| EmptyTooltip[顯示 Tooltip:<br/>未解鎖<br/>完成更多驗證以解鎖]
    
    Tooltip --> CTA2{點擊下方 CTA 按鈕?}
    EmptyTooltip --> CTA2
    
    CTA2 -->|是| Simulate[開始模擬 KOL Persona]
    CTA2 -->|否| MatrixState
    
    Simulate --> PersonaSetup[設定:<br/>5000粉旅遊 KOL<br/>性別: 女<br/>參考 Twin Matrix 編碼.pdf]
    
    PersonaSetup --> FillMatrix[填充 Twin Matrix 數值]
    
    FillMatrix --> PhysicalDim[Physical 維度<br/>0000=135, 0001=168<br/>0003=198, 0033=185...]
    FillMatrix --> SocialDim[Social 維度<br/>0040=215, 0041=192<br/>004D=205, 004E=218...]
    FillMatrix --> DigitalDim[Digital 維度<br/>0080=208, 0090=232<br/>00AC=198, 00AD=192...]
    FillMatrix --> SpiritualDim[Spiritual 維度<br/>00C2=210, 00D2=215<br/>00D4=185...]
    
    PhysicalDim --> ShowResult[顯示完整 Twin Matrix<br/>已填充格子顯示對應顏色<br/>Physical=紅 Social=藍<br/>Digital=綠 Spiritual=黃]
    SocialDim --> ShowResult
    DigitalDim --> ShowResult
    SpiritualDim --> ShowResult
    
    ShowResult --> End([POC 流程結束])
    
    style Start fill:#e1f5e1
    style End fill:#ffe1e1
    style Card1 fill:#e3f2fd
    style HumanityCard fill:#fff3e0
    style Matrix fill:#f3e5f5
    style Simulate fill:#fce4ec
    style ShowResult fill:#e0f2f1
```

## 流程說明

### 階段 1: 初始驗證
1. 使用者進入頁面並點擊 CTA 按鈕
2. 顯示人類驗證選項卡片，包含 10+ 種驗證方式
3. 使用者選擇一種驗證方式（模擬驗證，跳過實際流程）

### 階段 2: Humanity Index 卡片
1. 顯示已完成的驗證（✓ Google reCAPTCHA）
2. 顯示 Humanity Index 分數（0000 = 135/255）
3. 顯示未完成驗證列表（帶 info icon 和 tooltip）
4. 解鎖 "View My Twin Matrix" 按鈕

### 階段 3: Twin Matrix 視覺化
1. 顯示 16×16 網格
2. 左上角格子 (0,0) 有顏色，代表 Humanity Index
3. 其餘 255 格為空/灰色（未解鎖）
4. 點擊格子顯示對應 tooltip

### 階段 4: KOL Persona 模擬
1. 點擊 CTA 按鈕開始模擬
2. 設定 5000 粉旅遊 KOL（女性）
3. 填充 Twin Matrix 各維度數值
4. 顯示完整 Twin Matrix，各維度用不同顏色表示

## 維度顏色對應
- **Physical**: 紅色 (#137cec)
- **Social**: 藍色 (#21c45d)
- **Digital**: 綠色 (#8a2ce2)
- **Spiritual**: 黃色 (#f08228)

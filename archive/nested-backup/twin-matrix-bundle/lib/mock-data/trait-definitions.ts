/**
 * Twin Matrix Trait Definitions
 * 
 * 為每個 Hex ID 定義名稱和描述
 */

export interface TraitDefinition {
  id: string
  name: string
  description: string
}

// Physical Traits (00-3F)
export const physicalTraitDefinitions: Record<string, TraitDefinition> = {
  '00': { id: '00', name: 'Endurance Coding', description: '長時間編程的體力耐力' },
  '01': { id: '01', name: 'Eye Strain Resistance', description: '對螢幕藍光的抗性' },
  '05': { id: '05', name: 'Hand Dexterity', description: '鍵盤打字的手指靈活度' },
  '08': { id: '08', name: 'Blue Light Adaptation', description: '對長時間螢幕使用的適應' },
  '0C': { id: '0C', name: 'Nutrition Awareness', description: '對營養需求的認知' },
  
  '10': { id: '10', name: 'Focus Stamina', description: '專注力持久度' },
  '13': { id: '13', name: 'Posture Awareness', description: '久坐時的姿勢意識' },
  '14': { id: '14', name: 'Gym Consistency', description: '健身房訓練的持續性' },
  '18': { id: '18', name: 'Stress Resilience', description: '壓力下的身體適應力' },
  '1B': { id: '1B', name: 'Circadian Rhythm', description: '生理時鐘的穩定性' },
  
  '20': { id: '20', name: 'Sleep Optimization', description: '短時間高效睡眠' },
  '24': { id: '24', name: 'Caffeine Tolerance', description: '咖啡因代謝能力' },
  '25': { id: '25', name: 'Running Endurance', description: '跑步耐力和心肺功能' },
  '28': { id: '28', name: 'Ergonomic Sensitivity', description: '對工作環境舒適度的敏感' },
  '2A': { id: '2A', name: 'Recovery Speed', description: '疲勞後的恢復速度' },
  
  '30': { id: '30', name: 'Energy Management', description: '一天中精力分配的能力' },
  '31': { id: '31', name: 'Flexibility Training', description: '身體柔軟度和伸展能力' },
  '35': { id: '35', name: 'Hydration Awareness', description: '水分補充的意識' },
  '39': { id: '39', name: 'Exercise Integration', description: '將運動融入日常的能力' },
  '3A': { id: '3A', name: 'Health Monitoring', description: '對身體狀況的監控意識' },
  '3C': { id: '3C', name: 'Injury Prevention', description: '運動傷害預防意識' },
}

// Social Traits (40-7F)
export const socialTraitDefinitions: Record<string, TraitDefinition> = {
  '40': { id: '40', name: 'Tech Community', description: '在技術社群中的活躍度' },
  '42': { id: '42', name: 'Code Review', description: '代碼審查時的溝通技巧' },
  '44': { id: '44', name: 'Pair Programming', description: '結對編程的協作能力' },
  '45': { id: '45', name: 'Mentorship', description: '指導初級開發者的能力' },
  '48': { id: '48', name: 'Open Source Collaboration', description: '開源項目協作能力' },
  '49': { id: '49', name: 'Networking Skills', description: '專業人脈建立能力' },
  '4C': { id: '4C', name: 'Client Communication', description: '客戶溝通技巧' },
  
  '50': { id: '50', name: 'Remote Communication', description: '遠程工作溝通效率' },
  '51': { id: '51', name: 'Async Collaboration', description: '非同步協作能力' },
  '53': { id: '53', name: 'Technical Writing', description: '技術文檔撰寫能力' },
  '56': { id: '56', name: 'Conference Speaking', description: '技術會議演講能力' },
  '58': { id: '58', name: 'Team Leadership', description: '技術團隊領導力' },
  '5A': { id: '5A', name: 'Conflict Resolution', description: '技術爭議解決能力' },
  '5D': { id: '5D', name: 'Knowledge Sharing', description: '知識分享的主動性' },
  
  '60': { id: '60', name: 'Cross-team Collaboration', description: '跨團隊協作能力' },
  '63': { id: '63', name: 'Stakeholder Management', description: '與非技術人員溝通' },
  '64': { id: '64', name: 'Active Listening', description: '積極傾聽的能力' },
  '67': { id: '67', name: 'Empathy in Tech', description: '技術工作中的同理心' },
  '6B': { id: '6B', name: 'Community Building', description: '社群建設能力' },
  '6C': { id: '6C', name: 'Public Relations', description: '公共關係處理能力' },
  
  '70': { id: '70', name: 'Cultural Sensitivity', description: '跨文化溝通敏感度' },
  '71': { id: '71', name: 'Feedback Delivery', description: '建設性反饋的給予' },
  '74': { id: '74', name: 'Negotiation Skills', description: '技術談判能力' },
  '78': { id: '78', name: 'Social Media Presence', description: '社交媒體影響力' },
  '7A': { id: '7A', name: 'Workshop Facilitation', description: '工作坊引導能力' },
  '7C': { id: '7C', name: 'Inclusive Communication', description: '包容性溝通方式' },
}

// Digital Traits (80-BF)
export const digitalTraitDefinitions: Record<string, TraitDefinition> = {
  '80': { id: '80', name: 'Blockchain Architecture', description: '區塊鏈系統架構設計' },
  '82': { id: '82', name: 'Smart Contract Security', description: '智能合約安全審計' },
  '85': { id: '85', name: 'DeFi Protocols', description: 'DeFi 協議開發經驗' },
  '86': { id: '86', name: 'Web3 Integration', description: 'Web3 前端整合能力' },
  '89': { id: '89', name: 'Gas Optimization', description: 'Gas 費用優化技巧' },
  '8D': { id: '8D', name: 'Cryptography', description: '密碼學原理應用' },
  
  '90': { id: '90', name: 'Consensus Mechanisms', description: '共識機制理解' },
  '91': { id: '91', name: 'Solidity Mastery', description: 'Solidity 編程精通' },
  '94': { id: '94', name: 'Layer 2 Solutions', description: 'Layer 2 擴容方案' },
  '98': { id: '98', name: 'NFT Standards', description: 'NFT 標準協議熟悉度' },
  '9C': { id: '9C', name: 'DAO Governance', description: 'DAO 治理機制設計' },
  
  'A0': { id: 'A0', name: 'Cross-chain Bridges', description: '跨鏈橋接技術' },
  'A3': { id: 'A3', name: 'MEV Protection', description: 'MEV 攻擊防護' },
  'A5': { id: 'A5', name: 'Tokenomics Design', description: '代幣經濟學設計' },
  'A7': { id: 'A7', name: 'Privacy Protocols', description: '隱私保護協議' },
  'AB': { id: 'AB', name: 'Decentralized Storage', description: '去中心化存儲方案' },
  
  'B0': { id: 'B0', name: 'Oracle Integration', description: '預言機整合技術' },
  'B2': { id: 'B2', name: 'Zero-Knowledge Proofs', description: '零知識證明應用' },
  'B4': { id: 'B4', name: 'Interoperability', description: '區塊鏈互操作性' },
  'B8': { id: 'B8', name: 'Wallet Integration', description: '錢包整合開發' },
  'BC': { id: 'BC', name: 'Subgraph Development', description: 'The Graph 子圖開發' },
}

// Spiritual Traits (C0-FF)
export const spiritualTraitDefinitions: Record<string, TraitDefinition> = {
  'C0': { id: 'C0', name: 'Decentralization Philosophy', description: '去中心化哲學理念' },
  'C3': { id: 'C3', name: 'Financial Sovereignty', description: '金融主權意識' },
  'C6': { id: 'C6', name: 'Open Source Ethics', description: '開源倫理觀念' },
  'C8': { id: 'C8', name: 'Mindfulness Practice', description: '正念冥想練習' },
  'CA': { id: 'CA', name: 'Innovation Mindset', description: '創新思維模式' },
  'CD': { id: 'CD', name: 'Work-Life Balance', description: '工作生活平衡意識' },
  
  'D0': { id: 'D0', name: 'Future Vision', description: '對未來技術的願景' },
  'D2': { id: 'D2', name: 'Self-Reflection', description: '自我反思的習慣' },
  'D4': { id: 'D4', name: 'Problem Solving', description: '複雜問題解決能力' },
  'D8': { id: 'D8', name: 'Continuous Learning', description: '持續學習的動力' },
  'D9': { id: 'D9', name: 'Growth Mindset', description: '成長型思維模式' },
  'DC': { id: 'DC', name: 'Risk Assessment', description: '技術風險評估能力' },
  
  'E0': { id: 'E0', name: 'Ethical Coding', description: '編程倫理意識' },
  'E3': { id: 'E3', name: 'Purpose Alignment', description: '目標與價值觀一致性' },
  'E5': { id: 'E5', name: 'Resilience Building', description: '心理韌性培養' },
  'E7': { id: 'E7', name: 'Transparency Values', description: '透明度價值觀' },
  'EA': { id: 'EA', name: 'Gratitude Practice', description: '感恩練習習慣' },
  'EB': { id: 'EB', name: 'Permissionless Innovation', description: '無需許可的創新精神' },
  
  'F0': { id: 'F0', name: 'Digital Rights', description: '數位權利意識' },
  'F2': { id: 'F2', name: 'Meditation Routine', description: '冥想日常習慣' },
  'F4': { id: 'F4', name: 'Censorship Resistance', description: '抗審查理念' },
  'F8': { id: 'F8', name: 'Global Accessibility', description: '全球可及性願景' },
  'FA': { id: 'FA', name: 'Sustainable Technology', description: '可持續技術理念' },
  'FC': { id: 'FC', name: 'Human-Centric Design', description: '以人為本的設計思維' },
}

// 合併所有定義
export const allTraitDefinitions: Record<string, TraitDefinition> = {
  ...physicalTraitDefinitions,
  ...socialTraitDefinitions,
  ...digitalTraitDefinitions,
  ...spiritualTraitDefinitions,
}

// 輔助函數：獲取 trait 定義
export function getTraitDefinition(traitId: string): TraitDefinition | undefined {
  return allTraitDefinitions[traitId.toUpperCase()]
}

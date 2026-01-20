/**
 * Human Verification Methods Data
 * Available verification options for users to choose from
 */

import type { VerificationMethod } from '../types/verification';

export const verificationMethods: VerificationMethod[] = [
    {
        id: 'recaptcha-v2',
        name: 'Google reCAPTCHA v2',
        description: '點擊 "I\'m not a robot" 勾選框',
        icon: 'Shield',
        estimatedTime: '5 seconds',
        humanityIndexBoost: 135,
    },
    {
        id: 'recaptcha-v3',
        name: 'Google reCAPTCHA v3',
        description: '無形驗證，背景風險分析',
        icon: 'ShieldCheck',
        estimatedTime: 'Instant',
        humanityIndexBoost: 150,
    },
    {
        id: 'image-captcha',
        name: 'Image CAPTCHA',
        description: '選擇包含特定物件的圖片（如交通號誌、公車）',
        icon: 'Image',
        estimatedTime: '10 seconds',
        humanityIndexBoost: 120,
    },
    {
        id: 'sms-verification',
        name: 'SMS Verification',
        description: '手機簡訊驗證碼',
        icon: 'Smartphone',
        estimatedTime: '30 seconds',
        humanityIndexBoost: 180,
    },
    {
        id: 'social-signin',
        name: 'Social Sign-In',
        description: '使用 Google / Apple / Facebook 帳號登入',
        icon: 'Users',
        estimatedTime: '15 seconds',
        humanityIndexBoost: 160,
    },
    {
        id: 'biometric',
        name: 'Biometric Verification',
        description: '指紋或臉部辨識',
        icon: 'Fingerprint',
        estimatedTime: '5 seconds',
        humanityIndexBoost: 200,
    },
    {
        id: 'math-captcha',
        name: 'Math CAPTCHA',
        description: '解答簡單數學題（例如：3 + 5 = ?）',
        icon: 'Calculator',
        estimatedTime: '10 seconds',
        humanityIndexBoost: 110,
    },
    {
        id: 'audio-captcha',
        name: 'Audio CAPTCHA',
        description: '聽音訊輸入內容（適合視障使用者）',
        icon: 'Volume2',
        estimatedTime: '20 seconds',
        humanityIndexBoost: 130,
    },
    {
        id: 'wallet-signature',
        name: 'Wallet Signature',
        description: 'Web3 錢包簽章驗證',
        icon: 'Wallet',
        estimatedTime: '10 seconds',
        humanityIndexBoost: 170,
    },
    {
        id: 'device-fingerprint',
        name: 'Device Fingerprinting',
        description: '裝置環境檢測（瀏覽器、作業系統）',
        icon: 'Cpu',
        estimatedTime: 'Instant',
        humanityIndexBoost: 140,
    },
    {
        id: 'text-captcha',
        name: 'Text CAPTCHA',
        description: '輸入扭曲的文字或數字',
        icon: 'Type',
        estimatedTime: '15 seconds',
        humanityIndexBoost: 100,
    },
    {
        id: 'logic-puzzle',
        name: 'Logic Puzzle',
        description: '完成簡單邏輯謎題',
        icon: 'Brain',
        estimatedTime: '20 seconds',
        humanityIndexBoost: 125,
    },
];

// Helper function to get method by ID
export const getVerificationMethod = (id: string): VerificationMethod | undefined => {
    return verificationMethods.find(method => method.id === id);
};

// Helper function to calculate total humanity index from completed methods
export const calculateHumanityIndex = (completedMethodIds: string[]): number => {
    const total = completedMethodIds.reduce((sum, id) => {
        const method = getVerificationMethod(id);
        return sum + (method?.humanityIndexBoost || 0);
    }, 0);

    // Cap at 255 (max value)
    return Math.min(total, 255);
};

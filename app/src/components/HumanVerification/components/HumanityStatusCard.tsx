import React, { useEffect, useState } from 'react';
import { Lock, ArrowRight, CheckCircle2, Info } from 'lucide-react';
import type { VerificationMethod, HumanityCardVariant } from '../types';
import { verificationMethods as allVerificationMethods } from '../data/verificationMethods';

interface HumanityStatusCardProps {
    humanityIndex: number;
    completedMethods: string[]; // IDs
    availableMethods: VerificationMethod[];
    variant: HumanityCardVariant; // Derived from props in parent usually, but user spec didn't list it in props, implied by logic? "locked/unlocked variant". I will keep it or derive it? User listed "locked" and "unlocked" variants. I will keep it as prop or derive. Parent in Task 8 says `locked` if 0 methods? 
    // Actually user spec for Task 8 props:
    // interface HumanityStatusCardProps { humanityIndex, completedMethods, availableMethods, onViewMatrix }
    // It DOES NOT list 'variant'.
    // BUT later says "locked variant: ...", "unlocked variant: ...".
    // I will derive variant from `completedMethods.length > 0`. OR add text prop if desired.
    // I'll stick to the strict props requested:
    onViewMatrix: () => void;
}

export const HumanityStatusCard: React.FC<HumanityStatusCardProps> = ({
    humanityIndex,
    completedMethods,
    availableMethods,
    onViewMatrix
}) => {
    // Derive variant
    const isUnlocked = completedMethods.length > 0;
    const maxScore = 255;
    const percentage = Math.min(100, Math.max(0, (humanityIndex / maxScore) * 100));

    // Animation state
    const [showPulse, setShowPulse] = useState(false);

    useEffect(() => {
        if (isUnlocked) {
            setShowPulse(true);
            const timer = setTimeout(() => setShowPulse(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isUnlocked]);

    // Lookup completed method details
    const completedDetails = allVerificationMethods.filter(m => completedMethods.includes(m.id));

    return (
        <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6">
            {/* Header: Score & Progress */}
            <div className="mb-6">
                <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xs font-medium text-gray-400 tracking-wider">
                        HUMANITY INDEX
                    </span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-white">
                            {Math.round(humanityIndex)}
                        </span>
                        <span className="text-sm text-gray-500">
                            /{maxScore}
                        </span>
                    </div>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-violet-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>

            {/* Lists Container */}
            <div className="flex flex-col gap-3 mb-8">
                {/* Completed Methods (Green) */}
                {completedDetails.map(method => (
                    <div key={method.id} className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-green-500" />
                            <span className="text-sm font-medium text-white/90">
                                {method.name}
                            </span>
                        </div>
                        <span className="text-xs font-bold text-green-500">
                            +{Math.round(method.weight * 255)}
                        </span>
                    </div>
                ))}

                {/* Available Methods (Gray) */}
                {availableMethods.map(method => (
                    <div key={method.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 opacity-60">
                        <div className="flex items-center gap-2">
                            <Info size={16} className="text-gray-400" />
                            <span className="text-sm text-gray-400">
                                {method.name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Unlock Button */}
            <button
                disabled={!isUnlocked}
                onClick={onViewMatrix}
                className={`
                    w-full py-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-base transition-all duration-300 relative overflow-hidden group
                    ${isUnlocked
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg cursor-pointer hover:shadow-blue-500/25'
                        : 'bg-white/5 text-white/30 cursor-not-allowed'
                    }
                    ${showPulse ? 'animate-pulse' : ''}
                `}
            >
                <div className="relative z-10 flex items-center gap-2">
                    {isUnlocked ? (
                        <>
                            <span>View My Twin Matrix</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    ) : (
                        <>
                            <Lock size={18} />
                            <span>Complete verification to unlock</span>
                        </>
                    )}
                </div>

                {/* Mask / Lock Overlay (Visual logic per spec) */}
                <div
                    className={`
                        absolute inset-0 bg-black/40 backdrop-blur-[2px]
                        transition-opacity duration-300
                        ${isUnlocked ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                    `}
                />
            </button>
        </div>
    );
};

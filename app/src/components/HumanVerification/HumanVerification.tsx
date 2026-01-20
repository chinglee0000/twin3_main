import React, { useState, useMemo } from 'react';
import { VerificationOptions } from './components/VerificationOptions';
import { HumanityStatusCard } from './components/HumanityStatusCard';
import { VerificationLoader } from './components/VerificationLoader';
import { verificationMethods, calculateHumanityIndex } from './data/verificationMethods';


export const HumanVerification: React.FC = () => {
    const [completedMethods, setCompletedMethods] = useState<string[]>([]);
    const [verifyingMethodId, setVerifyingMethodId] = useState<string | null>(null);

    const score = useMemo(() => calculateHumanityIndex(completedMethods), [completedMethods]);

    const handleMethodSelect = (methodId: string) => {
        if (completedMethods.includes(methodId)) return;
        setVerifyingMethodId(methodId);
    };

    const handleVerificationComplete = () => {
        if (verifyingMethodId) {
            setCompletedMethods(prev => [...prev, verifyingMethodId]);
            setVerifyingMethodId(null);
        }
    };

    const handleViewMatrix = () => {
        console.log('Unlock clicked - Matrix View');
        // Logic to switch view would go here
    };

    const activeMethod = verifyingMethodId
        ? verificationMethods.find(m => m.id === verifyingMethodId)
        : null;

    // Available methods for status card
    const availableMethods = verificationMethods.filter(m => !completedMethods.includes(m.id));

    if (activeMethod) {
        return (
            <VerificationLoader
                methodName={activeMethod.name}
                onComplete={handleVerificationComplete}
            />
        );
    }

    return (
        <div className="flex flex-col gap-6 w-full max-w-md mx-auto p-4 animate-fade-in">
            {/* Status Card */}
            <HumanityStatusCard
                humanityIndex={score}
                completedMethods={completedMethods}
                availableMethods={availableMethods}
                variant={completedMethods.length > 0 ? 'unlocked' : 'locked'}
                onViewMatrix={handleViewMatrix}
            />

            {/* Verification Methods Selection */}
            <div className="flex flex-col gap-3">
                <div className="text-sm font-medium text-gray-400 uppercase tracking-wider px-1">
                    Select Verification
                </div>
                <VerificationOptions
                    methods={verificationMethods}
                    completedMethods={completedMethods}
                    selectedMethodId={null} // Selection triggers immediate verification in this flow
                    onSelect={handleMethodSelect}
                />
            </div>
        </div>
    );
};

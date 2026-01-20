import React, { useState } from 'react';
import { VerificationWidget, generateVerificationCode } from '../features/widgets/VerificationWidget';

export const VerificationFlowDemo: React.FC = () => {
    const [verifying, setVerifying] = useState(false);

    const handleVerify = () => {
        setVerifying(true);
        setTimeout(() => {
            setVerifying(false);
            alert('Verification simulated!');
        }, 2000);
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: '#0f111a'
        }}>
            <div style={{ padding: '20px' }}>
                <h1 style={{ color: '#fff', marginBottom: '20px', textAlign: 'center' }}>Verification Widget Demo</h1>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <VerificationWidget
                        code={generateVerificationCode()}
                        platform="twitter"
                        username="demo_user"
                        onVerify={handleVerify}
                        isVerifying={verifying}
                    />
                    <VerificationWidget
                        code={generateVerificationCode()}
                        platform="instagram"
                        username="active_user"
                        onVerify={handleVerify}
                        isVerifying={verifying}
                    />
                </div>
            </div>
        </div>
    );
};

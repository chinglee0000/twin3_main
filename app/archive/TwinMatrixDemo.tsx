/**
 * Twin Matrix Card Demo Page
 * 
 * A standalone page to test and demonstrate the TwinMatrixCard component
 * with the 16x16 grid layout.
 */
import React from 'react';
import { TwinMatrixCard } from './features/cards/TwinMatrixCard';
import { web3EngineerMatrixData } from './features/cards/twin-matrix/mockData';
import './index.css';

export const TwinMatrixDemo: React.FC = () => {
    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
            padding: '40px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px',
        }}>
            {/* Header */}
            <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                <h1 style={{
                    fontSize: '32px',
                    fontWeight: 500,
                    color: '#ffffff',
                    marginBottom: '12px',
                    fontFamily: 'Montserrat, Inter, sans-serif',
                }}>
                    Twin Matrix Card Demo
                </h1>
                <p style={{
                    fontSize: '14px',
                    color: '#8e8e93',
                    lineHeight: 1.6,
                }}>
                    16×16 grid visualization showing 256 traits across 4 dimensions:
                    Physical (blue), Social (green), Digital (purple), Spiritual (orange)
                </p>
            </div>

            {/* TwinMatrixCard Component */}
            <TwinMatrixCard
                data={web3EngineerMatrixData}
                onExplore={() => {
                    console.log('Explore clicked');
                    alert('Explore Your Matrix clicked!');
                }}
            />

            {/* Legend */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                justifyContent: 'center',
                padding: '20px',
                background: 'rgba(28, 28, 30, 0.6)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
            }}>
                {[
                    { label: 'Physical', color: '#137cec' },
                    { label: 'Social', color: '#21c45d' },
                    { label: 'Digital', color: '#8a2ce2' },
                    { label: 'Spiritual', color: '#f08228' },
                    { label: 'Undiscovered', color: '#dedfe3' },
                ].map((item) => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '4px',
                            backgroundColor: item.color,
                        }} />
                        <span style={{ fontSize: '13px', color: '#ffffff' }}>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TwinMatrixDemo;

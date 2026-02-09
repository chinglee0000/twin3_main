import React from 'react';
import { TwinMatrixCard } from '../../twin-matrix/TwinMatrixCard';
import { web3EngineerMatrixData } from '../../../data/matrix/twinMatrixMockData';

export const MatrixView: React.FC = () => {
    return (
        <div className="matrix-view animate-fade-in scrollbar-hide" style={{
            padding: '24px',
            overflow: 'auto',
            height: '100%',
            animation: 'fadeIn 0.3s ease-in-out'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <TwinMatrixCard
                    data={web3EngineerMatrixData}
                    onExplore={() => {
                        console.log('Explore Twin Matrix');
                    }}
                />
            </div>
        </div>
    );
};

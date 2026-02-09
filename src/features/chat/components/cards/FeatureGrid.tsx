import React from 'react';
import { ShieldCheck, Grid3X3, Bot } from 'lucide-react';

interface Feature {
    icon: string;
    title: string;
    description: string;
}

interface FeatureGridProps {
    features: Feature[];
}

const getIcon = (iconName: string) => {
    switch (iconName) {
        case 'verification': return <ShieldCheck size={24} className="text-accent" />;
        case 'matrix': return <Grid3X3 size={24} className="text-accent" />;
        case 'agent': return <Bot size={24} className="text-accent" />;
        default: return <ShieldCheck size={24} className="text-accent" />;
    }
};

export const FeatureGrid: React.FC<FeatureGridProps> = ({ features }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {features.map((feature, index) => (
                <div
                    key={index}
                    className="glass p-4 rounded-xl border border-white/5 hover:border-accent/10 transition-colors"
                >
                    <div className="mb-3 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        {getIcon(feature.icon)}
                    </div>
                    <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-dim leading-relaxed">{feature.description}</p>
                </div>
            ))}
        </div>
    );
};

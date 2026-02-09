import React from 'react';
import { Target, Gift, Clock, Users } from 'lucide-react';
import type { TaskOpportunityPayload } from '../../../../types';

interface Action {
    label: string;
    actionId: string;
    variant: 'primary' | 'secondary';
}

interface TaskOpportunityCardProps {
    task: TaskOpportunityPayload;
    actions: Action[];
    onAction: (actionId: string, payload?: any) => void;
}

export const TaskOpportunityCard: React.FC<TaskOpportunityCardProps> = ({ task, actions, onAction }) => {
    return (
        <div className="glass rounded-xl overflow-hidden border border-white/10 w-full max-w-md">
            {/* Header Image */}
            <div className="relative h-40 bg-gray-800">
                <img
                    src={task.imageUrl}
                    alt={task.title}
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 border border-white/10">
                    <img src={task.brand.logoUrl} alt={task.brand.name} className="w-5 h-5 rounded-full" />
                    <span className="text-xs font-medium text-white">{task.brand.name}</span>
                </div>
                <div className="absolute top-4 right-4 bg-accent text-black px-2 py-1 rounded-md text-xs font-bold shadow-lg shadow-accent/20">
                    {task.reward.tokens}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2">{task.title}</h3>
                <p className="text-dim text-sm mb-4 line-clamp-2">{task.description}</p>

                {/* Meta Grid */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                        <div className="flex items-center gap-1.5 text-xs text-dim mb-1">
                            <Gift size={12} />
                            <span>Bonus</span>
                        </div>
                        <div className="text-xs font-medium text-white type-emerald whitespace-nowrap overflow-hidden text-ellipsis">
                            {task.reward.gift}
                        </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                        <div className="flex items-center gap-1.5 text-xs text-dim mb-1">
                            <Users size={12} />
                            <span>Availability</span>
                        </div>
                        <div className="text-xs font-medium text-white">
                            {task.spotsLeft} spots left
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    {actions.map((action, idx) => (
                        <button
                            key={idx}
                            onClick={() => onAction(action.actionId, task)}
                            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${action.variant === 'primary'
                                    ? 'bg-accent text-black hover:bg-accent/90 shadow-lg shadow-accent/10'
                                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                                }`}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

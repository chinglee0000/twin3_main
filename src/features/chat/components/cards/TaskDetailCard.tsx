import React from 'react';
import { Calendar, AlertCircle } from 'lucide-react';

interface Action {
    label: string;
    actionId: string;
    variant: 'primary' | 'secondary';
}

interface TaskDetailCardProps {
    title: string;
    description: string; // Markdown supported
    imageUrl: string;
    actions: Action[];
    onAction: (actionId: string) => void;
}

export const TaskDetailCard: React.FC<TaskDetailCardProps> = ({ title, description, imageUrl, actions, onAction }) => {
    // Simple parser for basic markdown
    const parseMarkdown = (text: string) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/__(.*?)__/g, '<strong>$1</strong>')
            .replace(/\n\n/g, '<div class="h-4"></div>')
            .replace(/\n/g, '<br/>');
    };

    return (
        <div className="glass rounded-xl overflow-hidden border border-white/10 w-full max-w-2xl animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image Side */}
                <div className="relative h-48 md:h-auto bg-gray-900">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r" />
                </div>

                {/* Content Side */}
                <div className="p-6 flex flex-col h-full">
                    <h2 className="text-xl font-bold text-white mb-4">{title}</h2>

                    <div className="prose prose-invert prose-sm max-w-none flex-1 mb-6 text-dim overflow-y-auto max-h-60 custom-scrollbar">
                        <div dangerouslySetInnerHTML={{ __html: parseMarkdown(description) }} />
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-white/10">
                        {actions.map((action, idx) => (
                            <button
                                key={idx}
                                onClick={() => onAction(action.actionId)}
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
        </div>
    );
};

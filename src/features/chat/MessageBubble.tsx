import type { Message } from '../../types';
import { FeatureGrid, TaskOpportunityCard, TaskDetailCard } from './components/cards';

interface MessageBubbleProps {
    message: Message;
    onAction?: (actionId: string, payload?: any) => void;
}

// Simple markdown parser for chat messages
const parseMarkdown = (text: string): string => {
    return text
        // Bold: **text** or __text__
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/__(.*?)__/g, '<strong>$1</strong>')
        // Italic: *text* or _text_
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Line breaks
        .replace(/\n/g, '<br/>');
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onAction }) => {
    const isUser = message.role === 'user';
    const parsedContent = parseMarkdown(message.content);

    // Helpers to render cards
    const renderCard = () => {
        if (!message.cardData) return null;

        const { type } = message.cardData;
        const safeOnAction = onAction || (() => { });

        switch (type) {
            case 'feature_grid':
                return (
                    <div className="mt-4 w-full">
                        <FeatureGrid features={(message.cardData as any).features} />
                    </div>
                );
            case 'task_opportunity':
                return (
                    <div className="mt-4 w-full">
                        <TaskOpportunityCard
                            task={(message.cardData as any).taskPayload}
                            actions={(message.cardData as any).actions || []}
                            onAction={safeOnAction}
                        />
                    </div>
                );
            case 'task_detail':
                const detailData = message.cardData as any;
                return (
                    <div className="mt-4 w-full">
                        <TaskDetailCard
                            title={detailData.title}
                            description={detailData.description}
                            imageUrl={detailData.imageUrl}
                            actions={detailData.actions || []}
                            onAction={(id) => safeOnAction(id)}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    // Helper to render widget links/placeholders
    const renderWidget = () => {
        if (!message.widget) return null;

        // For inline widgets, we might want to just show a button or a small placeholder
        // Since the actual widgets are now full Views.
        // But for 'active_task' or specific small widgets, maybe we can render them?
        // For now, let's render a "View Widget" button if it's a big widget.

        return (
            <div className="mt-4 p-4 glass rounded-lg border border-white/10">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-dim">Interactive Widget Available</span>
                    <button
                        onClick={() => onAction?.(message.widget!)}
                        className="px-3 py-1.5 bg-accent/10 text-accent rounded-md text-sm font-medium hover:bg-accent/20 transition-colors"
                    >
                        Open {message.widget.replace('_', ' ')}
                    </button>
                </div>
            </div>
        );
    };

    // Hero Layout
    if (message.layout === 'hero') {
        const [title, ...rest] = message.content.split('\n\n');
        const subtitle = rest.join('\n\n');

        return (
            <div className="w-full flex flex-col items-center justify-center py-8 md:py-12 animate-fade-in px-4">
                <div className="w-full max-w-4xl flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent leading-tight">
                        {title}
                    </h1>

                    <div className="relative mb-8 p-1 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                        <p className="text-lg md:text-xl text-dim px-6 py-3 max-w-2xl bg-black/40 backdrop-blur-sm rounded-md">
                            {subtitle}
                        </p>
                    </div>

                    {/* Primary CTA - using fixed call for now as requested by design */}
                    <button
                        onClick={() => onAction?.('verify_human')}
                        className="mb-12 px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)] border-2 border-white/50"
                    >
                        Click Here to Proof I'm a Human
                    </button>

                    <div className="w-full">
                        {renderCard()}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: isUser ? 'flex-end' : 'flex-start', // Use alignItems instead of justify-content for column
            marginBottom: '24px',
            paddingLeft: isUser ? '60px' : '0',
            paddingRight: isUser ? '0' : '24px', // Reduce padding for AI
            width: '100%'
        }}>
            {/* Message Bubble */}
            <div style={{
                maxWidth: isUser ? '80%' : '100%',
                padding: isUser ? '14px 18px' : '0 16px', // No padding for AI (except horizontal)
                borderRadius: isUser ? '20px 20px 6px 20px' : '0',
                background: isUser
                    ? 'rgba(255, 255, 255, 0.12)'
                    : 'transparent',
                border: isUser ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                backdropFilter: isUser ? 'blur(10px)' : 'none',
                width: isUser ? 'auto' : '100%' // AI messages take full width for grids
            }}>
                <div
                    style={{
                        color: 'var(--color-text-primary)',
                        fontSize: isUser ? '14px' : '16px', // Slightly larger font for AI
                        lineHeight: '1.6'
                    }}
                    dangerouslySetInnerHTML={{ __html: parsedContent }}
                />

                {/* Render Cards or Widgets if AI */}
                {!isUser && (
                    <>
                        {renderCard()}
                        {renderWidget()}
                    </>
                )}
            </div>
        </div>
    );
};

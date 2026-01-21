import type { Message } from '../../types';

interface MessageBubbleProps {
    message: Message;
    onAction?: (actionId: string) => void;
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

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const isUser = message.role === 'user';
    const parsedContent = parseMarkdown(message.content);

    return (
        <div className="animate-fade-in" style={{
            display: 'flex',
            justifyContent: isUser ? 'flex-end' : 'flex-start',
            marginBottom: '16px',
            paddingLeft: isUser ? '60px' : '0',
            paddingRight: isUser ? '0' : '24px' // Reduce padding for AI
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
                backdropFilter: isUser ? 'blur(10px)' : 'none'
            }}>
                <div
                    style={{
                        color: 'var(--color-text-primary)',
                        fontSize: isUser ? '14px' : '16px', // Slightly larger font for AI
                        lineHeight: '1.6'
                    }}
                    dangerouslySetInnerHTML={{ __html: parsedContent }}
                />
            </div>
        </div>
    );
};

import { useRef, useState, useEffect } from 'react';
import { Sparkles, Coins, Clock, Users, Terminal, Target, Handshake, HelpCircle, Grid, Shield, FileText, TicketsPlane } from 'lucide-react';
import type { Message } from '../../types';
import type { Suggestion } from '../../types/a2ui';
import type { TaskOpportunityPayload } from '../../types';
import type { ContextId } from '../../types/context';
import { MessageBubble } from './MessageBubble';
import { TaskDetailModal } from '../twin-matrix/components/TaskDetailModal';
import { TwinMatrixCard } from '../twin-matrix/TwinMatrixCard';
import { INTERACTION_INVENTORY } from '../../data/inventory';
import { generateAgentResponse, isAIEnabled, generateSuggestions } from '../../services/geminiService';
import { DevConsole, devLog, ActiveTaskWidget, GlobalDashboardWidget, HumanVerification, WalletBindingWidget, AirdropClaimCard, RewardDashboard, InviteFriendsCard, CommunityPreview, AirdropTaskDashboard, FinalRewardDashboard, CommunityStatsToast, WelcomeMemberModal } from '../widgets';
import { RecaptchaWidget } from '../widgets/RecaptchaModal';
import { ImmersiveIntro } from '../../components/ImmersiveIntro';
import { useMatrixData, useUpdateMatrixData, useAppStore } from '../../store/appStore';

import { Sidebar, QuickActionsPanel, ChatHeader, ChatInput } from './components';
import { MatrixView } from './views/MatrixView';
import { TasksView } from './views/TasksView';
import { DashboardView } from './views/DashboardView';
interface ChatLayoutProps {
    contextId?: ContextId;
}

export const ChatLayout: React.FC<ChatLayoutProps> = ({ contextId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [rightSidebarOpen, setRightSidebarOpen] = useState(true); // Default open on PC
    const [selectedTask, setSelectedTask] = useState<TaskOpportunityPayload | null>(null);
    const [showDevConsole, setShowDevConsole] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [activeTab, setActiveTab] = useState<'chat' | 'dashboard' | 'matrix' | 'tasks' | 'history'>('chat');
    const [showIntro, setShowIntro] = useState(false);
    const [isCaptchaActive, setIsCaptchaActive] = useState(false);
    const [showCommunityToast, setShowCommunityToast] = useState(true); // Show on load
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);
    const [userMemberNumber, setUserMemberNumber] = useState(29571); // User's member number

    // Get matrix data from global store
    const matrixData = useMatrixData();
    const updateMatrixData = useUpdateMatrixData();

    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const hasStarted = useRef(false);

    // Quick Actions (Right Sidebar)
    const quickActions = [
        { icon: Shield, label: 'Verify Humanity', action: 'verify_human' },
        { icon: FileText, label: 'White Paper', action: 'white_paper' },
        { icon: HelpCircle, label: 'How It Works', action: 'how_it_works' },
    ];

    useEffect(() => {
        // Only scroll if we have more than just welcome message to avoid auto-scroll on landing
        // This ensures the user stays at the top/welcome message when first opening the app
        if (scrollRef.current && messages.length > 1) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping, suggestions]);

    useEffect(() => {
        // Auto-open sidebar on desktop
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const findNode = (text: string) => {
        const lowerText = text.toLowerCase();
        const match = INTERACTION_INVENTORY.find(node =>
            node.triggers.some(trigger => lowerText.includes(trigger.toLowerCase()))
        );
        return match || null; // Return null if no match, so we can use AI
    };

    const triggerResponse = async (input: string | null, nodeId: string | null = null, showUserMessage = true) => {
        // Verification gate: intercept browse_tasks if not verified
        // Check both nodeId (direct call) and input (from suggestion click)
        const targetId = nodeId || input;
        if ((targetId === 'browse_tasks' || input === 'browse_tasks') && !isVerified) {
            // Override to verification flow
            nodeId = 'verification_required';
            input = null; // Don't show user message for redirect
            showUserMessage = false;
            devLog('info', 'User not verified - redirecting to verification flow');
        }

        if (input && showUserMessage) {
            const userMsg: Message = {
                id: Date.now().toString(),
                role: 'user',
                type: 'text',
                content: input,
                timestamp: Date.now(),
            };
            setMessages(prev => [...prev, userMsg]);
        }

        setIsTyping(true);
        setSuggestions([]);

        let node;
        if (nodeId) {
            node = INTERACTION_INVENTORY.find(n => n.id === nodeId)!;
        } else if (input) {
            node = findNode(input);
        }

        // If we found a matching node, use it
        if (node) {
            const delay = node.response.delay || 500;
            await new Promise(r => setTimeout(r, delay));

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                type: node.response.card ? 'card' : 'text',
                content: node.response.text,
                cardData: node.response.card,
                timestamp: Date.now(),
            };

            setMessages(prev => [...prev, aiMsg]);
            setSuggestions(node.suggestedActions || []);

            // Handle widget rendering - add as inline chat message
            if (node.response.widget) {
                const widgetMsg: Message = {
                    id: (Date.now() + 2).toString(),
                    role: 'assistant',
                    type: 'widget',
                    content: '',
                    widget: node.response.widget,
                    timestamp: Date.now(),
                };
                setMessages(prev => [...prev, widgetMsg]);
                devLog('info', `Rendering inline widget: ${node.response.widget}`);
            }
            devLog('success', `Matched node: ${node.id}`);
        } else if (input && isAIEnabled()) {
            // Use Gemini AI for unmatched queries
            devLog('api', 'Calling Gemini AI...');
            const history = messages.map(m => ({
                role: m.role as 'user' | 'assistant',
                content: m.content
            }));

            const response = await generateAgentResponse(input, history);
            devLog('success', `AI Response: ${response.text.substring(0, 50)}...`);

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                type: 'text',
                content: response.text,
                timestamp: Date.now(),
            };

            setMessages(prev => [...prev, aiMsg]);

            // Generate AI-powered suggestions based on context
            const aiSuggestions = await generateSuggestions(
                response.text,
                `User asked: ${input}`
            );
            setSuggestions(aiSuggestions.map(label => ({
                label,
                payload: label.toLowerCase().replace(/\s+/g, '_')
            })));
        } else {
            // Fallback when no AI available
            devLog('info', `No match found, using fallback. AI enabled: ${isAIEnabled()}`);
            const fallbackNode = INTERACTION_INVENTORY.find(n => n.id === 'fallback')!;
            await new Promise(r => setTimeout(r, 300));

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                type: 'text',
                content: fallbackNode.response.text,
                timestamp: Date.now(),
            };

            setMessages(prev => [...prev, aiMsg]);
            setSuggestions(fallbackNode.suggestedActions || []);
        }

        setIsTyping(false);

        // Close sidebar on mobile/tablet after action
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    };

    const handleAction = (actionId: string) => {
        triggerResponse(null, actionId, false);
    };

    const handleSubmit = () => {
        if (!inputValue.trim() || isTyping) return;
        triggerResponse(inputValue.trim());
        setInputValue('');
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleTaskCardClick = (task: TaskOpportunityPayload) => {
        setSelectedTask(task);
    };

    const handleAcceptTask = () => {
        if (!isVerified) {
            // Store pending task and redirect to verification
            if (selectedTask) {
                // setPendingTaskId(selectedTask.title); // Removed legacy logic
            }
            setSelectedTask(null);
            triggerResponse(null, 'verification_required', false);
            return;
        }
        // User is verified, proceed with task acceptance
        setSelectedTask(null);
        triggerResponse(null, 'accept_task', false);
    };

    const handleNewChat = () => {
        setMessages([]);
        setSuggestions([]);
        setActiveTab('chat');
        triggerResponse(null, 'welcome', false);
        if (window.innerWidth < 1024) setSidebarOpen(false);
    };

    useEffect(() => {
        if (!hasStarted.current) {
            hasStarted.current = true;
            triggerResponse(null, 'welcome', false);
        }
    }, []);

    // Task card data for browse_tasks
    const taskCardsData = [
        {
            brand: { name: "L'Oréal Paris", logoUrl: 'https://placehold.co/40x40/FF0000/FFF?text=L' },
            title: 'Lipstick Filter Challenge',
            description: 'Create 15-60s Reels using specific filter showcasing #666 shade. Mention moisturizing and color payoff.',
            imageUrl: 'https://placehold.co/600x300/e6a6be/FFF?text=Lipstick+Campaign',
            reward: { tokens: '500 $twin3', gift: 'Full PR Package (Worth $3000)' },
            status: 'open' as const,
            spotsLeft: 3,
            deadline: '2025-01-15',
            acceptedCount: 0,
            totalSpots: 3
        },
        {
            brand: { name: 'Starbucks', logoUrl: 'https://placehold.co/40x40/00704A/FFF?text=S' },
            title: 'Coffee Shop Vlog',
            description: 'Capture store atmosphere and drink close-ups, share coffee tasting experience',
            imageUrl: 'https://placehold.co/600x300/00704A/FFF?text=Coffee+Vlog',
            reward: { tokens: '300 $twin3', gift: 'Coffee Voucher $500' },
            status: 'open' as const,
            spotsLeft: 3,
            deadline: '2025-01-20',
            acceptedCount: 2,
            totalSpots: 5
        },
        {
            brand: { name: 'Dior', logoUrl: 'https://placehold.co/40x40/000000/FFF?text=D' },
            title: 'Beauty Unboxing Review',
            description: 'Try new products and create unboxing video, share usage experience',
            imageUrl: 'https://placehold.co/600x300/000000/FFF?text=Beauty+Review',
            reward: { tokens: '800 $twin3', gift: 'Makeup Gift Box (Worth $5000)' },
            status: 'open' as const,
            spotsLeft: 1,
            deadline: '2025-01-10',
            acceptedCount: 1,
            totalSpots: 2
        }
    ];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100dvh',
            width: '100vw',
            position: 'relative',
            zIndex: 2,
            overflow: 'hidden',
        }}>
            {/* Community Stats Banner - Top of everything */}
            {showCommunityToast && (
                <CommunityStatsToast
                    memberCount={29571}
                    onClose={() => setShowCommunityToast(false)}
                />
            )}

            {/* Main Content Wrapper */}
            <div style={{
                display: 'flex',
                flex: 1,
                minHeight: 0,
                position: 'relative',
            }}>
                {/* Backdrop overlay for mobile/tablet */}
                {sidebarOpen && window.innerWidth < 1024 && (
                    <div
                        onClick={() => setSidebarOpen(false)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 998
                        }}
                    />
                )}

                {/* Left Sidebar */}
                <Sidebar
                    isOpen={sidebarOpen}
                    onToggle={() => setSidebarOpen(!sidebarOpen)}
                    onNavigate={(section) => {
                        setActiveTab(section as any);
                        if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    activeSection={{
                        chat: activeTab === 'chat',
                        matrix: activeTab === 'matrix',
                        tasks: activeTab === 'tasks',
                        dashboard: activeTab === 'dashboard'
                    }}
                    onReplayIntro={() => {
                        setShowIntro(true);
                    }}
                    quickActions={quickActions}
                    onQuickAction={handleAction}
                    hasBanner={showCommunityToast}
                />

                {/* Main Area */}
                <main style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                    position: 'relative',
                }}>
                    {/* Header */}
                    <ChatHeader
                        sidebarOpen={sidebarOpen}
                        rightSidebarOpen={rightSidebarOpen}
                        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                        onToggleRightSidebar={() => setRightSidebarOpen(!rightSidebarOpen)}
                        isWalletConnected={isVerified}
                        tokenBalance={0}
                    />

                    {/* Content Area */}
                    <div style={{
                        flex: 1,
                        overflow: 'auto',
                        padding: '16px'
                    }} className="scrollbar-hide">
                        {activeTab === 'chat' && (
                            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                            {messages.map((msg) => {
                                // Special handling for feature_grid - Hero + Feature Cards
                                if (msg.type === 'card' && msg.cardData?.type === 'feature_grid') {
                                    const features = msg.cardData.features || [];
                                    return (
                                        <div key={msg.id} className="animate-fade-in" style={{ marginBottom: '32px' }}>
                                            {/* Hero Welcome Message */}
                                            <div style={{
                                                textAlign: 'center',
                                                padding: '48px 24px',
                                                marginBottom: '32px'
                                            }}>
                                                <h1 style={{
                                                    fontSize: 'clamp(32px, 5vw, 40px)',
                                                    fontWeight: 500,
                                                    color: 'var(--color-text-primary)',
                                                    marginBottom: '16px',
                                                    lineHeight: '1.1',
                                                    letterSpacing: '-0.02em',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '12px',
                                                    flexWrap: 'wrap'
                                                }}>
                                                    {(msg.content.includes("Verification Complete") || msg.content.includes("Verified Human")) && (
                                                        <Sparkles
                                                            size={32}
                                                            style={{ 
                                                                color: 'var(--color-primary, #FFD700)', 
                                                                flexShrink: 0,
                                                                filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.5))'
                                                            }}
                                                        />
                                                    )}
                                                    <span style={{ flex: '0 1 auto' }}>
                                                        {msg.content.split('\n')[0].replace(/\*\*/g, '')}
                                                    </span>
                                                </h1>
                                                <p style={{
                                                    fontSize: '16px',
                                                    color: 'var(--gray-400)',
                                                    lineHeight: '1.6',
                                                    maxWidth: '700px',
                                                    margin: '0 auto 8px',
                                                    fontWeight: 400
                                                }}>
                                                    {msg.content.split('\n')[2]}
                                                </p>
                                                <p style={{
                                                    fontSize: '15px',
                                                    color: 'var(--color-text-secondary)',
                                                    lineHeight: '1.6',
                                                    maxWidth: '700px',
                                                    margin: '0 auto 8px'
                                                }}>
                                                    {msg.content.split('\n')[3]}
                                                </p>
                                                <p style={{
                                                    fontSize: '14px',
                                                    color: 'var(--color-text-secondary)',
                                                    lineHeight: '1.6',
                                                    maxWidth: '700px',
                                                    margin: '0 auto 24px'
                                                }}>
                                                    {msg.content.split('\n')[5]}
                                                </p>
                                                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => triggerResponse(null, 'verify_human', false)}
                                                        style={{
                                                            padding: '14px 32px',
                                                            fontSize: '16px',
                                                            fontWeight: 500,
                                                            boxShadow: 'var(--glow-primary)'
                                                        }}
                                                    >
                                                        Prove Humanity to Claim
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Feature Cards Grid */}
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                                                gap: '16px'
                                            }}>
                                                {features.map((feature: any, i: number) => {
                                                    // Map icon names to lucide icons
                                                    const IconComponent = feature.icon === 'verification' ? TicketsPlane
                                                        : feature.icon === 'matrix' ? Grid
                                                            : feature.icon === 'agent' ? Sparkles
                                                                : feature.icon === 'target' ? Target
                                                                    : feature.icon === 'handshake' ? Handshake
                                                                        : feature.icon === 'stars' ? Sparkles
                                                                            : null;

                                                    return (
                                                        <div
                                                            key={i}
                                                            className="card card-hover"
                                                            style={{
                                                                padding: '24px',
                                                                cursor: feature.link ? 'pointer' : 'default'
                                                            }}
                                                            onClick={() => {
                                                                if (feature.link) {
                                                                    window.open(feature.link, '_blank');
                                                                }
                                                            }}
                                                        >
                                                            {IconComponent && (
                                                                <div style={{
                                                                    marginBottom: '12px',
                                                                    color: 'var(--color-primary)',
                                                                    opacity: 0.9
                                                                }}>
                                                                    <IconComponent size={24} />
                                                                </div>
                                                            )}
                                                            <h3 style={{
                                                                fontSize: '18px',
                                                                fontWeight: 500,
                                                                color: 'var(--color-text-primary)',
                                                                marginBottom: '8px',
                                                                letterSpacing: '-0.01em'
                                                            }}>
                                                                {feature.title}
                                                            </h3>
                                                            <p style={{
                                                                fontSize: '14px',
                                                                color: 'var(--color-text-secondary)',
                                                                lineHeight: '1.7'
                                                            }}>
                                                                {feature.description}
                                                            </p>
                                                            {feature.link && (
                                                                <div style={{
                                                                    marginTop: '12px',
                                                                    fontSize: '13px',
                                                                    color: 'var(--color-primary)',
                                                                    fontWeight: 500
                                                                }}>
                                                                    Learn more →
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                }

                                // Special handling for browse_tasks - show as 3 clickable task cards
                                if (msg.type === 'card' && msg.cardData?.type === 'task_opportunity') {
                                    return (
                                        <div key={msg.id} className="animate-fade-in" style={{ marginBottom: '24px' }}>
                                            {/* AI Message */}
                                            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                                                <div style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius: 'var(--radius-md)',
                                                    background: 'var(--color-accent)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0,
                                                    boxShadow: 'var(--glow-primary)'
                                                }}>
                                                    <Sparkles size={16} color="white" />
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-primary)', marginBottom: '6px' }}>
                                                        twin3
                                                    </div>
                                                    <MessageBubble
                                                        message={{ ...msg, content: msg.content }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Task Cards Grid - Responsive */}
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                                                gap: '16px',
                                                marginLeft: window.innerWidth >= 768 ? '44px' : '0'
                                            }}>
                                                {taskCardsData.map((task, i) => (
                                                    <div
                                                        key={i}
                                                        className="card card-hover"
                                                        style={{
                                                            padding: '24px',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: '16px'
                                                        }}
                                                    >
                                                        <div>
                                                            <h4 style={{
                                                                fontSize: '16px',
                                                                fontWeight: 600,
                                                                color: 'var(--color-text-primary)',
                                                                marginBottom: '6px'
                                                            }}>
                                                                {task.title}
                                                            </h4>
                                                            <p style={{
                                                                fontSize: '13px',
                                                                color: 'var(--color-text-secondary)',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '6px'
                                                            }}>
                                                                <span style={{
                                                                    width: '6px',
                                                                    height: '6px',
                                                                    borderRadius: '50%',
                                                                    background: 'var(--color-primary)'
                                                                }} />
                                                                {task.brand.name}
                                                            </p>
                                                        </div>
                                                        <p style={{
                                                            fontSize: '13px',
                                                            color: 'var(--color-text-secondary)',
                                                            marginBottom: '8px',
                                                            lineHeight: '1.5'
                                                        }}>
                                                            {task.description}
                                                        </p>

                                                        {/* Deadline and Count Info */}
                                                        <div style={{
                                                            display: 'flex',
                                                            gap: '12px',
                                                            marginBottom: '12px',
                                                            fontSize: '12px',
                                                            color: 'var(--color-text-dim)'
                                                        }}>
                                                            {task.deadline && (
                                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                    <Clock size={14} />
                                                                    Due {task.deadline}
                                                                </span>
                                                            )}
                                                            {task.totalSpots && (
                                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                    <Users size={14} />
                                                                    {task.acceptedCount || 0}/{task.totalSpots}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            paddingTop: '12px',
                                                            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                                                            gap: '8px',
                                                            flexWrap: 'wrap'
                                                        }}>
                                                            <span style={{
                                                                fontSize: '13px',
                                                                color: 'var(--color-primary)',
                                                                fontWeight: 500,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '4px'
                                                            }}>
                                                                <Coins size={16} />
                                                                {task.reward.tokens}
                                                            </span>
                                                            <button
                                                                onClick={() => handleTaskCardClick(task)}
                                                                className="btn btn-primary"
                                                                style={{ padding: '6px 14px', fontSize: '13px' }}
                                                            >
                                                                View Details
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }

                                // Widget messages - render inline
                                if (msg.type === 'widget') {
                                    if (msg.widget === 'twin_matrix') {
                                        // Matrix data is now managed globally in appStore
                                        return (
                                            <div key={msg.id} className="animate-fade-in" style={{
                                                marginBottom: '24px',
                                                display: 'flex',
                                                justifyContent: 'flex-start'
                                            }}>
                                                <TwinMatrixCard
                                                    onExplore={() => {
                                                        devLog('success', 'Boost Your Score clicked');
                                                        triggerResponse(null, 'airdrop_tasks', false);
                                                    }}
                                                />
                                            </div>
                                        );
                                    }

                                    if (msg.widget === 'active_task') {
                                        return (
                                            <div key={msg.id} className="animate-fade-in" style={{
                                                marginBottom: '24px',
                                                display: 'flex',
                                                justifyContent: 'flex-start'
                                            }}>
                                                <ActiveTaskWidget
                                                    onVerify={(url) => {
                                                        devLog('success', `Task submitted: ${url}`);
                                                    }}
                                                />
                                            </div>
                                        );
                                    }
                                    if (msg.widget === 'global_dashboard') {
                                        return (
                                            <div key={msg.id} className="animate-fade-in" style={{
                                                marginBottom: '24px',
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                width: '100%',
                                                maxWidth: '400px'
                                            }}>
                                                <GlobalDashboardWidget
                                                    onViewTask={(taskId) => {
                                                        devLog('info', `Viewing task: ${taskId}`);
                                                        // Allow clicking dashboard item to open Active Task
                                                        triggerResponse(null, 'accept_task', false); // Demo hack to show task
                                                    }}
                                                />
                                            </div>
                                        );
                                    }

                                    if (msg.widget === 'wallet_binding') {
                                        return (
                                            <div key={msg.id} className="animate-fade-in" style={{
                                                marginBottom: '24px',
                                                display: 'flex',
                                                justifyContent: 'flex-start'
                                            }}>
                                                <WalletBindingWidget
                                                    onBindingComplete={(addr, type) => {
                                                        devLog('success', `Binding Complete: ${type} — ${addr}`);
                                                        triggerResponse(null, 'binding_success', false);
                                                    }}
                                                />
                                            </div>
                                        );
                                    }

                                    if (msg.widget === 'recaptcha') {
                                        return (
                                            <div key={msg.id} className="animate-fade-in" style={{
                                                marginBottom: '24px',
                                                display: 'flex',
                                                justifyContent: 'flex-start'
                                            }}>
                                                <RecaptchaWidget
                                                    onStart={() => {
                                                        setIsCaptchaActive(true);
                                                        devLog('info', 'reCAPTCHA started - locking input');
                                                    }}
                                                    onVerified={(token) => {
                                                        devLog('success', `reCAPTCHA verified. Token: ${token.substring(0, 20)}...`);
                                                        setIsVerified(true);
                                                        setIsCaptchaActive(false);
                                                        
                                                        console.log('🔄 Starting matrix update...');
                                                        console.log('📊 Current matrix data:', {
                                                            discoveredTraits: matrixData.discoveredTraits,
                                                            trait00: matrixData.traits.find(t => t.id === '00')
                                                        });
                                                        
                                                        // Update matrix data to unlock Humanity Index trait
                                                        const newHumanityIndex = 38; // 0.5 verification × 76.5 (30% of 255)
                                                        const physicalPercentage = Math.round((newHumanityIndex / (64 * 255)) * 100);
                                                        
                                                        const updatedMatrixData = {
                                                            ...matrixData,
                                                            humanityIndex: newHumanityIndex,
                                                            discoveredTraits: 1,
                                                            avgStrength: 15,
                                                            journeyProgress: 0.5,
                                                            dimensions: {
                                                                ...matrixData.dimensions,
                                                                physical: {
                                                                    ...matrixData.dimensions.physical,
                                                                    percentage: physicalPercentage,
                                                                    discovered: 1
                                                                }
                                                            },
                                                            traits: matrixData.traits.map(trait =>
                                                                trait.id === '00' ? {
                                                                    ...trait,
                                                                    name: 'Humanity Index',
                                                                    description: 'Measures the authenticity and trustworthiness of user identity, indicating whether the user is a real human rather than a bot or fake identity.',
                                                                    unlockedBy: 'Google reCAPTCHA v3',
                                                                    strength: newHumanityIndex,
                                                                    discovered: true,
                                                                    unlockedAt: new Date().toISOString()
                                                                } : trait
                                                            ),
                                                            recentlyUnlockedTrait: '00'
                                                        };
                                                        
                                                        console.log('✅ Updated matrix data:', {
                                                            discoveredTraits: updatedMatrixData.discoveredTraits,
                                                            trait00: updatedMatrixData.traits.find(t => t.id === '00'),
                                                            recentlyUnlockedTrait: updatedMatrixData.recentlyUnlockedTrait
                                                        });
                                                        
                                                        // Update global store using the hook
                                                        updateMatrixData(updatedMatrixData);
                                                        
                                                        console.log('💾 Store update called');
                                                        
                                                        // Trigger verification success message
                                                        triggerResponse(null, 'verification_success', false);
                                                        
                                                        // Remove wallet_binding, recaptcha widgets and their associated text messages
                                                        setTimeout(() => {
                                                            setMessages(prev => prev.filter(m => {
                                                                // Remove widgets
                                                                if (m.widget === 'wallet_binding' || m.widget === 'recaptcha') {
                                                                    return false;
                                                                }
                                                                // Remove associated text messages
                                                                if (m.type === 'text' && m.role === 'assistant') {
                                                                    const content = m.content.toLowerCase();
                                                                    if (content.includes('connect your identity') || 
                                                                        content.includes('verify humanity') ||
                                                                        content.includes('binding successful') ||
                                                                        content.includes('wallet connected') ||
                                                                        content.includes('proceeding to verification')) {
                                                                        return false;
                                                                    }
                                                                }
                                                                return true;
                                                            }));
                                                        }, 500);
                                                    }}
                                                />
                                            </div>
                                        );
                                    }

                                    if (msg.widget === 'human_verification') {
                                        return (
                                            <div key={msg.id} className="animate-fade-in" style={{
                                                marginBottom: '24px',
                                                display: 'flex',
                                                justifyContent: 'flex-start'
                                            }}>
                                                <HumanVerification
                                                    onComplete={(score) => {
                                                        devLog('success', `Verification Complete. Score: ${score}`);
                                                        setIsVerified(true);
                                                        
                                                        // Show welcome modal after a short delay
                                                        setTimeout(() => {
                                                            setShowWelcomeModal(true);
                                                        }, 1500);
                                                        
                                                        // Trigger verification success message
                                                        triggerResponse(null, 'verification_success', false);
                                                        
                                                        // Remove wallet_binding, human_verification widgets and their associated text messages
                                                        setTimeout(() => {
                                                            setMessages(prev => prev.filter(m => {
                                                                // Remove widgets
                                                                if (m.widget === 'wallet_binding' || m.widget === 'human_verification') {
                                                                    return false;
                                                                }
                                                                // Remove associated text messages
                                                                if (m.type === 'text' && m.role === 'assistant') {
                                                                    const content = m.content.toLowerCase();
                                                                    if (content.includes('connect your identity') || 
                                                                        content.includes('verify humanity') ||
                                                                        content.includes('binding successful') ||
                                                                        content.includes('wallet connected') ||
                                                                        content.includes('proceeding to verification')) {
                                                                        return false;
                                                                    }
                                                                }
                                                                return true;
                                                            }));
                                                        }, 500);
                                                    }}
                                                    onClose={() => {
                                                    }}
                                                />
                                            </div>
                                        );
                                    }

                                    if (msg.widget === 'airdrop_claim') {
                                        return (
                                            <div key={msg.id} className="animate-fade-in" style={{
                                                marginBottom: '24px',
                                                display: 'flex',
                                                justifyContent: 'flex-start'
                                            }}>
                                                <AirdropClaimCard
                                                    score={51}
                                                    threshold={100}
                                                    onClaim={() => {
                                                        devLog('success', 'Airdrop claimed!');
                                                        triggerResponse(null, 'show_rewards', false);
                                                    }}
                                                    onGoBack={() => {
                                                        triggerResponse(null, 'verify_human', false);
                                                    }}
                                                />
                                            </div>
                                        );
                                    }

                                    if (msg.widget === 'reward_dashboard') {
                                        return (
                                            <div key={msg.id} className="animate-fade-in" style={{
                                                marginBottom: '24px',
                                                display: 'flex',
                                                justifyContent: 'flex-start'
                                            }}>
                                                <RewardDashboard
                                                    balance={500}
                                                    onInvite={() => {
                                                        triggerResponse(null, 'invite_friends', false);
                                                    }}
                                                    onCommunity={() => {
                                                        triggerResponse(null, 'community_preview', false);
                                                    }}
                                                />
                                            </div>
                                        );
                                    }

                                    if (msg.widget === 'invite_friends') {
                                        return (
                                            <div key={msg.id} className="animate-fade-in" style={{
                                                marginBottom: '24px',
                                                display: 'flex',
                                                justifyContent: 'flex-start'
                                            }}>
                                                <InviteFriendsCard />
                                            </div>
                                        );
                                    }

                                    if (msg.widget === 'community_preview') {
                                        return (
                                            <div key={msg.id} className="animate-fade-in" style={{
                                                marginBottom: '24px',
                                                display: 'flex',
                                                justifyContent: 'flex-start'
                                            }}>
                                                <CommunityPreview
                                                    onJoinCommunity={() => {
                                                        devLog('info', 'Join Community clicked');
                                                    }}
                                                    onClose={() => {
                                                        triggerResponse(null, 'show_rewards', false);
                                                    }}
                                                />
                                            </div>
                                        );
                                    }

                                    if (msg.widget === 'airdrop_task_dashboard') {
                                        return (
                                            <div key={msg.id} className="animate-fade-in" style={{
                                                marginBottom: '24px',
                                                display: 'flex',
                                                justifyContent: 'flex-start'
                                            }}>
                                                <AirdropTaskDashboard
                                                    matrixScore={matrixData.humanityIndex}
                                                    onAllTasksComplete={(totalScore, totalReward) => {
                                                        devLog('success', `All tasks complete! Score: ${totalScore}, Reward: ${totalReward}`);
                                                        // Store the reward amount for the final dashboard
                                                        sessionStorage.setItem('finalReward', totalReward.toString());
                                                        sessionStorage.setItem('finalScore', totalScore.toString());
                                                        triggerResponse(null, 'final_reward', false);
                                                    }}
                                                />
                                            </div>
                                        );
                                    }

                                    if (msg.widget === 'final_reward_dashboard') {
                                        const finalReward = parseInt(sessionStorage.getItem('finalReward') || '0');
                                        const finalScore = parseInt(sessionStorage.getItem('finalScore') || '0');
                                        return (
                                            <div key={msg.id} className="animate-fade-in" style={{
                                                marginBottom: '24px',
                                                display: 'flex',
                                                justifyContent: 'flex-start'
                                            }}>
                                                <FinalRewardDashboard
                                                    matrixScore={finalScore}
                                                    tokenAmount={finalReward}
                                                    onInviteFriends={() => {
                                                        triggerResponse(null, 'invite_friends', false);
                                                    }}
                                                    onJoinCommunity={() => {
                                                        triggerResponse(null, 'community_preview', false);
                                                    }}
                                                />
                                            </div>
                                        );
                                    }

                                    return null;
                                }

                                // Regular messages
                                return <MessageBubble key={msg.id} message={msg} onAction={handleAction} />;
                            })}

                            {isTyping && (
                                <div className="animate-fade-in" style={{
                                    display: 'flex',
                                    gap: '12px',
                                    marginTop: '24px'
                                }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: 'var(--radius-md)',
                                        background: 'var(--color-accent)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        boxShadow: 'var(--glow-primary)'
                                    }}>
                                        <Sparkles size={16} color="white" />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingTop: '8px' }}>
                                        {[0, 150, 300].map((delay, i) => (
                                            <span key={i} className="animate-bounce" style={{
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                background: 'var(--color-text-dim)',
                                                animationDelay: `${delay}ms`,
                                                display: 'inline-block'
                                            }} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div ref={scrollRef} />
                        </div>
                    )}

                    {activeTab === 'matrix' && <MatrixView />}
                    {activeTab === 'tasks' && <TasksView onTaskClick={handleTaskCardClick} />}
                    {activeTab === 'dashboard' && <DashboardView />}
                </div>


                {/* Input Area - Only show on Chat tab */}
                {activeTab === 'chat' && (
                    <ChatInput
                        inputValue={inputValue}
                        isTyping={isTyping}
                        suggestions={suggestions}
                        inputRef={inputRef}
                        onInputChange={setInputValue}
                        onSubmit={handleSubmit}
                        onKeyDown={handleKeyDown}
                        onSuggestionClick={(payload) => triggerResponse(null, payload, false)}
                        disabled={isCaptchaActive}
                    />
                )}
            </main>

            {/* Right Sidebar - Quick Actions */}
            <QuickActionsPanel
                isOpen={rightSidebarOpen}
                onActionClick={(action) => triggerResponse(null, action, false)}
            />
            </div>
            {/* End Main Content Wrapper */}

            {selectedTask && (
                <TaskDetailModal
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                    onAccept={handleAcceptTask}
                />
            )}

            {/* Widgets are now rendered inline in chat, not as popups */}

            {/* Dev Console Toggle */}
            <button
                onClick={() => setShowDevConsole(!showDevConsole)}
                style={{
                    position: 'fixed',
                    bottom: '16px',
                    left: '16px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: showDevConsole ? 'rgba(48, 209, 88, 0.2)' : 'var(--glass-bg)',
                    border: showDevConsole ? '1px solid rgba(48, 209, 88, 0.3)' : '1px solid var(--glass-border)',
                    color: showDevConsole ? '#30d158' : 'var(--color-text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 100
                }}
            >
                <Terminal size={18} />
            </button>

            {/* Dev Console */}
            <DevConsole
                isOpen={showDevConsole}
                onClose={() => setShowDevConsole(false)}
            />

            {/* Immersive Intro */}
            {showIntro && (
                <ImmersiveIntro
                    onComplete={() => setShowIntro(false)}
                />
            )}

            {/* Welcome Member Modal */}
            {showWelcomeModal && (
                <WelcomeMemberModal
                    memberNumber={userMemberNumber}
                    onClose={() => setShowWelcomeModal(false)}
                />
            )}

            {/* reCAPTCHA widget is now rendered inline in chat flow */}
        </div>
    );
};

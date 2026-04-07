'use client';

import { ChatMessage } from '@/types';

interface MessageBubbleProps {
    message: ChatMessage;
    isOwn: boolean;
}

export default function MessageBubble({ message, isOwn }: MessageBubbleProps) {
    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (message.type === 'SYSTEM') {
        return (
            <div className="flex justify-center my-2">
                <span className="text-xs text-surface-400 dark:text-surface-500 bg-surface-100 dark:bg-surface-800 px-3 py-1 rounded-full">
                    {message.content}
                </span>
            </div>
        );
    }

    return (
        <div className={`flex gap-2.5 ${isOwn ? 'flex-row-reverse' : 'flex-row'} animate-slide-up`}>
            {/* Avatar */}
            {!isOwn && (
                <div className="flex-shrink-0">
                    {message.sender.avatarUrl ? (
                        <img
                            src={message.sender.avatarUrl}
                            alt={message.sender.fullName}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-xs font-bold">
                            {message.sender.fullName.charAt(0)}
                        </div>
                    )}
                </div>
            )}

            {/* Message */}
            <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'}`}>
                {!isOwn && (
                    <p className="text-xs font-medium text-surface-500 dark:text-surface-400 mb-1 ml-1">
                        {message.sender.fullName}
                    </p>
                )}
                <div
                    className={`px-4 py-2.5 rounded-2xl ${isOwn
                            ? 'bg-primary-600 text-white rounded-br-md'
                            : 'bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 border border-surface-200 dark:border-surface-700 rounded-bl-md'
                        }`}
                >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                <p
                    className={`text-[10px] text-surface-400 mt-1 ${isOwn ? 'text-right mr-1' : 'ml-1'}`}
                >
                    {formatTime(message.timestamp)}
                </p>
            </div>
        </div>
    );
}

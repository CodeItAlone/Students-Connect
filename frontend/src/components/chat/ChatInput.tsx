'use client';

import { useState } from 'react';
import { Send, Smile, Paperclip } from 'lucide-react';

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSend(message.trim());
            setMessage('');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 p-3 bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700"
        >
            <button
                type="button"
                className="p-2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
            >
                <Paperclip className="w-5 h-5" />
            </button>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                disabled={disabled}
                className="flex-1 px-4 py-2.5 bg-surface-50 dark:bg-surface-900 rounded-xl text-sm text-surface-900 dark:text-surface-100 placeholder-surface-400 dark:placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 border border-surface-200 dark:border-surface-700 transition-all"
            />
            <button
                type="button"
                className="p-2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
            >
                <Smile className="w-5 h-5" />
            </button>
            <button
                type="submit"
                disabled={!message.trim() || disabled}
                className="p-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md"
            >
                <Send className="w-4 h-4" />
            </button>
        </form>
    );
}

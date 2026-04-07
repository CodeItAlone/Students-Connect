interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'neutral';
    size?: 'sm' | 'md';
    dot?: boolean;
}

export default function Badge({ children, variant = 'primary', size = 'md', dot }: BadgeProps) {
    const variants = {
        primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
        accent: 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300',
        success: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
        warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
        danger: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
        neutral: 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-xs',
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 font-semibold rounded-full ${variants[variant]} ${sizes[size]}`}
        >
            {dot && (
                <span
                    className={`w-1.5 h-1.5 rounded-full ${variant === 'success'
                            ? 'bg-emerald-500'
                            : variant === 'warning'
                                ? 'bg-amber-500'
                                : variant === 'danger'
                                    ? 'bg-red-500'
                                    : 'bg-primary-500'
                        }`}
                />
            )}
            {children}
        </span>
    );
}

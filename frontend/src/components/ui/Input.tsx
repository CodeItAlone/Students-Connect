'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        return (
            <div className="space-y-1.5">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-surface-700 dark:text-surface-300"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        className={`
              w-full px-4 py-3 bg-white dark:bg-surface-800 
              border rounded-xl text-surface-900 dark:text-surface-100 
              placeholder-surface-400 dark:placeholder-surface-500 
              focus:outline-none focus:ring-2 focus:border-transparent
              transition-all duration-200
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              ${error
                                ? 'border-red-400 dark:border-red-500 focus:ring-red-500/50'
                                : 'border-surface-200 dark:border-surface-700 focus:ring-primary-500/50 focus:border-primary-500'
                            }
              ${className}
            `}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
                {helperText && !error && (
                    <p className="text-sm text-surface-500 dark:text-surface-400">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
export default Input;

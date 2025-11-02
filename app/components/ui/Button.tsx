import React from 'react';

interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'tertiary';
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    children,
    onClick,
    disabled = false,
    className = '',
}) => {
    const baseStyles = 'px-6 py-3 font-medium text-sm uppercase tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantStyles = {
        primary: 'bg-[#D87D4A] text-white hover:bg-[#FBAF85] active:bg-[#D87D4A]',
        secondary: 'bg-transparent text-[#000000] border-2 border-[#000000] hover:bg-[#000000] hover:text-white active:bg-[#000000]',
        tertiary: 'bg-transparent text-[#D87D4A] hover:text-[#FBAF85] active:text-[#D87D4A] flex items-center gap-2',
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
            {children}
            {variant === 'tertiary' && (
                <span className="inline-block transition-transform group-hover:translate-x-1">›</span>
            )}
        </button>
    );
};

export default Button;
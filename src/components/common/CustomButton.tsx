import { FiLoader } from 'react-icons/fi';
import React from 'react';

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  variant = 'primary',
  className = '',
}) => {
  const baseStyle =
    'w-full font-semibold py-2 rounded inline-flex items-center justify-center';

  const variantStyle =
    variant === 'primary'
      ? 'bg-purple-600 text-white disabled:bg-gray-500'
      : 'bg-gray-600 text-white';

  const disabledStyle =
    disabled || loading ? 'cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyle} ${variantStyle} ${disabledStyle} ${className}`}
    >
      {loading && <FiLoader className="animate-spin h-4 w-4 mr-2" />}
      <span>{children}</span>
    </button>
  );
};

export default CustomButton;

import React from 'react';
import { MdErrorOutline } from 'react-icons/md';

interface ErrorMessageSectionProps {
  error?: string | React.ReactNode;
  height?: string; // contoh: 'min-h-[230px]'
}

const ErrorMessageSection: React.FC<ErrorMessageSectionProps> = ({
  error,
  height = 'min-h-[230px]',
}) => {
  return (
    <div
      className={`flex flex-col glass-card items-center justify-center text-red-400 text-sm px-4 py-2 text-center ${height}`}
    >
      <MdErrorOutline className="text-3xl mb-2" />
      {typeof error === 'string'
        ? error
        : error || 'Failed to load content. Please try again later.'}
    </div>
  );
};

export default ErrorMessageSection;

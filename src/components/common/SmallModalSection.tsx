import React from 'react';
import { FiX, FiLoader } from 'react-icons/fi';

type SmallModalProps = {
  title: string;
  desc: string;
  buttonLabel: string;
  loading: boolean;
  handleButton: () => void;
  cancelButton: () => void;
};

const SmallModalSection: React.FC<SmallModalProps> = ({
  title,
  desc,
  buttonLabel,
  loading,
  handleButton,
  cancelButton,
}) => {
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50 ">
      <div className="bg-gradient-to-br from-indigo-900 to-purple-800 animate-[slide-down_0.3s] rounded-xl shadow-2xl overflow-hidden w-full max-w-sm transform transition-all">
        <div className="p-6 relative">
          <button
            onClick={cancelButton}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <FiX size={20} />
          </button>

          <div className="pr-6 text-white">
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-white/80 text-sm">{desc}</p>
          </div>
        </div>

        <div className="px-6 py-4 flex flex-row-reverse gap-3 border-t border-white/10">
          <button
            onClick={handleButton}
            disabled={loading}
            type="button"
            className="inline-flex bg-white text-indigo-900 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-white cursor-pointer hover:bg-white/90 hover:shadow-lg items-center justify-center rounded-lg px-4 py-2 text-sm font-medium shadow-md transition-all min-w-[100px]"
          >
            {loading && <FiLoader className="animate-spin h-4 w-4 mr-2" />}
            {buttonLabel}
          </button>

          <button
            onClick={cancelButton}
            type="button"
            className="px-4 py-2 text-sm font-medium cursor-pointer text-white hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors border border-white/20"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmallModalSection;

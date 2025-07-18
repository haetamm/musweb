import React from 'react';
import { FaMusic } from 'react-icons/fa';

const NotFoundMessage = ({ label }: { label: string }) => {
  return (
    <>
      <div className="flex justify-center w-full items-center h-[calc(100vh-250px)] px-4">
        <div className="glass-card text-white p-8 rounded-xl text-center w-full max-w-lg">
          <div className="bg-blue-500/20 p-4 rounded-lg inline-block">
            <FaMusic className="text-5xl text-blue-400 mx-auto mb-3" />
            <p className="text-blue-400 font-medium">{label} Not Found</p>
          </div>
          <p className="mt-4 text-gray-400">
            The {label} you&apos;re looking for doesn&apos;t exist or may have
            been removed.
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFoundMessage;

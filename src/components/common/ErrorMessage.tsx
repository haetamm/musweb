import React from 'react';

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <>
      <div className="flex justify-center w-full items-center h-[calc(100vh-250px)]">
        <div className="glass-card text-white p-8 rounded-xl text-center w-full max-w-lg">
          <div className="bg-red-500/20 p-4 rounded-lg inline-block">
            <p className="text-red-400 font-medium">{message}</p>
          </div>
          <p className="mt-4 text-gray-400">
            Silakan coba lagi nanti atau hubungi tim dukungan.
          </p>
        </div>
      </div>
    </>
  );
};

export default ErrorMessage;

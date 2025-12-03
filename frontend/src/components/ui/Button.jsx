import React from 'react';

const Button = ({ children, isLoading, className, ...props }) => {
  return (
    <button
      disabled={isLoading}
      className={`w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
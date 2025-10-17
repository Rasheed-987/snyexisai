import React, { useEffect } from 'react';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
  onClose?: () => void;
  timeout?: number;
}



export default function Alert({ type , message, onClose, timeout = 3000 }: AlertProps) {

 const bg = type === 'success' ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800';
  const label = type === 'success' ? 'Success!' : 'Error!';
  timeout = timeout || 3000; // milliseconds

  useEffect(() => {
    if (!onClose) return
    const timer = setTimeout(() => {
      onClose()
    }, timeout)
    return () => clearTimeout(timer)
  }, [onClose, timeout, message])

  return (
    <div className={`flex items-center justify-between border rounded-md px-4 py-3 mb-4 ${bg}`}
      role="alert"
    >
      <span className="font-semibold mr-2">{label}</span>
      <span className="flex-1">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-xl font-bold text-inherit hover:text-gray-600 focus:outline-none"
          aria-label="Close"
        >
          ×
        </button>
      )}
    </div>
  )
}

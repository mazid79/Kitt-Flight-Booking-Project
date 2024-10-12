/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";

interface LoadingCardProps {
  onClose: () => void; // Callback to close the modal after loading
}

const LoadingCard: React.FC<LoadingCardProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(2), 2000); // Move to the second text after 2 seconds
    const timer2 = setTimeout(() => setStep(3), 4000); // Move to the third text after 4 seconds
    const timer3 = setTimeout(onClose, 6000); // Close modal after 6 seconds

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <img src="/images/paperfly.gif" alt="Loading..." className="w-24 h-24 mb-4" />
        
        <div className="flex flex-col space-y-4">
          {step >= 1 && (
            <div className="flex items-center">
              <div className="loader mr-2" />
              <span>Searching for available flights</span>
            </div>
          )}
          {step >= 2 && (
            <div className="flex items-center">
              <div className="loader mr-2" />
              <span>Attaching company rules</span>
            </div>
          )}
          {step >= 3 && (
            <div className="flex items-center">
              <div className="loader mr-2" />
              <span>Serving best results</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
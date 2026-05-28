import React, { useState } from 'react';

const CopyButton = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      
      setIsCopied(true);
      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button 
      onClick={handleCopyClick}
      style={{ padding: '8px 16px', cursor: 'pointer' }}
    >
      {isCopied ? 'Copied!✅' : 'Copy Text📋'}
    </button>
  );
};

export default CopyButton;

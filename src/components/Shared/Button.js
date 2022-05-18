import React from 'react';

const Button = ({ text }) => {
  return (
    <button
      className={`btn btn-primary bg-gradient-to-r from-secondary to-primary text-white font-bold`}
    >
      {text}
    </button>
  );
};

export default Button;

import React from 'react';

const Button = ({ btnName, classStyles, handleClick }) => {
    return (
        <button 
            className={`p-2 bg-pink-900 text-white rounded-md font-poppins font-semibold ${classStyles}`}
            onClick={handleClick}
        >
            {btnName}
        </button>
    );
};

export default Button;

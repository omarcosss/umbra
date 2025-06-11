import React from 'react';
import "./styles.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string; // Explicitly define the placeholder prop
}

const Input: React.FC<InputProps> = (props) => {
    return (
        <input
            className="input-field"
            {...props}
        />
    );
}

export default Input;
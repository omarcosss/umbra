import React from 'react';
import "./styles.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
    return (
        <input
            className="input-field"
            {...props}
        />
    );
}

export default Input;
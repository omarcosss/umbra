import React from "react";
import './ButtonStyles.scss';

type ButtonProps = {
    title?: string;
    link?: string;
    icon?: React.ElementType;
    onClick?: () => void;
}

const Button = ({title, link, icon: Icon, onClick}: ButtonProps) => {
    const content = (
        <>
            {title}
            {Icon && <Icon size={15}/>}
        </>
    );

    if (link) {
        return (
            <a href={link} className="button" onClick={onClick}>
                {content}
            </a>
        );
    }

    return (
        <button className="button" onClick={onClick}>
            {content}
        </button>
    );
};

export default Button;
import React from 'react';
import classes from "./ButtonBlack.module.scss";

interface ButtonBlackProps {
    children: React.ReactChild | React.ReactNode;
    onClick?: () => void;
} 
const ButtonBlack: React.FC<ButtonBlackProps> = ({children, ...props}) => {
    return (
        <button className={classes.container} {...props}>
            {children}
        </button>
    );
};

export default ButtonBlack;
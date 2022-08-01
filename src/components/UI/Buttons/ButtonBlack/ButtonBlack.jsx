import React from 'react';
import classes from "./ButtonBlack.module.css";


const ButtonBlack = ({children, ...props}) => {
    return (
        <button className={classes.container} {...props}>
            {children}
        </button>
    );
};

export default ButtonBlack;
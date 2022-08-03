import React from 'react';
import classes from "./ButtonBlack.module.scss";


const ButtonBlack = ({children, ...props}) => {
    return (
        <button className={classes.container} {...props}>
            {children}
        </button>
    );
};

export default ButtonBlack;
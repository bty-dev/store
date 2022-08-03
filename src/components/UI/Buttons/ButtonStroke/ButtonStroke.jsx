import React from 'react';
import classes from "./ButtonStroke.module.scss";

const ButtonStroke = ({children, ...props}) => {
    return (
        <button className={classes.container} {...props}>
            {children}
        </button>
    );
};

export default ButtonStroke;
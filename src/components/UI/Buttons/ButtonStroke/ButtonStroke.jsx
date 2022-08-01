import React from 'react';
import classes from "../ButtonStroke/ButtonStroke.module.css";

const ButtonStroke = ({children, ...props}) => {
    return (
        <button className={classes.container} {...props}>
            {children}
        </button>
    );
};

export default ButtonStroke;
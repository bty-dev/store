import React from 'react';
import classes from "./Chips.module.scss";


const Chips = ({children, ...props}) => {
    return (
        <div className={classes.chips} {...props}>
            {children}
        </div>
    );
};

export default Chips;
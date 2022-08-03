import React from 'react';
import classes from "./Chips.module.scss";


const Chips = ({children}) => {
    return (
        <div className={classes.chips}>
            {children}
        </div>
    );
};

export default Chips;
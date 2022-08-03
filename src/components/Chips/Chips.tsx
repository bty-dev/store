import React from 'react';
import classes from "./Chips.module.scss";

interface ChipsProps {
    children: React.ReactChild | React.ReactNode
}
const Chips: React.FC<ChipsProps> = ({children}) => {
    return (
        <div className={classes.chips}>
            {children}
        </div>
    );
};

export default Chips;
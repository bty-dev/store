import React from 'react';
import classes from "./Chips.module.scss";

interface ChipsProps {
    children: React.ReactChild | React.ReactNode
}
const Chips: React.FC<ChipsProps> = ({children, ...props}) => {
    return (
        <div className={classes.chips} {...props}>
            {children}
        </div>
    );
};

export default Chips;
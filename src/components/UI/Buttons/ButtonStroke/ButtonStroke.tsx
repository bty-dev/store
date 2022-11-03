import React from 'react';
import classes from "./ButtonStroke.module.scss";
interface ButtonStrokeProps {
    children: React.ReactChild | React.ReactNode;
    onClick?: () => void;
}
const ButtonStroke: React.FC<ButtonStrokeProps> = ({children, ...props}) => {
    return (
        <button className={classes.container} {...props}>
            {children}
        </button>
    );
};

export default ButtonStroke;
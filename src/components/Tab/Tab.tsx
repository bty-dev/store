import React, {ReactChildren} from 'react';
import classes from './Tab.module.scss';


interface TabProps {
    children: React.ReactChild | React.ReactNode
    styles?: {}
}

const Tab: React.FC<TabProps> = ({children,styles, ...props}) => {
    return (
        <div className={classes.main} style={styles} {...props}>
            {children}
        </div>
    );
};

export default Tab;
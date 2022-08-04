import React from 'react';
import classes from "./ButtonBlackEdit.module.scss";
import icon from "./icon_edit.svg";
import iconBlack from "./icon_edit_black.svg";

const ButtonBlackEdit = ({...props}) => {
    return (
        <button {...props} className={classes.main}>
            Изменить картинку ✎
            {/*<img*/}
            {/*className={classes.img}*/}
            {/*src={icon}*/}
            {/*alt="Edit"*/}
            {/*onMouseOver={e => (e.currentTarget.src = {iconBlack})}/>*/}
        </button>
    );
};

export default ButtonBlackEdit;
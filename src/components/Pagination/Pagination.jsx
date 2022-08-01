import React, {useState} from 'react';
import leftArrow from "./left_arrow.svg";
import rightArrow from "./right_arrow.svg";
import classes from "./Pagination.module.css";


const Pagination = () => {
    const [selected, setSelected] = useState(1);

    const setPage = (page) => {
        setSelected(page);
    }

    let first = selected === 1 ? "classes.circle__page" : "classes.circle__page_sec";


    return (
        <div className={classes.container}>
            <img className={classes.img} src={leftArrow} alt="left"/>
            <div onClick={() => setPage(1)} className={classes.circle__page}>1</div>
            {/*<div onClick={() => setPage(2)} className={classes.circle__page_sec}>2</div>*/}
            {/*<div onClick={() => setPage(3)} className={classes.circle__page_sec}>3</div>*/}
            <img className={classes.img} src={rightArrow} alt="right"/>
        </div>
    );
};

export default Pagination;
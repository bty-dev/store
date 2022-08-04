import React, {useState} from 'react';
import leftArrow from "./left_arrow.svg";
import rightArrow from "./right_arrow.svg";
import classes from "./Pagination.module.scss";


const Pagination = ({setPageNum}) => {
    const [selected, setSelected] = useState(1);

    const setPage = (page: number) => {
        setSelected(page);
        setPageNum(page)
    }

    let first = selected === 1 ? classes.circle__page : classes.circle__page_sec;
    let second = selected === 2 ? classes.circle__page : classes.circle__page_sec;
    let third = selected === 3 ? classes.circle__page : classes.circle__page_sec;
    let fourth = selected === 4 ? classes.circle__page : classes.circle__page_sec;
    let fifth = selected === 5 ? classes.circle__page : classes.circle__page_sec;


    return (
        <div className={classes.container}>
            <img onClick={() => setPage(selected - 1)} className={classes.img} src={leftArrow} alt="left"/>
            <div onClick={() => setPage(1)} className={first}>1</div>
            <div onClick={() => setPage(2)} className={second}>2</div>
            <div onClick={() => setPage(3)} className={third}>3</div>
            <div onClick={() => setPage(4)} className={fourth}>4</div>
            <div onClick={() => setPage(5)} className={fifth}>5</div>
            <img onClick={() => setPage(selected + 1)} className={classes.img} src={rightArrow} alt="right"/>
        </div>
    );
};

export default Pagination;
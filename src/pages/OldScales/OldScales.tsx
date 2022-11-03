import React from 'react';
import classes from "./OldScales.module.scss";
import {Link} from "react-router-dom";
import Chips from "../../components/Chips/Chips";
import SearchField from "../../components/UI/SearchField/SearchField";
import ButtonBlack from "../../components/UI/Buttons/ButtonBlack/ButtonBlack";
import Accordion from "../../components/Accordion/Accordion";
import ModalChoose from "../../components/UI/Modals/ModalChoose/ModalChoose";
import Tab from "../../components/Tab/Tab";


const OldScales: React.FC = () => {
    return (
        <div className={classes.page__cont}>
            <div className={classes.page__title}>Старые весы</div>
            <div className={classes.nav__btns}>
                <Link style={{ textDecoration: 'none' }} to="/"><Tab styles={{backgroundColor: "#D9D9D9", pointerEvents: "none"}}>Весы</Tab></Link>
                <Link style={{ textDecoration: 'none' }} to="/categories"><Tab styles={{backgroundColor: "#D9D9D9", pointerEvents: "none"}}>Категории</Tab></Link>
                <Link style={{ textDecoration: 'none', marginTop: 8 }} to="/oldScales"><Tab>Старые весы</Tab></Link>

            </div>
            <div className={classes.page__main}>
                <div className={classes.table}>
                    <div className={classes.table__top}>
                        <div className={classes.text}>Код магазина</div>
                        <div className={classes.text}>Тип</div>
                        <div className={classes.text}>Номер</div>
                        <div className={classes.text}>IP</div>
                        <div className={classes.text}>Статус</div>
                    </div>
                    <div className={classes.table__item}>
                        <div>K002</div>
                        <div>Tiger</div>
                        <div>Airport, Training 1</div>
                        <div>10.10.254.101</div>
                        <div>Не загружено</div>
                    </div>
                    <div className={classes.table__item}>
                        <div>K002</div>
                        <div>Tiger</div>
                        <div>Airport, Training 1</div>
                        <div>10.10.254.101</div>
                        <div>Не загружено</div>
                    </div>
                    <div className={classes.table__item}>
                        <div>K002</div>
                        <div>Tiger</div>
                        <div>Airport, Training 1</div>
                        <div>10.10.254.101</div>
                        <div>Не загружено</div>
                    </div>
                    <div className={classes.table__item}>
                        <div>K002</div>
                        <div>Tiger</div>
                        <div>Airport, Training 1</div>
                        <div>10.10.254.101</div>
                        <div>Не загружено</div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OldScales;
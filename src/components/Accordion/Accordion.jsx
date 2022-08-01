import React, {useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import classes from "./Accrodion.module.css";
import ButtonBlack from "../UI/Buttons/ButtonBlack/ButtonBlack";
import {CSSTransition} from "react-transition-group";
import icon from "./list_control.svg";
import iconOpen from "./list_control_open.svg";
import iconGray from "./icon_gray.svg";
import ButtonStroke from "../UI/Buttons/ButtonStroke/ButtonStroke";
import {Link} from "react-router-dom";
import Chips from "../Chips/Chips";
import {green} from "@mui/material/colors";
import ModalSetCategory from "../UI/Modals/ModalSetCategory/ModalSetCategory";
import axios from "axios";

const Accordion = ({title, code, address, scales, setDefCat}) => {
    const [isOpen, setOpen] = useState(false);


    const toggleOpen = () => {
        setOpen(!isOpen)
        console.log(isOpen)
    }

    return (

        <div>
            <div className={classes.container}>
                <Checkbox classes={classes.checkbox} style={{alignSelf: `${isOpen ? "flex-start" : "center"}`}}/>
                <div className={classes.wrapper}>
                    <div className={classes.main}>
                        <div className={classes.text__hint}>Код магазина</div>
                        <div className={classes.text__value}>{code}</div>
                        <div className={classes.text__hint}>Название магазина</div>
                        <div className={classes.text__value}>{title}</div>
                        <div className={classes.text__hint}>Адрес</div>
                        <div className={classes.text__value}>{address}</div>
                        <Link to="/products"><ButtonBlack>Товары</ButtonBlack></Link>
                        <div className={classes.open_more__block}>
                            <div className={classes.text__hint_light}>{scales.length} {scales.length === 1 ? "весы " : "весов"}</div>
                            {scales.length === 0 ? <div style={{width: 30}}></div> : <img onClick={() => toggleOpen()} className={classes.img} src={isOpen ? iconOpen : icon} alt="open"/>}

                        </div>
                    </div>
                    {isOpen
                    ?
                        <div className={classes.table__low}>
                            <div className={classes.table__line}>
                                <div className={classes.text__hint}>Тип <img className={classes.img} src={iconGray} alt="open"/></div>
                                <div className={classes.text__hint}>Номер <img className={classes.img} src={iconGray} alt="open"/></div>
                                <div className={classes.text__hint}>IP <img className={classes.img} src={iconGray} alt="open"/></div>
                                <div className={classes.text__hint}>Статус <img className={classes.img} src={iconGray} alt="open"/></div>
                                <div className={classes.text__hint}>Категории <img className={classes.img} src={iconGray} alt="open"/></div>
                            </div>
                            {scales.map(item => (<TableLine number={item.Number} api={item.IP} status={item.Status} type={item.Type}/>))}



                            {/*<div className={classes.table__line}>*/}
                            {/*    <div className={classes.text__value}>Tiger</div>*/}
                            {/*    <div className={classes.text__value}>Sergeli12</div>*/}
                            {/*    <div className={classes.text__value}>10.100.234.22</div>*/}
                            {/*    <div className={classes.text__value}>Не загружено</div>*/}
                            {/*    <div className={classes.text__value}>*/}
                            {/*        <ButtonStroke>Выбрать</ButtonStroke>*/}

                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={classes.table__line}>*/}
                            {/*    <div className={classes.text__value}>Tiger</div>*/}
                            {/*    <div className={classes.text__value}>Sergeli12</div>*/}
                            {/*    <div className={classes.text__value}>10.100.234.22</div>*/}
                            {/*    <div className={classes.text__value}>Не загружено</div>*/}
                            {/*    <div className={classes.text__value}>*/}
                            {/*        <ButtonStroke>Выбрать</ButtonStroke>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>

                    : null
                    }

                </div>


            </div>

        </div>


    );
};

export default Accordion;


const TableLine = ({number, api, type, status}) => {
    const [isModal, setModal] = useState(false);
    const setVisible = () => {
        setModal(true);

        let config = {
            method: 'post',
            url: 'https://localhost:44302/api/Portal/SetGroupCategory',
            headers: { },
            data: {
                groupId: 1,
                categoryId: 1
            },
            withCredentials: true,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                console.log("yspeshno")
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    return (
        <div className={classes.table__line}>
            <div className={classes.text__value}>{type}</div>
            <div className={classes.text__value}>{number}</div>
            <div className={classes.text__value}>{api}</div>
            <div className={classes.text__value}>{status === true ? "Загруженно" : "Не загруженно"}</div>
            <div className={classes.text__value}>
                <ButtonStroke onClick={setVisible}>Выбрать</ButtonStroke>
            </div>
            <ModalSetCategory visible={isModal} setVisible={setModal}/>
        </div>
    )
}
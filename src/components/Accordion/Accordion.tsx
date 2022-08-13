import React, {useState} from 'react';
import Checkbox, { CheckboxClasses } from '@mui/material/Checkbox';
import classes from "./Accrodion.module.scss";
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
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface AccordionProps {
    title: string;
    code: string;
    address: string;
    scales: Array<any>;
    setDefCat?: () => void;
}
const Accordion = ({title, code, address, scales, setDefCat}: AccordionProps) => {
    const [isOpen, setOpen] = useState(false);


    const toggleOpen = () => {
        setOpen(!isOpen)
        console.log(isOpen)
    }
    console.log(classes);
    return (

        <div>
            <div className={classes.container}>
                <Checkbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleOutlineIcon />} className={classes.checkbox} style={{alignSelf: `${isOpen ? "flex-start" : "center"}`}}/>
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
                            {scales.map(item => (<TableLine scaleId={item.Id} number={item.Number} api={item.IP} status={item.Status} type={item.Type}/>))}
                        </div>

                    : null
                    }
                </div>
            </div>
        </div>
    );
};

export default Accordion;
interface tableLineProps {
    number: number;
    api: string;
    type: string;
    status: boolean;
    scaleId: number;
}

const setDefaultCategoryForScale = async (scaleId: number, categoryId: number) => {
    axios.post(`https://localhost:44302/api/Portal/SetDefaultCategory?scaleId=${scaleId}&categoryId=${categoryId}`)
        .then(function (response) {
            console.log(response.status);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const TableLine = ({number, api, type, status, scaleId}: tableLineProps) => {
    const [isModal, setModal] = useState(false);
    const setVisible = () => {
        setModal(true);
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
            <ModalSetCategory scaleId={scaleId} itemNumber={1} setCategoryForScale={setDefaultCategoryForScale} visible={isModal} setVisible={setModal}/>
        </div>
    )
}
import React, {useState} from 'react';
import classes from "./CategoriesAccordion.module.scss";
import './CategoriesAccordionAll.scss';
import ButtonBlack from "../UI/Buttons/ButtonBlack/ButtonBlack";
import iconOpen from "./list_control_open.svg";
import icon from "./list_control.svg";
import iconGray from "./icon_gray.svg";
import ButtonStroke from "../UI/Buttons/ButtonStroke/ButtonStroke";
import ModalChoose from "../UI/Modals/ModalChoose/ModalChoose";
import ModalAccept from "../UI/Modals/ModalAccept/ModalAccept";
import ModalSetCategory from "../UI/Modals/ModalSetCategory/ModalSetCategory";
import {CSSTransition} from "react-transition-group";

const CategoriesAccordion = ({title, groups}) => {
    const [isOpen, setOpen] = useState(false);
    const [isModal, setModal] = useState(false);
    const [view, setView] = useState(false);

    const toggleOpen = () => {
        setOpen(!isOpen)
        console.log(isOpen)
    }

    const setVisible = () => {
        setModal(true);
        setView(true);

    }


    return (
        <div>
            <ModalAccept visible={isModal} setVisible={setModal} text="Вы уверенны, что хотите изменить категорию этой группы?"/>
            <div className={classes.container}>
                <div className={classes.wrapper}>
                    <div className={classes.main}>
                        <div className={classes.text__value__black}>{title}</div>
                        <div className={classes.open_more__block}>
                            <div className={classes.text__hint_light}>{groups.length} {groups.length === 0 ? "групп" : "группы"}</div>
                            {groups.length === 0 ? <div style={{width: 30}}></div> : <img onClick={() => toggleOpen()} className={classes.img} src={isOpen ? iconOpen : icon} alt="open"/>}

                        </div>
                    </div>
                    {isOpen
                        ?

                        <div className={classes.table__low}>
                                <TableLine groups={groups}/>




                            {/*<div className={classes.table__line}>*/}
                            {/*    <div className={classes.text__value}>192837483</div>*/}
                            {/*    <div className={classes.text__value}>*/}
                            {/*        <ButtonBlack onClick={setVisible}>Указать категорию</ButtonBlack>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={classes.table__line}>*/}
                            {/*    <div className={classes.text__value}>192837483</div>*/}
                            {/*    <div className={classes.text__value}>*/}
                            {/*        <ButtonBlack onClick={setVisible}>Указать категорию</ButtonBlack>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={classes.table__line}>*/}
                            {/*    <div className={classes.text__value}>192837483</div>*/}
                            {/*    <div className={classes.text__value}>*/}
                            {/*        <ButtonBlack onClick={setVisible}>Указать категорию</ButtonBlack>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                        : null
                    }

                </div>


            </div>
            <ModalSetCategory visible={view} setVisible={setView}/>
        </div>
    );
};

export default CategoriesAccordion;


const TableLine = ({groups}) => {
    const [isOpen, setOpen] = useState(false);
    const [isModal, setModal] = useState(false);
    const [view, setView] = useState(false);

    const toggleOpen = () => {
        setOpen(!isOpen)
        console.log(isOpen)
    }
    const setVisible = () => {
        setModal(true);
        setView(true);

    }

    return (
        <>
            {groups.map(item => (
                <div className={classes.table__line}>
                    <ModalAccept visible={isModal} setVisible={setModal} text="Вы уверенны, что хотите изменить категорию этой группы?"/>
                    <div className={classes.text__value}>{item}</div>
                    <div className={classes.text__value}>
                        <ButtonBlack onClick={setVisible}>Указать категорию</ButtonBlack>
                    </div>
                    <ModalSetCategory visible={view} setVisible={setView}/>
                </div>
            ))}

        </>

    )

}
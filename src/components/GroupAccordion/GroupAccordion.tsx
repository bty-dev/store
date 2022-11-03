import React, {useState} from 'react';
import classes from './GroupAccordion.module.scss';
import iconOpen from "../CategoriesAccordion/list_control_open.svg";
import icon from "../CategoriesAccordion/list_control.svg";
import ButtonBlack from "../UI/Buttons/ButtonBlack/ButtonBlack";
import Chips from "../Chips/Chips";
import ModalSetCategory from "../UI/Modals/ModalSetCategory/ModalSetCategory";
import axios from "axios";

interface GroupAccordionItem {
    id: number;
    groupSAP: string;
    categoryRuName: string;
    getCategories: () => void;
}

const GroupAccordion = ({id, groupSAP, categoryRuName, getCategories}: GroupAccordionItem) => {
    const [isModal, setModal] = useState(false);
    const [view, setView] = useState(false);


    const setVisible = () => {
        setModal(true);
        setView(true);

    }
    const setCategoryForGroup = async (groupId: number, categoryId: number) => {
        axios.post(`https://localhost:7158/Portal/SetGroupCategory?groupPlu=${groupId}&categoryId=${categoryId}`)
            .then(function (response) {
                console.log(response.status);
                getCategories();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            {/*<ModalAccept visible={isModal} setVisible={setModal} text="Вы уверенны, что хотите изменить категорию этой группы?"/>*/}
            <div className={classes.container}>
                <div className={classes.wrapper}>
                    <div className={classes.main}>
                        <div className={classes.part}>
                            <div style={{width: 100}} className={classes.text__hint}>{groupSAP}</div>
                            <Chips children={categoryRuName}/>
                        </div>
                        <div className={classes.text__value}>
                            <ButtonBlack onClick={setVisible}>Указать категорию</ButtonBlack>
                        </div>
                        <ModalSetCategory setCategoryForGroup={setCategoryForGroup} visible={view} setVisible={setView} itemNumber={id} groupIndex={Number(groupSAP)}/>
                    </div>

                </div>


            </div>

        </div>
    );
};

export default GroupAccordion;
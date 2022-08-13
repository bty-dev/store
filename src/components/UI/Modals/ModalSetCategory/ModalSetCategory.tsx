import React, {useEffect, useState} from 'react';
import classes from "./ModalSetCategory.module.scss";
import axios from 'axios';

interface ModalSetCategoryProps {
    visible: boolean;
    setVisible: Function;
    setCategoryForGroup?: Function;
    itemNumber?: number;
    groupIndex?: number;
    scaleId?: number;
    setCategoryForScale?: Function;
}

const ModalSetCategory: React.FC<ModalSetCategoryProps> = ({visible, setVisible, setCategoryForGroup, itemNumber, groupIndex, scaleId, setCategoryForScale}) => {
    const rootClasses = [classes.modal];
    if (visible) {
        rootClasses.push(classes.active);
    }
    const [cardList, setCardList] = useState([
        {Id: 1, order: 1, Name: "Мясо"},
        {Id: 2, order: 2, Name: "Фрукты"},
        {Id: 3, order: 3, Name: "Овощи"},
        {Id: 4, order: 4, Name: "Сладости"},
        {Id: 5, order: 5, Name: "Выпечка"},
    ])

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        let config = {
            method: 'get',
            url: 'https://localhost:44302/api/Portal/GetCategories',
            headers: { }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setCardList(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        <div onClick={() => setVisible(false)} className={rootClasses.join(" ")}>
            <div className={classes.modal__content} onClick={(e) => e.stopPropagation()}>
                <h1>Укажите категорию</h1>
                <div style={{color: "#A7A7A7", marginBottom: 20}}></div>
                {cardList.map((card, index) => (
                    <div>
                        <div onClick={() => {
                            setVisible(false);
                            if (setCategoryForGroup !== undefined) {
                                setCategoryForGroup(groupIndex, card.Id);
                            }
                            if (setCategoryForScale !== undefined) setCategoryForScale(scaleId, card.Id);


                        }} className={classes.btn_category}>{card.Id}) {card.Name}</div>
                    </div>

                ))}


            </div>
        </div>
    );
};

export default ModalSetCategory;
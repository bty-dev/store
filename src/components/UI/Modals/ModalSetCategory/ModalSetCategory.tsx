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
    forScale?: boolean;
    code?: string;
}

const ModalSetCategory: React.FC<ModalSetCategoryProps> = ({code, forScale, visible, setVisible, setCategoryForGroup, itemNumber, groupIndex, scaleId, setCategoryForScale}) => {
    const rootClasses = [classes.modal];
    if (visible) {
        rootClasses.push(classes.active);
    }
    const [cardList, setCardList] = useState([
        {Id: 1, order: 1, RuName: "Мясо"},
        {Id: 2, order: 2, RuName: "Фрукты"},
        {Id: 3, order: 3, RuName: "Овощи"},
        {Id: 4, order: 4, RuName: "Сладости"},
        {Id: 5, order: 5, RuName: "Выпечка"},
    ])

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        let url = forScale ? `https://localhost:44302/api/Portal/GetMarketCategories?marketId=${code}` : 'https://localhost:44302/api/Portal/GetCategories';
        console.log(url)
        let config = {
            method: 'get',
            url: url,
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

                        <div onClick={(e) => {
                            e.stopPropagation();
                            setVisible(false);
                            if (setCategoryForGroup !== undefined) {
                                setCategoryForGroup(groupIndex, card.Id);
                            }
                            if (setCategoryForScale !== undefined) setCategoryForScale(scaleId, index);


                        }} className={classes.btn_category}>{index + 1}) {card.RuName}</div>
                    </div>

                ))}


            </div>
        </div>
    );
};

export default ModalSetCategory;
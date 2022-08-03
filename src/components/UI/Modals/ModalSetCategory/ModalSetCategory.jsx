import React, {useEffect, useState} from 'react';
import classes from "./ModalSetCategory.module.scss";
import axios from 'axios';


const ModalSetCategory = ({visible, setVisible}) => {
    const rootClasses = [classes.modal];
    if (visible) {
        rootClasses.push(classes.active);
    }
    const [cardList, setCardList] = useState([
        {id: 1, order: 1, value: "Мясо"},
        {id: 2, order: 2, value: "Фрукты"},
        {id: 3, order: 3, value: "Овощи"},
        {id: 4, order: 4, value: "Сладости"},
        {id: 5, order: 5, value: "Выпечка"},
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
                        <div onClick={() => setVisible(false)} className={classes.line} className={classes.btn_category}>{card.Id}) {card.Name}</div>
                    </div>

                ))}


            </div>
        </div>
    );
};

export default ModalSetCategory;
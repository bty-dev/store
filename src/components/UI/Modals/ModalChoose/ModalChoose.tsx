import React, {useEffect, useState} from 'react';
import classes from "./ModalChoose.module.scss";
import Swal from 'sweetalert2';
import axios from "../../../../services/ApiService";


interface ModalChooseProps {
    visible: boolean;
    setVisible: (vis: boolean) => void;
    marketId: string;
}

interface CardInterface {
    Id: number;
    RuName: string;
    order?: number;
}

const ModalChoose = ({visible, setVisible, marketId}: ModalChooseProps) => {
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

    const [currentCard, setCurrentCard] = useState<any>(null);

    function dragStartHandler(e: React.DragEvent, card: {order: number, Id: number}) {
        console.log("drag", card)
        setCurrentCard(card)
    }

    function dragEndHandler(e: React.DragEvent) {//Проверить правильность
        (e.target as HTMLDivElement).style.background = "#F2F5FA";
    }

    function dragOverHandler(e: React.DragEvent) {
        e.preventDefault();
        (e.target as HTMLElement).style.background = "black";
    }

    function dropHandler(e: React.DragEvent, card: {order: number, Id: number}) {
        e.preventDefault();
        console.log("drop", card)
        setCardList(cardList.map(c => {
            if (c.Id === card.Id) {
                return {...c, order: currentCard!.order};
            }
            if (c.Id === currentCard!.Id) {
                return {...c, order: card.order};
            }
            return c;
        }));
        (e.target as HTMLElement).style.background = "#F2F5FA";
    }

    const sortCards = (a: any, b: any) => {
        if (a.order > b.order) {
            return 1;
        } else {
            return -1;
        }
    }

    useEffect(() => {
        console.log(marketId)
        axios.get(`https://localhost:7158/Portal/GetMarketCategories?marketId=${marketId}`)
            .then(function (response) {
                setCardList(response.data)
                // @ts-ignore

                // debugger
                // console.log(response.data)
                // debugger
                // console.log(cardList)
                // let copyObj = cardList.map((item, index) => {
                //     item.order = index + 1
                //     item.RuName = response.data[index].RuName
                //     return item
                // })
                // debugger
                // console.log(copyObj)
                // setCardList(copyObj)
                // console.log(cardList)
                // console.log(response.data)
                return response
            })
            .then((response) => {
                console.log(cardList)
                // @ts-ignore
                let copyObj = response.data.map((item, index) => {
                    item.order = index
                    item.RuName = response.data[index].RuName
                    return item
                })
                setCardList(copyObj)

            })
            .then(() => {
                console.log(cardList)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [marketId])



    const sendCatOrders = () => {
        const data: number[] = cardList.map(item => item.Id)
        let res = data.join(",");
        console.log(res)
        axios.get(`https://localhost:7158/Portal/ChangeCategoriesOrder?marketId=${marketId}&categoryIdsOrder=${res}`)
    }

    return (
        <div onClick={() => setVisible(false)} className={rootClasses.join(" ")}>
            <div className={classes.modal__content} onClick={(e) => e.stopPropagation()}>
                <h1>Порядок категорий</h1>
                <div style={{color: "#A7A7A7", marginBottom: 20}}>Перетащите категории<br/>в нужном порядке</div>
                {cardList.sort(sortCards).map((card, Id) => (
                    <div><div onDragStart={(e) => dragStartHandler(e, card)}
                              onDragLeave={(e) => dragEndHandler(e)}
                              onDragEnd={(e) => dragEndHandler(e)}
                              onDragOver={(e) => dragOverHandler(e)}
                              onDrop={(e) => dropHandler(e, card)}
                              draggable={true}
                            //   className={classes.line}
                              className={classes.btn_category}>{Id + 1}) {card.RuName}</div>
                    </div>

                ))}
                <div onClick={() => {
                    setVisible(false)
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Сохранено!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    sendCatOrders();
                }} className={classes.btn__save}>Сохранить</div>


            </div>
        </div>
    );
};

export default ModalChoose;
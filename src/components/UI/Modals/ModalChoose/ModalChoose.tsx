import React, {useState} from 'react';
import classes from "./ModalChoose.module.scss";
import Swal from 'sweetalert2';


interface ModalChooseProps {
    visible: boolean;
    setVisible: (vis: boolean) => void;
}

const ModalChoose = ({visible, setVisible}: ModalChooseProps) => {
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

    const [currentCard, setCurrentCard] = useState<any>(null);

    function dragStartHandler(e: React.DragEvent, card: {order: number, id: number}) {
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

    function dropHandler(e: React.DragEvent, card: {order: number, id: number}) {
        e.preventDefault();
        console.log("drop", card)
        setCardList(cardList.map(c => {
            if (c.id === card.id) {
                return {...c, order: currentCard!.order};
            }
            if (c.id === currentCard!.id) {
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

    return (
        <div onClick={() => setVisible(false)} className={rootClasses.join(" ")}>
            <div className={classes.modal__content} onClick={(e) => e.stopPropagation()}>
                <h1>Порядок категорий</h1>
                <div style={{color: "#A7A7A7", marginBottom: 20}}>Перетащите категории<br/>в нужном порядке</div>
                {cardList.sort(sortCards).map((card, index) => (
                    <div><div onDragStart={(e) => dragStartHandler(e, card)}
                              onDragLeave={(e) => dragEndHandler(e)}
                              onDragEnd={(e) => dragEndHandler(e)}
                              onDragOver={(e) => dragOverHandler(e)}
                              onDrop={(e) => dropHandler(e, card)}
                              draggable={true}
                            //   className={classes.line}
                              className={classes.btn_category}>{index + 1}) {card.value}</div>
                    </div>

                ))}
                <div onClick={() => {
                    setVisible(false)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Сохранено!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }} className={classes.btn__save}>Сохранить</div>


            </div>
        </div>
    );
};

export default ModalChoose;
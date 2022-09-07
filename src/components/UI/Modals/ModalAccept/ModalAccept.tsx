import React from 'react';
import classes from "./ModalAccept.module.scss";
import Swal from 'sweetalert2';
interface ModalAcceptProps {
    visible: boolean;
    setVisible: (vis: boolean) => void;
    text: string;
    setImageToGood?: Function;
}
const ModalAccept = ({visible, setVisible, text, setImageToGood}: ModalAcceptProps) => {
    const rootClasses = [classes.modal];
    if (visible) {
        rootClasses.push(classes.active);
    }

    return (
        <div onClick={() => setVisible(false)} className={rootClasses.join(" ")}>
            <div className={classes.modal__content} onClick={(e) => e.stopPropagation()}>
                <h1>{text}</h1>
                <div className={classes.btns__choose}>
                    <div onClick={(e) => {setVisible(false); e.stopPropagation();}} className={classes.btn_deny}>Отменить</div>
                    <div onClick={(e) => {
                        e.stopPropagation();
                        setVisible(false)
                        if (setImageToGood) setImageToGood();

                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Сохранено!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }} className={classes.btn_allow}>Сохранить</div>
                </div>
            </div>
        </div>
    );
};

export default ModalAccept;
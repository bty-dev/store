import React from 'react';
import classes from "./ModalAccept.module.scss";
import Swal from 'sweetalert2';

const ModalAccept = ({visible, setVisible, text}) => {
    const rootClasses = [classes.modal];
    if (visible) {
        rootClasses.push(classes.active);
    }

    return (
        <div onClick={() => setVisible(false)} className={rootClasses.join(" ")}>
            <div className={classes.modal__content} onClick={(e) => e.stopPropagation()}>
                <h1>{text}</h1>
                <div className={classes.btns__choose}>
                    <div onClick={() => setVisible(false)} className={classes.btn_deny}>Отменить</div>
                    <div onClick={() => {
                        setVisible(false)
                        Swal.fire({
                            position: 'top-end',
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
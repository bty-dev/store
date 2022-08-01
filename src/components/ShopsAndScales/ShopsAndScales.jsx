import React, {useEffect, useState} from 'react';
import classes from "./ShopsAndScales.module.css";
import SearchField from "../UI/SearchField/SearchField";
import ButtonBlack from "../UI/Buttons/ButtonBlack/ButtonBlack";
import Accordion from "../Accordion/Accordion";
import {Modal} from "@mui/material";
import ModalChoose from "../UI/Modals/ModalChoose/ModalChoose";
import ButtonBlackEdit from "../UI/Buttons/ButtonBlackEdit/ButtonBlackEdit";
import Pagination from "../Pagination/Pagination";
import Chips from "../Chips/Chips";
import {Link} from "react-router-dom";
import {logDOM} from "@testing-library/react";
import axios from 'axios';
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";


const ShopsAndScales = () => {
    const [isLoading, setLoading] = useState(true);
    const [isModal, setModal] = useState(false);
    const [forceUpdate, setForce] = useState(0);
    const [shops, setShops] = useState([

    ])
    const [term, setTerm] = useState("");

    const setVisible = () => {
        setModal(true);
    }

    const searchShops = (items, term) => {
        if (term.length === 0) return items;

        return items.filter(item => {
            return item.Name.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

    const onUpdateSearch = (term) => {
        setTerm(term);
    }
    let data = searchShops(shops, term);
    // useEffect(() => {
    //     data = searchShops(shops, term);
    //     console.log(data)
    //     setForce(prevState => prevState + 1);
    // }, [term])

    const config = {
        method: 'get',
        url: 'https://localhost:44302/api/Portal/GetMarkets',

    };

    useEffect(() => {
        getMarkets();
    }, [])

    const getMarkets = async () => {
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setShops(response.data)
                setLoading(false)
                console.log(shops)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const setDefaultCategory = async () => {
        const config = {
            method: 'post',
            url: 'https://localhost:7246/api/test/setdefaultcategory',
            headers: { },
            data : {
                scaleId: 1,
                categoryId: 1,
            }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                console.log("Post completed")
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className={classes.page__cont}>
            <div className={classes.page__title}>Магазины и весы</div>
            <div className={classes.nav__btns}>
                <Link to="/"><Chips>Весы</Chips></Link>
                <Link style={{ textDecoration: 'none' }} to="/categories"><Chips>Категории</Chips></Link>
                <Link style={{ textDecoration: 'none' }} to="/oldScales"><Chips>Старые весы</Chips></Link>

            </div>
            <div className={classes.page__main}>
                <div className={classes.main__top__panel}>
                    <SearchField hint="Начните вводить название магазина" onUpdateSearch={onUpdateSearch}/>
                    <div className={classes.btns__top}>
                        <ButtonBlack onClick={setVisible}>Порядок<br/>категорий</ButtonBlack>
                        <ButtonBlack>Настроить<br/>категории</ButtonBlack>
                    </div>

                </div>
                {isLoading ? <LoadingAnimation/> : data.map((item) => <Accordion setDefCat={setDefaultCategory} title={item.Name} key ={item.MarketCode} code={item.MarketCode} address={item.Address} scales={item.Scales}/>)}
                <ModalChoose visible={isModal} setVisible={setModal}/>
            </div>
        </div>
    );
};

export default ShopsAndScales;
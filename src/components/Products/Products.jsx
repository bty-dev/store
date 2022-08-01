import React, {useEffect} from 'react';
import classes from "./Products.module.css";
import SearchField from "../UI/SearchField/SearchField";
import ButtonBlackEdit from "../UI/Buttons/ButtonBlackEdit/ButtonBlackEdit";
import {useState} from "react";
import ProductListItem from "../ProductListItem/ProductListItem";
import Checkbox from '@mui/material/Checkbox';
import Pagination from "../Pagination/Pagination";
import meat from "./meat.svg";
import tomato from "./tomato.svg";
import ModalAccept from "../UI/Modals/ModalAccept/ModalAccept";
import Chips from "../Chips/Chips";
import {Link} from "react-router-dom";
import axios from 'axios';
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";


const Products = () => {
    const [isLoading, setLoading] = useState(true);

    const [products, setProducts] = useState([

    ])
    const [isModal, setModal] = useState(false);

    const setVisible = () => {
        setModal(true);
    }

    const config = {
        method: 'get',
        url: 'https://localhost:44302/api/Portal/GetGoods',
        headers: { }
    };



    useEffect(() => {
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setProducts(response.data)
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    const [term, setTerm] = useState("");
    const searchProducts = (items, term) => {
        if (term.length === 0) return items;

        return items.filter(item => {
            return item.Name.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

    const onUpdateSearch = (term) => {
        setTerm(term);
    }
    let data = searchProducts(products, term);


    return (
        <div className={classes.page__cont}>
            <div className={classes.page__title}>Товары: <span className={classes.shop__title}>"Тестовый магазин 02"</span></div>
            <div className={classes.nav__btns}>
                <Link style={{ textDecoration: 'none' }} to="/"><Chips>Весы</Chips></Link>
                <Link style={{ textDecoration: 'none' }} to="/categories"><Chips>Категории</Chips></Link>
            </div>
            <div className={classes.page__main}>
                <div className={classes.main__top__panel}>
                    <SearchField hint="Начните вводить наименование продукта или его SAPid" onUpdateSearch={onUpdateSearch}/>
                    <div className={classes.top__filter}>
                        <Checkbox/>
                        <div className={classes.top__title}>Показывать товары без фото</div>
                        <div className={classes.top__subtitle}>0</div>
                    </div>

                    <div className={classes.btns__top}>
                        <ButtonBlackEdit onClick={setVisible}/>
                    </div>

                </div>
                <div className={classes.category__title}>
                    <Checkbox/>Овощи
                </div>

                {isLoading ? <LoadingAnimation/> : data.map(item => (
                    <ProductListItem key={item.Id} img={tomato} title={item.Name} price={item.Price} category={item.CategoryName} group={item.GroupPLU} PLU={item.PLU}/>
                ))}


                <div className={classes.pagination}>
                    <Pagination/>
                </div>
                <ModalAccept visible={isModal} setVisible={setModal} text="Вы уверенны, что хотите изменить фото товара?"/>


            </div>
        </div>
    );
};

export default Products;
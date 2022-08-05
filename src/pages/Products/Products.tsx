import React, {useEffect} from 'react';
import classes from "./Products.module.scss";
import SearchField from "../../components/UI/SearchField/SearchField";
import ButtonBlackEdit from "../../components/UI/Buttons/ButtonBlackEdit/ButtonBlackEdit";
import {useState} from "react";
import ProductListItem from "../../components/ProductListItem/ProductListItem";
import Checkbox from '@mui/material/Checkbox';
import Pagination from "../../components/Pagination/Pagination";
import meat from "./meat.svg";
import tomato from "./tomato.svg";
import ModalAccept from "../../components/UI/Modals/ModalAccept/ModalAccept";
import Chips from "../../components/Chips/Chips";
import {Link} from "react-router-dom";
import axios from '../../services/ApiService';
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";

interface ProductItem {
    Id: number;
    Name: string;
    PLU: string;
    Price: number;
    CategoryName: string | null;
    GroupPLU: number | null;
}

const Products: React.FC = () => {
    const [isLoading, setLoading] = useState(true);

    const [products, setProducts] = useState([

    ])
    const [isModal, setModal] = useState(false);

    const setVisible = () => {
        setModal(true);
    }




    useEffect(() => {
        axios.get("/GetPage?page=1")
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
    const searchProducts = (items: Array<ProductItem>, term: string): Array<ProductItem> => {
        if (term.length === 0) return items;

        return items.filter((item) => {
            return item.Name.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

    const onUpdateSearch = (term: string) => {
        setTerm(term);
    }
    let data: Array<ProductItem> = searchProducts(products, term);

    const setPageNum = (page: number) => {
        axios.get(`/GetPage?page=${page}`)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setProducts(response.data)
                setLoading(false);
                console.log(page)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

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
                    <Pagination setPageNum={setPageNum}/>
                </div>
                <ModalAccept visible={isModal} setVisible={setModal} text="Вы уверенны, что хотите изменить фото товара?"/>
            </div>
        </div>
    );
};

export default Products;
import React, {useEffect, useRef} from 'react';
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
import {Link, useLocation} from "react-router-dom";
import axios from '../../services/ApiService';
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import Tab from "../../components/Tab/Tab";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Swal from "sweetalert2";

interface ProductItem {
    Id: number;
    Name: string;
    PLU: string;
    Price: number;
    CategoryName: string | null;
    GroupPLU: number | null;
    Image: {
        Data: string;
    }
}

const Products: React.FC = () => {
    const [isLoading, setLoading] = useState(true);

    const [products, setProducts] = useState([

    ])
    const [isModal, setModal] = useState(false);
    const [counterWithoutImg, setcounterWithoutImg] = useState(0)
    const [counterChecked, setCounterChecked] = useState(false);
    const [productChecked, setProductChecked] = useState(0);
    const inputFile = useRef<HTMLInputElement | null>(null)


    const setVisible = () => {
        if(productChecked !== 0) {
            setModal(true);
            if (inputFile.current) inputFile.current.click();
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Выберите хотя бы один товар!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const location = useLocation();
    // @ts-ignore
    const marketId = location.state.marketId;



    useEffect(() => {
        console.log(marketId)
        axios.get(`/GetPage?page=1&marketId=${marketId}&GoodsWihoutImage=false`)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setProducts(response.data)
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get(`https://localhost:44302/api/Portal/GetGoodsWithoutImg?marketId=${"D004"}`)
            .then(function (response) {
                setcounterWithoutImg(response.data.length)
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
        axios.get(`/GetPage?page=${page}&marketId=${marketId}&GoodsWihoutImage=false`)
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

    const showGoodsWithoutImg = (marketId: number): void => {
        if (!counterChecked) {
            axios.get(`https://localhost:44302/api/Portal/GetGoodsWithoutImg?marketId=${"D004"}`)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    setProducts(response.data)
                    setLoading(false);
                    setcounterWithoutImg(response.data.length)
                    console.log("srabotalo")
                })
                .catch(function (error) {
                    console.log(error);
                });
            setCounterChecked(true);
        } else {
            setCounterChecked(false)
            setPageNum(1)
        }

    }

    const setCheckedProduct = (Id: number) => {
        if (productChecked === Id){
            setProductChecked(0);
        } else {
            setProductChecked(Id);
        }
        console.log(productChecked);

    }

    const logFiles = (event: Event) => {

    }
    // const setImageToGood = () => {
    //     axios.post(`/SetGoodsImage?image_dto=${}`)
    //         .then(function (response) {
    //             console.log(JSON.stringify(response.data));
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }


    return (
        <div className={classes.page__cont}>
            <input onChange={() =>  console.log("changed")} type='file' id='file' ref={inputFile} style={{display: 'none'}}/>
            <div className={classes.page__title}>Товары: <span className={classes.shop__title}>"Магазин {marketId}"</span></div>
            <div className={classes.nav__btns}>
                <Link style={{ textDecoration: 'none' }} to="/"><Tab styles={{backgroundColor: "#D9D9D9", pointerEvents: "none"}}>Весы</Tab></Link>
                <Link style={{ textDecoration: 'none' }} to="/categories"><Tab styles={{backgroundColor: "#D9D9D9", pointerEvents: "none"}}>Категории</Tab></Link>
                <Link style={{ textDecoration: 'none' }} to="/oldScales"><Tab styles={{backgroundColor: "#D9D9D9", pointerEvents: "none"}}>Старые весы</Tab></Link>
            </div>
            <div className={classes.page__main}>
                <div className={classes.main__top__panel}>
                    <SearchField hint="Начните вводить наименование продукта или его SAPid" onUpdateSearch={onUpdateSearch}/>
                    <div className={classes.top__filter}>
                        <Checkbox onClick={() => showGoodsWithoutImg(marketId)} icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleOutlineIcon />} className={classes.checkbox}/>
                        <div className={classes.top__title}>Показывать товары без фото</div>
                        <div className={classes.top__subtitle}>{counterWithoutImg}</div>
                    </div>

                    <div className={classes.btns__top}>
                        <ButtonBlackEdit onClick={setVisible}/>
                    </div>
                </div>
                <div className={classes.category__title}>
                    <Checkbox/>Овощи
                </div>
                {isLoading ? <LoadingAnimation/> : data.map(item => (
                    <ProductListItem setCheckedProduct={setCheckedProduct} Id ={item.Id} key={item.Id} img={item.Image ? item.Image.Data : tomato} title={item.Name} price={item.Price} category={item.CategoryName} group={item.GroupPLU} PLU={item.PLU}/>
                ))}
                {/*<div className={classes.pagination}>*/}
                {/*    <Pagination setPageNum={setPageNum}/>*/}
                {/*</div>*/}
                <ModalAccept visible={isModal} setVisible={setModal} text="Вы уверенны, что хотите изменить фото товара?"/>
            </div>
        </div>
    );
};

export default Products;
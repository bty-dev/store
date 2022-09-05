import React, {useEffect, useState} from 'react';
import classes from "./ShopsAndScales.module.scss";
import SearchField from "../../components/UI/SearchField/SearchField";
import ButtonBlack from "../../components/UI/Buttons/ButtonBlack/ButtonBlack";
import Accordion from "../../components/Accordion/Accordion";
import {Modal} from "@mui/material";
import ModalChoose from "../../components/UI/Modals/ModalChoose/ModalChoose";
import ButtonBlackEdit from "../../components/UI/Buttons/ButtonBlackEdit/ButtonBlackEdit";
import Pagination from "../../components/Pagination/Pagination";
import Chips from "../../components/Chips/Chips";
import {Link} from "react-router-dom";
import axios from '../../services/ApiService'
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import Tab from "../../components/Tab/Tab";
import Swal from "sweetalert2";

interface ShopItem {
    Id: string;
    MarketCode: null;
    Name: string;
    Address: string;
    Scales: Array<any>;
}

interface ScaleItem {
    Id: number;
    MarketID: string;
    Type: string;
    Number: string;
    IP: string;
    Status: boolean;
    CategoryName: string
}

const ShopsAndScales: React.FC = () => {
    const [isLoading, setLoading] = useState(true);
    const [isModal, setModal] = useState(false);
    const [forceUpdate, setForce] = useState(0);
    const [shops, setShops] = useState([

    ])
    const [isChecked, setChecked] = useState(false)
    const [term, setTerm] = useState("");
    const [marketsIds, setMarketsIds] = useState("")

    const setCheckedState = (code: string) => {
        setChecked(!isChecked)
        setMarketsIds(code)
    }

    const setVisible = () => {
        if (isChecked) {
            setModal(true);
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Выберите хотя бы один магазин!',
                showConfirmButton: false,
                timer: 1500
            })
        }

    }

    const searchShops = (items: Array<ShopItem>, term: string): Array<ShopItem> => {
        if (term.length === 0) return items;

        return items.filter(item => {
            if(item.Name.toLowerCase().indexOf(term.toLowerCase()) > -1) return item.Name.toLowerCase().indexOf(term.toLowerCase()) > -1;
            if(item.Id.toLowerCase().indexOf(term.toLowerCase()) > -1) return item.Id.toLowerCase().indexOf(term.toLowerCase()) > -1;
            return item.Address.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

    const onUpdateSearch = (term: string) => {
        setTerm(term);
    }
    let data = searchShops(shops, term);


    useEffect(() => {
        getMarkets();
    }, [])

    const getMarkets = async () => {
        axios.get('/GetMarkets')
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

    }

    return (
        <div className={classes.page__cont}>
            <div className={classes.page__title}>Магазины и весы</div>
            <div className={classes.nav__btns}>
                <Link style={{ textDecoration: 'none', marginTop: 8}} to="/"><Tab>Весы</Tab></Link>
                <Link style={{ textDecoration: 'none' }} to="/categories"><Tab styles={{backgroundColor: "#D9D9D9", pointerEvents: "none"}}>Категории</Tab></Link>
                <Link style={{ textDecoration: 'none' }} to="/oldScales"><Tab styles={{backgroundColor: "#D9D9D9", pointerEvents: "none"}}>Старые весы</Tab></Link>

            </div>
            <div className={classes.page__main}>
                <div className={classes.main__top__panel}>
                    <SearchField hint="Начните вводить название магазина" onUpdateSearch={onUpdateSearch}/>
                    <div className={classes.btns__top}>
                        <ButtonBlack onClick={setVisible}>Порядок<br/>категорий</ButtonBlack>
                        <Link to={"/categories"}><ButtonBlack>Настроить<br/>категории</ButtonBlack></Link>
                    </div>

                </div>
                {isLoading ? <LoadingAnimation/> : data.map((item) => <Accordion setCheckedState={setCheckedState} title={item.Name} key ={item.MarketCode} code={item.Id} address={item.Address} scales={item.Scales}/>)}
                <ModalChoose marketId={marketsIds} visible={isModal} setVisible={setModal}/>
            </div>
        </div>
    );
};

export default ShopsAndScales;
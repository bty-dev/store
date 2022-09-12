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
import { ShopsAndScalesProps } from '../../App';

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

interface Props {
    userdata?: ShopsAndScalesProps
}

const ShopsAndScales: React.FC<Props> = ({userdata}) => {
    console.log(userdata);
    
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
            return item.Name.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

    const onUpdateSearch = (term: string) => {
        setTerm(term);
    }
    let data = searchShops(shops, term);


    useEffect(() => {
        getMarkets();
    }, [])
    useEffect(() => {
        getMarkets()
    }, [userdata])
    const getMarkets = async () => {
        let response = await axios.get('/GetMarkets')
                console.log(userdata);
                
                if (userdata?.Role == 'admin') {

                    
                    setShops(response.data)
                    
                } else if(userdata?.Role == "user") {
                    let shopsMut = [{
                        Id: "D004", 
                        MarketCode: userdata.Scales[0].MarketID, 
                        Name: userdata.Scales[0].MarketID, 
                        Address: "Ul. Bebender", 
                        Scales: []
                    }]
                    // @ts-ignore
                    setShops(shopsMut)
                }
                setLoading(false)
                console.log(shops)
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
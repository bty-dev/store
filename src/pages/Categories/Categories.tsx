import React, {useEffect, useState} from 'react';
import classes from './Categories.module.scss';
import SearchField from "../../components/UI/SearchField/SearchField";
import ButtonBlack from "../../components/UI/Buttons/ButtonBlack/ButtonBlack";
import Accordion from "../../components/Accordion/Accordion";
import ModalChoose from "../../components/UI/Modals/ModalChoose/ModalChoose";
import CategoriesAccordion from "../../components/CategoriesAccordion/CategoriesAccordion";
import Chips from "../../components/Chips/Chips";
import {Link} from "react-router-dom";
import axios from '../../services/ApiService';
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import Tab from "../../components/Tab/Tab";

interface CategoriesItem {
    Id: number;
    Name: string;
    GroupsPLU: Array<number>;
}

const Categories: React.FC = () => {
    const [isLoading, setLoading] = useState(true);
    const [forceUpdate, setForce] = useState(0);
    const [categories, setCategories] = useState([

    ])
    const [term, setTerm] = useState("");


    const searchShops = (items: Array<CategoriesItem>, term: string): Array<CategoriesItem> => {
        if (term.length === 0) return items;
        let arr = items.map(item => [...item.GroupsPLU])
        console.log(arr)
        let res: string;
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].toString().indexOf(term) > -1) {
                res = items[i].Name;
                console.log(res)
            }
        }


        return items.filter((item) => {
            if (item.Name.toLowerCase().indexOf(res?.toLowerCase()) > -1) return item.Name.toLowerCase().indexOf(res.toLowerCase()) > -1;

        })
    }

    const onUpdateSearch = (term: string) => {
        setTerm(term);
    }
    let data = searchShops(categories, term);


    useEffect(() => {
       getCategoriesAndGroups();
    }, [])

    const getCategoriesAndGroups = async() => {
        axios.get("/GetCategoriesAndGroups")
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setCategories(response.data)
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className={classes.page__cont}>
            <div className={classes.page__title}>Категории</div>
            <div className={classes.nav__btns}>
                <Link style={{ textDecoration: 'none' }} to="/"><Tab styles={{backgroundColor: "#D9D9D9", pointerEvents: "none"}}>Весы</Tab></Link>
                <Link style={{ textDecoration: 'none', marginTop: 8 }} to="/categories"><Tab>Категории</Tab></Link>
                {/*<Link style={{ textDecoration: 'none' }} to="/oldScales"><Tab styles={{backgroundColor: "#D9D9D9", pointerEvents: "none"}}>Старые весы</Tab></Link>*/}
            </div>
            <div className={classes.page__main}>
                <div className={classes.main__top__panel}>
                    <SearchField  hint="Начните вводить код группы" onUpdateSearch={onUpdateSearch}/>
                </div>
                {isLoading ? <LoadingAnimation/> : data.map((item) => <CategoriesAccordion getCategories={getCategoriesAndGroups} title={item.Name} groups={item.GroupsPLU} key ={item.Id}/>)}
            </div>
        </div>
    );
};

export default Categories;
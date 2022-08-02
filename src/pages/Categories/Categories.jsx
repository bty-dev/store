import React, {useEffect, useState} from 'react';
import classes from './Categories.module.css';
import SearchField from "../../components/UI/SearchField/SearchField";
import ButtonBlack from "../../components/UI/Buttons/ButtonBlack/ButtonBlack";
import Accordion from "../../components/Accordion/Accordion";
import ModalChoose from "../../components/UI/Modals/ModalChoose/ModalChoose";
import CategoriesAccordion from "../../components/CategoriesAccordion/CategoriesAccordion";
import Chips from "../../components/Chips/Chips";
import {Link} from "react-router-dom";
import axios from '../../services/ApiService';
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";



const Categories = () => {
    const [isLoading, setLoading] = useState(true);
    const [forceUpdate, setForce] = useState(0);
    const [categories, setCategories] = useState([

    ])
    const [term, setTerm] = useState("");


    const searchShops = (items, term) => {
        if (term.length === 0) return items;

        return items.filter(item => {
            return item.Name.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

    const onUpdateSearch = (term) => {
        setTerm(term);
    }
    let data = searchShops(categories, term);


    useEffect(() => {
        axios.get("/GetCategoriesAndGroups")
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setCategories(response.data)
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    return (
        <div className={classes.page__cont}>
            <div className={classes.page__title}>Категории</div>
            <div className={classes.nav__btns}>
                <Link style={{ textDecoration: 'none' }} to="/"><Chips>Весы</Chips></Link>
                <Link to="/categories"><Chips>Категории</Chips></Link>
            </div>
            <div className={classes.page__main}>
                <div className={classes.main__top__panel}>
                    <SearchField hint="Начните вводить название категории" onUpdateSearch={onUpdateSearch}/>

                </div>
                {isLoading ? <LoadingAnimation/> : data.map((item) => <CategoriesAccordion title={item.Name} groups={item.GroupsPLU} key ={item.Id}/>)}

            </div>

        </div>
    );
};

export default Categories;
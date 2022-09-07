import React from 'react';
import classes from "./ProductListItem.module.scss";
import Checkbox from '@mui/material/Checkbox';
import thumbnail from "./tomato.svg";
import Chips from "../Chips/Chips";
import image_not_found from './image_not_found.png';
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface ProductListItemProps {
    Id: number;
    img: string;
    title: string;
    price: number;
    category: string | null;
    group: number | null;
    PLU: string;
    setCheckedProduct: Function;
}



const ProductListItem: React.FC<ProductListItemProps> = ({Id, img, title, price, category, group, PLU, setCheckedProduct}) => {
    function numberWithCommas(x: number) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    let priceView = numberWithCommas(price * 1000);
    return (
        <div className={classes.container}>
            <Checkbox onClick={() => setCheckedProduct(Id)} icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleOutlineIcon />}/>
            <div className={classes.main}>
                <img className={classes.thumb} src={`data:image/png;base64,${img}`} alt=""/>
                <div className={classes.product__title__block}>
                    <div className={classes.product__title__first__price}>{title.length > 50 ? `${title.substring(0, 50)}...` : title}</div>
                    <div className={classes.product__subtitle}>{PLU}</div>
                </div>
                <div className={classes.product__price__block}>
                    <div className={classes.product__price}>Цена</div>
                    <div className={classes.product__price__sub}>{priceView} Сум/кг</div>
                </div>
                <div className={classes.product__category}>
                    <div className={classes.product__title}>Категория</div>
                    <Chips>{category === null ? "Не указана" : category}</Chips>
                </div>
                <div className={classes.product__group}>
                    <div className={classes.product__title}>Группа</div>
                    <Chips>{group === null ? "Не указана" : group}</Chips>

                </div>
            </div>
        </div>
    );
};

export default ProductListItem;
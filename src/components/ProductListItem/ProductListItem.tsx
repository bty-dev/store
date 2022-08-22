import React from 'react';
import classes from "./ProductListItem.module.scss";
import Checkbox from '@mui/material/Checkbox';

import thumbnail from "./thumbnail.svg";
import Chips from "../Chips/Chips";

interface ProductListItemProps {
    img: string;
    title: string;
    price: number;
    category: string | null;
    group: number | null;
    PLU: string;
}



const ProductListItem: React.FC<ProductListItemProps> = ({img, title, price, category, group, PLU}) => {
    
    return (
        <div className={classes.container}>
            <Checkbox/>
            <div className={classes.main}>
                <img className={classes.thumb} src={img} alt="logo"/>
                <div className={classes.product__title__block}>
                    <div className={classes.product__title__first}>{title.length > 10 ? `${title.substring(0, 7)}...` : title}</div>
                    <div className={classes.product__subtitle}>{PLU}</div>
                </div>
                <div className={classes.product__price__block}>
                    <div className={classes.product__price}>Цена</div>
                    <div className={classes.product__price__sub}>{price} ₽/кг</div>
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
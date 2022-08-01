import React, {useState} from 'react';
import classes from "./SearchField.module.css";

import loup from './loup.svg'

const SearchField = (props) => {
    const [term, setTerm] = useState("");

    const onUpdateSearch = (e) => {
        const term = e.target.value;
        setTerm(term);
        props.onUpdateSearch(term);
    }



    return (
        <div className={classes.container}>
            <img className={classes.icon} src={loup} alt="loup"/>
            <input
                placeholder={props.hint}
                className={classes.field}
                type="text"
                value={term}
                onChange={onUpdateSearch}
            />
        </div>
    );
};

export default SearchField;
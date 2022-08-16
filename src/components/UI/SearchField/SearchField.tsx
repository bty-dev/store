import React, {useState, SyntheticEvent} from 'react';
// import React, { Component, SyntheticEvent } from 'react';
import classes from "./SearchField.module.scss";

import loup from './loup.svg'

const SearchField = ({...props}) => {
    const [term, setTerm] = useState("");

    const onUpdateSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const term = (e.target as HTMLInputElement).value ;
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
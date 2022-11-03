import React, { useEffect, useState } from "react";
import classes from "./Categories.module.scss";
import SearchField from "../../components/UI/SearchField/SearchField";
import ButtonBlack from "../../components/UI/Buttons/ButtonBlack/ButtonBlack";
import Accordion from "../../components/Accordion/Accordion";
import ModalChoose from "../../components/UI/Modals/ModalChoose/ModalChoose";
import CategoriesAccordion from "../../components/CategoriesAccordion/CategoriesAccordion";
import Chips from "../../components/Chips/Chips";
import { Link } from "react-router-dom";
import axios from "../../services/ApiService";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import Tab from "../../components/Tab/Tab";
import GroupAccordion from "../../components/GroupAccordion/GroupAccordion";

interface CategoriesItem {
  id: number;
  name: string;
  groupsPLU: Array<number>;
  groupSAP?: string;
}

interface GroupsItem {
  id: number;
  groupSAP: string;
  categoryRuName: string;
}

const Categories: React.FC = () => {
  const [isLoading, setLoading] = useState(true);

  const [categories, setCategories] = useState<CategoriesItem[]>([]);
  const [term, setTerm] = useState("");

  const [groups, setGroups] = useState([
    { id: 1, groupSAP: "235234", categoryRuName: "Рыба" },
  ]);

  const [isGroupsSearching, setGroupsSearching] = useState(false);

  // const searchShops = (items: Array<CategoriesItem>, term: string): Array<CategoriesItem> => {
  //     if (term.length === 0) return items;
  //     let arr = items.map(item => [...item.groupsPLU])
  //     console.log(arr)
  //     let res: string;
  //     for (let i = 0; i < arr.length; i++) {
  //         if(arr[i].toString().indexOf(term) > -1) {
  //             res = items[i].name;
  //             console.log(res)
  //         }
  //     }
  //
  //
  //     return items.filter((item) => {
  //         if (item.name.toLowerCase().indexOf(res?.toLowerCase()) > -1) return item.name.toLowerCase().indexOf(res.toLowerCase()) > -1;
  //
  //     })
  // }
  const getCategoriesAndGroups = async () => {
    axios
      .get("/GetCategoriesAndGroups", {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiIxNjMzMGQyZS1mODVmLTRkODgtYjU5NS1lMjUxYzdlMjY4M2QiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9jMzY5YTQ0Ny0zMmViLTQzYWEtYTk0My04OWE4YzJiNDY3YWMvIiwiaWF0IjoxNjY3Mzc4NTM5LCJuYmYiOjE2NjczNzg1MzksImV4cCI6MTY2NzM4MzQwMSwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQWM1U0dRM0NweUUwRWtucDlGdUQyNklCMGExcFA0bWJpL0lXVFZ0YVFIVU5xOUszM0s1ekFTVlBqb3JWTk8vZVciLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMTYzMzBkMmUtZjg1Zi00ZDg4LWI1OTUtZTI1MWM3ZTI2ODNkIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiLQn9C-0YDRgtCw0LvQsCAyIiwiZ2l2ZW5fbmFtZSI6ItCg0LDQt9GA0LDQsdC-0YLRh9C40LoiLCJpcGFkZHIiOiIxODUuNzYuODIuMyIsIm5hbWUiOiLQoNCw0LfRgNCw0LHQvtGC0YfQuNC6INCf0L7RgNGC0LDQu9CwIDIiLCJvaWQiOiI1ZjhmYjBmOC1lZTBlLTQ1YWYtOTQ1ZC1jMWU1Y2JiZGJkZmIiLCJyaCI6IjAuQVF3QVI2UnB3LXN5cWtPcFE0bW93clJuckM0Tk14WmYtSWhOdFpYaVVjZmlhRDBNQUk0LiIsInNjcCI6Im9mZmxpbmVfYWNjZXNzIG9wZW5pZCBwcm9maWxlIFVzZXIuUmVhZCIsInN1YiI6Ik5vR21kYzlaNkREbmRhcHU3SHYzQ3pRcWw4ZVdyZnpWRDZLMUNzZDhtcVEiLCJ0aWQiOiJjMzY5YTQ0Ny0zMmViLTQzYWEtYTk0My04OWE4YzJiNDY3YWMiLCJ1bmlxdWVfbmFtZSI6ImRldnBvcnRhbDJAcHJvZG1hZy5jb20iLCJ1cG4iOiJkZXZwb3J0YWwyQHByb2RtYWcuY29tIiwidXRpIjoiY3U0dVNVTzVNa09qSFh6N2ZaQU9BQSIsInZlciI6IjEuMCJ9.AT-LBsZTFU0v6HwOtLQ_Xzud7Bt0L7P5DeLE8CNP4n0wK0aQK6VW7ZnHquBE20kroXlS_wr10mVsuFCf3LsUxymJS-kTN0sO02khE3OJI3g8mYuc4zYvplNoEI51cbRMr9_328vdDVuCT4Sv3iKgNuiFdVhyhkMxJo9O0wRJFOrpXwTp7Pi_jf0r6VJf8wSRtU23cjIQjFR_zdzJP3IG_7TqNUa3F3vlu1BYfD2xrBqEkOlQmyOf51ebL9J0xSbbKdt1y1XjfyoXnc2ceIkHzYcVtNwt_G6BX-D0CM-bMylqgAauVR9Rzamsu7gv9dXPDUjAtxNACx3XxWMx7FDFaw`,
        },
      })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setCategories(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getGroups = async () => {
    axios
      .get("/GetGroupCategories", {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiIxNjMzMGQyZS1mODVmLTRkODgtYjU5NS1lMjUxYzdlMjY4M2QiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9jMzY5YTQ0Ny0zMmViLTQzYWEtYTk0My04OWE4YzJiNDY3YWMvIiwiaWF0IjoxNjY3Mzc4NTM5LCJuYmYiOjE2NjczNzg1MzksImV4cCI6MTY2NzM4MzQwMSwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQWM1U0dRM0NweUUwRWtucDlGdUQyNklCMGExcFA0bWJpL0lXVFZ0YVFIVU5xOUszM0s1ekFTVlBqb3JWTk8vZVciLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMTYzMzBkMmUtZjg1Zi00ZDg4LWI1OTUtZTI1MWM3ZTI2ODNkIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiLQn9C-0YDRgtCw0LvQsCAyIiwiZ2l2ZW5fbmFtZSI6ItCg0LDQt9GA0LDQsdC-0YLRh9C40LoiLCJpcGFkZHIiOiIxODUuNzYuODIuMyIsIm5hbWUiOiLQoNCw0LfRgNCw0LHQvtGC0YfQuNC6INCf0L7RgNGC0LDQu9CwIDIiLCJvaWQiOiI1ZjhmYjBmOC1lZTBlLTQ1YWYtOTQ1ZC1jMWU1Y2JiZGJkZmIiLCJyaCI6IjAuQVF3QVI2UnB3LXN5cWtPcFE0bW93clJuckM0Tk14WmYtSWhOdFpYaVVjZmlhRDBNQUk0LiIsInNjcCI6Im9mZmxpbmVfYWNjZXNzIG9wZW5pZCBwcm9maWxlIFVzZXIuUmVhZCIsInN1YiI6Ik5vR21kYzlaNkREbmRhcHU3SHYzQ3pRcWw4ZVdyZnpWRDZLMUNzZDhtcVEiLCJ0aWQiOiJjMzY5YTQ0Ny0zMmViLTQzYWEtYTk0My04OWE4YzJiNDY3YWMiLCJ1bmlxdWVfbmFtZSI6ImRldnBvcnRhbDJAcHJvZG1hZy5jb20iLCJ1cG4iOiJkZXZwb3J0YWwyQHByb2RtYWcuY29tIiwidXRpIjoiY3U0dVNVTzVNa09qSFh6N2ZaQU9BQSIsInZlciI6IjEuMCJ9.AT-LBsZTFU0v6HwOtLQ_Xzud7Bt0L7P5DeLE8CNP4n0wK0aQK6VW7ZnHquBE20kroXlS_wr10mVsuFCf3LsUxymJS-kTN0sO02khE3OJI3g8mYuc4zYvplNoEI51cbRMr9_328vdDVuCT4Sv3iKgNuiFdVhyhkMxJo9O0wRJFOrpXwTp7Pi_jf0r6VJf8wSRtU23cjIQjFR_zdzJP3IG_7TqNUa3F3vlu1BYfD2xrBqEkOlQmyOf51ebL9J0xSbbKdt1y1XjfyoXnc2ceIkHzYcVtNwt_G6BX-D0CM-bMylqgAauVR9Rzamsu7gv9dXPDUjAtxNACx3XxWMx7FDFaw`,
        },
      })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setGroups(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const searchShops = (
    items: Array<GroupsItem>,
    term: string
  ): Array<GroupsItem> => {
    // let arr = items.map(item => item.groupSAP)
    // console.log(arr)
    // let res: string;
    // for (let i = 0; i < arr.length; i++) {
    //
    //     if(arr[i].indexOf(term) > -1) {
    //
    //         res = items[i].groupSAP;
    //         console.log(res)
    //     }
    // }

    return items.filter((item) => {
      if (item.groupSAP.indexOf(term.toLowerCase()) > -1)
        return item.groupSAP.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  };

  const onUpdateSearch = (term: string) => {
    setTerm(term);
  };

  let data = searchShops(groups, term);

  useEffect(() => {
    getCategoriesAndGroups();
    getGroups();
  }, []);

  return (
    <div className={classes.page__cont}>
      <div className={classes.page__title}>Категории</div>
      <div className={classes.nav__btns}>
        <Link style={{ textDecoration: "none" }} to="/">
          <Tab styles={{ backgroundColor: "#D9D9D9", pointerEvents: "none" }}>
            Весы
          </Tab>
        </Link>
        <Link style={{ textDecoration: "none", marginTop: 8 }} to="/categories">
          <Tab>Категории</Tab>
        </Link>
        {/*<Link style={{ textDecoration: 'none' }} to="/oldScales"><Tab styles={{backgroundColor: "#D9D9D9", pointerEvents: "none"}}>Старые весы</Tab></Link>*/}
      </div>
      <div className={classes.page__main}>
        <div className={classes.main__top__panel}>
          <SearchField
            hint="Начните вводить код группы"
            onUpdateSearch={onUpdateSearch}
          />
        </div>
        {isLoading ? (
          <LoadingAnimation />
        ) : term.length !== 0 ? (
          data.map((item, index) => (
            <GroupAccordion
              getCategories={getCategoriesAndGroups}
              key={index}
              id={item.id}
              groupSAP={item.groupSAP}
              categoryRuName={item.categoryRuName}
            />
          ))
        ) : (
          categories.map((item) => (
            <CategoriesAccordion
              getCategories={getCategoriesAndGroups}
              title={item.name}
              groups={item.groupsPLU}
              key={item.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;

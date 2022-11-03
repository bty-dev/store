import React, { useEffect, useState } from "react";
import classes from "./ShopsAndScales.module.scss";
import SearchField from "../../components/UI/SearchField/SearchField";
import ButtonBlack from "../../components/UI/Buttons/ButtonBlack/ButtonBlack";
import Accordion from "../../components/Accordion/Accordion";
import { Modal } from "@mui/material";
import ModalChoose from "../../components/UI/Modals/ModalChoose/ModalChoose";
import ButtonBlackEdit from "../../components/UI/Buttons/ButtonBlackEdit/ButtonBlackEdit";
import Pagination from "../../components/Pagination/Pagination";
import Chips from "../../components/Chips/Chips";
import { Link } from "react-router-dom";
import axios from "../../services/ApiService";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import Tab from "../../components/Tab/Tab";
import Swal from "sweetalert2";
import { ShopsAndScalesProps } from "../../App";

interface ShopItem {
  id: string;
  marketCode: null;
  name: string;
  address: string;
  scales: Array<any>;
}

interface ScaleItem {
  Id: number;
  MarketID: string;
  Type: string;
  Number: string;
  IP: string;
  Status: boolean;
  CategoryName: string;
}

interface Props {
  userdata?: ShopsAndScalesProps;
}

const ShopsAndScales: React.FC<Props> = ({ userdata }) => {
  const token = localStorage.getItem("token3");
  const [isLoading, setLoading] = useState(true);
  const [isModal, setModal] = useState(false);
  const [forceUpdate, setForce] = useState(0);
  const [shops, setShops] = useState([]);
  const [isChecked, setChecked] = useState(false);
  const [term, setTerm] = useState("");
  const [marketsIds, setMarketsIds] = useState("");

  const setCheckedState = (code: string) => {
    setChecked(!isChecked);
    setMarketsIds(code);
  };

  const setVisible = () => {
    if (isChecked) {
      setModal(true);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Выберите хотя бы один магазин!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const searchShops = (
    items: Array<ShopItem>,
    term: string
  ): Array<ShopItem> => {
    if (term.length === 0) return items;

    return items.filter((item) => {
      if (item.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
        return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
      if (item.id.toLowerCase().indexOf(term.toLowerCase()) > -1)
        return item.id.toLowerCase().indexOf(term.toLowerCase()) > -1;
      return item.address.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  };

  const onUpdateSearch = (term: string) => {
    setTerm(term);
  };
  let data = searchShops(shops, term);

  const getToken = async () => {
    console.log("GET TOKEN");

    let config = {
      method: "GET",
      url: "https://login.microsoftonline.com/c369a447-32eb-43aa-a943-89a8c2b467ac/oauth2/authorize?client_id=16330d2e-f85f-4d88-b595-e251c7e2683d&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A7158%2Fsignin-oidc&resource=16330d2e-f85f-4d88-b595-e251c7e2683d&response_mode=fragment&state=12345&nonce=678910",
      headers: {
        Connection: "keep-alive",
        "Accept-Encoding": "gzip,deflate,br",
        Accept: "*/*",
        "User-Agent": "PostmanRuntime/7.29.2",
        Host: "login.microsoftonline.com",
        "Access-Control-Allow-Origin": "*",
      },
    };

    await axios.request(config).then((response) => {
      console.log("get token response - ", response);
    });

    // await axios
    //   .get(
    //     "https://login.microsoftonline.com/c369a447-32eb-43aa-a943-89a8c2b467ac/oauth2/authorize?client_id=16330d2e-f85f-4d88-b595-e251c7e2683d&response_type=token&redirect_uri=http://localhost:3000/&resource=16330d2e-f85f-4d88-b595-e251c7e2683d&response_mode=fragment&state=12345&nonce=678910",
    //     {
    //       headers: {
    //         "Access-Control-Allow-Origin": "*",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log("get token response - ", response);
    //   });
  };

  useEffect(() => {
    getMarkets();
    getToken();
  }, []);

  useEffect(() => {
    getMarkets();
    getToken();
  }, [userdata]);

  const getMarkets = async () => {
    axios
      .get("/GetMarkets", {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiIxNjMzMGQyZS1mODVmLTRkODgtYjU5NS1lMjUxYzdlMjY4M2QiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9jMzY5YTQ0Ny0zMmViLTQzYWEtYTk0My04OWE4YzJiNDY3YWMvIiwiaWF0IjoxNjY3Mzk2NzY0LCJuYmYiOjE2NjczOTY3NjQsImV4cCI6MTY2NzQwMTQwOSwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQUoxQnFqUW00M2hybzlRNVp0aktIZ2hvaENhR3lpME54NkUyUHIwYURoU2UrTTN0clN5TTdYVWEzVUpxdThOK1UiLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMTYzMzBkMmUtZjg1Zi00ZDg4LWI1OTUtZTI1MWM3ZTI2ODNkIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiLQn9C-0YDRgtCw0LvQsCAyIiwiZ2l2ZW5fbmFtZSI6ItCg0LDQt9GA0LDQsdC-0YLRh9C40LoiLCJpcGFkZHIiOiIxODUuNzYuODIuMyIsIm5hbWUiOiLQoNCw0LfRgNCw0LHQvtGC0YfQuNC6INCf0L7RgNGC0LDQu9CwIDIiLCJvaWQiOiI1ZjhmYjBmOC1lZTBlLTQ1YWYtOTQ1ZC1jMWU1Y2JiZGJkZmIiLCJyaCI6IjAuQVF3QVI2UnB3LXN5cWtPcFE0bW93clJuckM0Tk14WmYtSWhOdFpYaVVjZmlhRDBNQUk0LiIsInNjcCI6Im9mZmxpbmVfYWNjZXNzIG9wZW5pZCBwcm9maWxlIFVzZXIuUmVhZCIsInN1YiI6Ik5vR21kYzlaNkREbmRhcHU3SHYzQ3pRcWw4ZVdyZnpWRDZLMUNzZDhtcVEiLCJ0aWQiOiJjMzY5YTQ0Ny0zMmViLTQzYWEtYTk0My04OWE4YzJiNDY3YWMiLCJ1bmlxdWVfbmFtZSI6ImRldnBvcnRhbDJAcHJvZG1hZy5jb20iLCJ1cG4iOiJkZXZwb3J0YWwyQHByb2RtYWcuY29tIiwidXRpIjoiR0VHYnYxV0RxVW1oeUxVNlZpc1pBQSIsInZlciI6IjEuMCJ9.lHGsY8yb1sxuoG2xHDcbIwvKJBi8jjIO7bnEkKSkdFci_KaPlINKvI25moESNlQTwLy9rKuIqrSX7tLG2UA-vIulBOeLZYENDe0tYiHaOJFd98k7-DCPoWG5Vc8T5uLMr8XAlVr5ljaOFJ5xvtNxjMft_ch4lWBwFC9OecxW6iN-GfHvrjnugdkwZaK_l0s6-SKrgqhE-0H0C6IOco7RebFgY29NNbE7W4kTBREXAK8Lh5yMpwV_GDdGXllrufYYxz-tfG5ZJXBEsLXVtCSm7YAxraN1-l39BNftOpnHQvc2rJnK7DGKKNCbYLKuJlFC-NSflF8u4H_nqdBdeLsGGA`,
        },
      })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setShops(response.data);
        setLoading(false);
        console.log(shops);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const setDefaultCategory = async () => {};

  return (
    <div className={classes.page__cont}>
      <div className={classes.page__title}>
        Магазины и весы {userdata?.Role}
      </div>
      <div className={classes.nav__btns}>
        <Link style={{ textDecoration: "none", marginTop: 8 }} to="/">
          <Tab>Весы</Tab>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/categories">
          <Tab styles={{ backgroundColor: "#D9D9D9", pointerEvents: "none" }}>
            Категории
          </Tab>
        </Link>
        {/*<Link style={{ textDecoration: 'none' }} to="/oldScales"><Tab styles={{backgroundColor: "#D9D9D9", pointerEvents: "none"}}>Старые весы</Tab></Link>*/}
      </div>
      <div className={classes.page__main}>
        <div className={classes.main__top__panel}>
          <SearchField
            hint="Начните вводить код/название/адрес магазина"
            onUpdateSearch={onUpdateSearch}
          />
          <div className={classes.btns__top}>
            <ButtonBlack onClick={setVisible}>
              Порядок
              <br />
              категорий
            </ButtonBlack>
            <Link to={"/categories"}>
              <ButtonBlack>
                Настроить
                <br />
                категории
              </ButtonBlack>
            </Link>
          </div>
        </div>
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          data.map((item) => (
            <Accordion
              setCheckedState={setCheckedState}
              title={item.name}
              key={item.marketCode}
              code={item.id}
              address={item.address}
              scales={item.scales}
            />
          ))
        )}
        <ModalChoose
          marketId={marketsIds}
          visible={isModal}
          setVisible={setModal}
        />
      </div>
    </div>
  );
};

export default ShopsAndScales;

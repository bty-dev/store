import axios from 'axios';

const BASE_URL: string = "https://localhost:44302/api/Portal";

export default axios.create({
    baseURL: BASE_URL
})

//Есть пару вопросов по работе с внешними стейтами, посоветуюсь с Владом

export const getMarkets = async () => {
    axios.get("/GetMarkets")
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}
export const getGoods = async () => {
    axios.get("/GetGoods")
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}
export const getGategoriesAndGroups = async () => {
    axios.get("/GetCategoriesAndGroups")
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
            let a = 2
        });
}
export const setDefaultCategory = async (scaleId: number, categoryId: number) => {
    axios.post("/SetDefaultCategory", {scaleId, categoryId})
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}
export const setGroupCategory = async (groupId: number, categoryId: number) => {
    axios.post("/SetGroupCategory", {groupId, categoryId})
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}
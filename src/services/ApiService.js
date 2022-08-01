import axios from 'axios';

const BASE_URL = "";

export default axios.create({
    baseURL: BASE_URL
})
import axios from 'axios';

export default axios.create({
    //baseURL: 'https://hfp-inventory-app-v2.herokuapp.com/',
    baseURL: 'http://192.168.3.10:8080/',
    headers: {
        'Content-Type': 'application/json',
    }
})
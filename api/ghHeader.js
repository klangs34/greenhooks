import axios from 'axios';

export default axios.create({
    //baseURL: 'https://gh-rest-server-fab9388b49eb.herokuapp.com/',
    baseURL: 'http://192.168.3.10:8080/',
    headers: {
        'Content-Type': 'application/json',
    }
})
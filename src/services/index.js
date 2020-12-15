
import axios from 'axios';
import {baseURL} from './Config';
import services from './Services'; 
import { Alert } from 'react-native';
/**
* Set baseUrl to axios.
*/
axios.defaults.baseURL = baseURL;

axios.interceptors.response.use(
    response => {
        if (response.status != 200) {
            return Promise.reject(response);
        }
        return response;
    },
    error => { 
        Alert.alert(error.message);
        return Promise.reject(error.response || error.message)
    }
);
export { services };
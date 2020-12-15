import { post, get } from "axios";

export default class Services {
    static signup = (data) => post(`/users/create/`, data);
    static login = (data) => get(`/users/create/`, data);
}



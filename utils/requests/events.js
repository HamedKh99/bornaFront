import axios from 'axios';
import { HAFTKHAN_PRE, HAFTKHAN_SIGNUP } from '../api';

export function getHaftkhanPre() {
    return axios.get(HAFTKHAN_PRE)
}

export function postHaftkhanSignup(data) {
    return axios.post(HAFTKHAN_SIGNUP, data, {
        headers : {
            'Content-Type': 'application/json',
            'WWW-Authenticate' : 'Basic'
        }
    })
}
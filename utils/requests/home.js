import axios from 'axios';
import { HOME } from '../api';

export function getHomepage() {
    return axios.get(HOME)
}
import axios from 'axios'
import Echo from "laravel-echo";
import {Cookies} from 'quasar'

window.Pusher = require('pusher-js');

let server = window.location.hostname === 'web.20x80.one' ? 'https://backend.20x80.one' : 'https://bis.zdato.ru';
const port = window.location.hostname === 'web.20x80.one' ? 6001 : 3030;

export const apiClient = axios.create({
  baseURL: server + `/api`,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
})



import axios from 'axios'
import baseURL from '../services/server'

var http = axios.create({
  // baseURL: 'https://some-domain.com/api/',
  baseURL,
  timeout: 6000,
  headers: {'X-Custom-Header': 'heeaader'}
});

export default {
    http
}
import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:8000/user'})



export const signIn = (formData)=>API.post('/',formData);
export const signUp = (formData)=>API.post('/',formData);
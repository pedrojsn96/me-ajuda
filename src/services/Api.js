import axios from 'axios';

const Api = axios.create({
	baseURL: 'https://me-ajuda.herokuapp.com/api',
});

export default Api;
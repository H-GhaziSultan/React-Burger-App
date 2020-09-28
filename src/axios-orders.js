import axios from 'axios';

const instance=axios.create({
    baseURL:'https://react-burger-app-ec13d.firebaseio.com/'
});

export default instance;
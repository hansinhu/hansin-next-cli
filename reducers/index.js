import { combineReducers } from 'redux'
import {home} from './home';
import {detail} from './detail';
import {products} from './products';
import {headers} from './headers';
import {loading} from './loading';
import {company} from './company';
import {contact} from './contact';
const Reducers = combineReducers({
    home,
    detail,
    products,
    headers,
    loading,
    company,
    contact
});
export default Reducers
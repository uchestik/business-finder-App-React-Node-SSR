import { combineReducers } from 'redux';
import businesses from './business_reducer'
import { reducer as formReducer } from 'redux-form';


const rootreducer = combineReducers({
    businesses,
    form:formReducer
})

export default rootreducer;
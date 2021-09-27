import {combineReducers} from 'redux'
import {profileReducer} from './profile'

export const rootReducer =combineReducers({
    Words:profileReducer
})
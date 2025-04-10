import {combineReducers} from '@ngrx/store';
import {headerInfoReducer} from './headerInfo/headerInfo.reducer';

export const rootReducer = combineReducers({
  headerInfo:headerInfoReducer
})

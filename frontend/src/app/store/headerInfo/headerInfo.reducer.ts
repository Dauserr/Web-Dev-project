import {createReducer, on} from '@ngrx/store';
import {headerInfoActions} from './headerInfo.actions';

export interface UserInfo {
  user_name?: string;
  user_phoneNumber?: string;
  user_fullName?: string;
  user_description?: string;
}

interface State{
  userInfo:UserInfo
}

export const initialState: State = {
  userInfo:{
    user_name:'',
    user_phoneNumber:'',
    user_fullName:'' ,
    user_description:''
  }
}

export const headerInfoReducer = createReducer(
  initialState,
  on(headerInfoActions.setCurrentUserInfo, (state, {userinfo})  => ({
    ...state,
    userInfo: userinfo,
  }))
)

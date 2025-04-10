import { createActionGroup, props } from '@ngrx/store';
import {UserInfo} from './headerInfo.reducer';

export const headerInfoActions = createActionGroup({
  source:'headerInfo',
  events:{ 
    'Set Current User Info': props<{ userinfo: UserInfo }>()
  }
})

import {combineReducers} from 'redux';

import {rootReducer} from 'src/root';
import {userReducer} from 'src/modules/user';

const reducer = combineReducers({
  root: rootReducer,
  user: userReducer,
});

export default reducer;

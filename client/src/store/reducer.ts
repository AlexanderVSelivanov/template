import {combineReducers} from 'redux';

import {rootReducer} from 'src/store/root';
import {userReducer} from 'src/store/modules/user';

const reducer = combineReducers({
  root: rootReducer,
  user: userReducer,
});

export default reducer;

import {reducer} from 'src/store';
import {StateType as GetStateType} from 'typesafe-actions';

type StateType = GetStateType<typeof reducer>;

export default StateType;

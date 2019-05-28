import {notifyCreator} from './types';
import Notification from '../types/Notification';

export const notifyAction = notifyCreator<Notification>();

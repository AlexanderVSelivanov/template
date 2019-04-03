/**
 * This file auto generated by script. Do not change it manually!!!
 * @see scripts/generateActionType.ts
 *
 */

import {createStandardAction, createAsyncAction} from 'typesafe-actions';

const USER_LOGIN_REQUEST = '@USER/LOGIN/REQUEST';
const USER_LOGIN_SUCCESS = '@USER/LOGIN/SUCCESS';
const USER_LOGIN_FAILURE = '@USER/LOGIN/FAILURE';
export const loginCreator = createAsyncAction(
   USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE,
);
const USER_GET_USER_REQUEST = '@USER/GET_USER/REQUEST';
const USER_GET_USER_SUCCESS = '@USER/GET_USER/SUCCESS';
const USER_GET_USER_FAILURE = '@USER/GET_USER/FAILURE';
export const getUserCreator = createAsyncAction(
   USER_GET_USER_REQUEST, USER_GET_USER_SUCCESS, USER_GET_USER_FAILURE,
);
const USER_GET_USER_BY_ID = '@USER/GET_USER_BY_ID';
export const getUserByIdCreator = createStandardAction(USER_GET_USER_BY_ID);

/**
 * This file auto generated by script. Do not change it manually!!!
 * @see scripts/generateActionType.ts
 *
 */

/* eslint-disable */

import {createStandardAction, createAsyncAction} from 'typesafe-actions';

const ACCOUNT_LOGIN_REQUEST = '@ACCOUNT/LOGIN/REQUEST';
const ACCOUNT_LOGIN_SUCCESS = '@ACCOUNT/LOGIN/SUCCESS';
const ACCOUNT_LOGIN_FAILURE = '@ACCOUNT/LOGIN/FAILURE';
export const loginCreator = createAsyncAction(
   ACCOUNT_LOGIN_REQUEST, ACCOUNT_LOGIN_SUCCESS, ACCOUNT_LOGIN_FAILURE,
);
const ACCOUNT_LOGOUT_REQUEST = '@ACCOUNT/LOGOUT/REQUEST';
const ACCOUNT_LOGOUT_SUCCESS = '@ACCOUNT/LOGOUT/SUCCESS';
const ACCOUNT_LOGOUT_FAILURE = '@ACCOUNT/LOGOUT/FAILURE';
export const logoutCreator = createAsyncAction(
   ACCOUNT_LOGOUT_REQUEST, ACCOUNT_LOGOUT_SUCCESS, ACCOUNT_LOGOUT_FAILURE,
);
const ACCOUNT_GET_ACCOUNT_USER_REQUEST = '@ACCOUNT/GET_ACCOUNT_USER/REQUEST';
const ACCOUNT_GET_ACCOUNT_USER_SUCCESS = '@ACCOUNT/GET_ACCOUNT_USER/SUCCESS';
const ACCOUNT_GET_ACCOUNT_USER_FAILURE = '@ACCOUNT/GET_ACCOUNT_USER/FAILURE';
export const getAccountUserCreator = createAsyncAction(
   ACCOUNT_GET_ACCOUNT_USER_REQUEST, ACCOUNT_GET_ACCOUNT_USER_SUCCESS, ACCOUNT_GET_ACCOUNT_USER_FAILURE,
);
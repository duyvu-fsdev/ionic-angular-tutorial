import { Action, createAction, createReducer, on, props } from '@ngrx/store';
import { LoginInfor, User } from 'src/app/models/user';

export interface AuthState {
 isRegistering: boolean;
 isregistered: boolean;
 loginInfor: LoginInfor | null;
 errorRegister: any;

 isLoggingIn: boolean;
 isLoggedIn: boolean;
 currentUser: User | null;
 errorLogin: any;

 isRequestingPwReset: boolean;
 isRequestedPwReset: boolean;
 messReqPwReset: string | null;
 errorReqPwReset: any;

 isResettingPw: boolean;
 isResetPw: boolean;
 messResetPw: string | null;
 errorResetPw: any;
}

export const register = createAction('[auth] register');
export const registerSuccess = createAction('[auth] register success', props<{ loginInfor: LoginInfor }>());
export const registerFail = createAction('[auth] register fail', props<{ errorRegister: any }>());

export const login = createAction('[auth] login');
export const loginSuccess = createAction('[auth] login success', props<{ currentUser: User }>());
export const loginFail = createAction('[auth] login fail', props<{ errorLogin: any }>());

export const reqPwReset = createAction('[auth] req pw reset');
export const reqPwResetSuccess = createAction('[auth] req pw reset success', props<{ messReqPwReset: string }>());
export const reqPwResetFail = createAction('[auth] req pw reset fail', props<{ errorReqPwReset: any }>());

export const resetPw = createAction('[auth] reset password');
export const resetPwSuccess = createAction('[auth] reset password success', props<{ messResetPw: string }>());
export const resetPwFail = createAction('[auth] reset password fail', props<{ errorResetPw: any }>());

export const logout = createAction('[auth] logout');

const initialState: AuthState = {
 isRegistering: false,
 isregistered: false,
 loginInfor: null,
 errorRegister: null,
 isLoggingIn: false,
 isLoggedIn: false,
 currentUser: null,
 errorLogin: null,
 isRequestingPwReset: false,
 isRequestedPwReset: false,
 messReqPwReset: null,
 errorReqPwReset: null,
 isResettingPw: false,
 isResetPw: false,
 messResetPw: null,
 errorResetPw: null,
};

const reducer = createReducer(
 initialState,
 on(register, () => ({ ...initialState, isRegistering: true })),
 on(registerSuccess, (state, { loginInfor }) => ({ ...initialState, isregistered: true, loginInfor })),
 on(registerFail, (state, { errorRegister }) => ({ ...initialState, errorRegister })),

 on(login, () => ({ ...initialState, isLoggingIn: true })),
 on(loginSuccess, (state, { currentUser }) => ({ ...initialState, isLoggedIn: true, currentUser })),
 on(loginFail, (state, { errorLogin }) => ({ ...initialState, errorLogin })),

 on(reqPwReset, () => ({ ...initialState, isRequestingPwReset: true })),
 on(reqPwResetSuccess, (state, { messReqPwReset }) => ({ ...initialState, isRequestedPwReset: true, messReqPwReset })),
 on(reqPwResetFail, (state, { errorReqPwReset }) => ({ ...initialState, errorReqPwReset })),

 on(resetPw, () => ({ ...initialState, isResettingPw: true })),
 on(resetPwSuccess, (state, { messResetPw }) => ({ ...initialState, isResetPw: true, messResetPw })),
 on(resetPwFail, (state, { errorResetPw }) => ({ ...initialState, errorResetPw })),

 on(logout, () => initialState),
);

export const authReducer = (state: AuthState, action: Action) => reducer(state, action);

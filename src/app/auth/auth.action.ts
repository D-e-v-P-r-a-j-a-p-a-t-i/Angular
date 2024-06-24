import { createAction, props } from '@ngrx/store';

// Define login action
export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);

// Define login success action
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: any }>()
);

// Define login failure action
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

// Define logout action
export const logout = createAction('[Auth] Logout');

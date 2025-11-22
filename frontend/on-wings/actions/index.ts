import { registerUserAction, loginUserAction, logoutUserAction } from './auth';

export const actions = {
  auth: {
    registerUserAction,
    loginUserAction,
    logoutUserAction,
  },
};
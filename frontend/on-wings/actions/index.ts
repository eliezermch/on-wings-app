import { registerUserAction, loginUserAction, logoutUserAction, getUser } from './auth';
import { getStories, getStory, rateStory, toggleLikeStory, getLikedStories } from './stories';

export const actions = {
  auth: {
    registerUserAction,
    loginUserAction,
    logoutUserAction,
    getUser,
  },
  stories: {
    getStory,
    toggleLikeStory,
    rateStory,
    getStories,
    getLikedStories,
  },
};
export const LOGO = 
  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const USER_AVATAR = 
  "https://avatars.githubusercontent.com/u/135553835?v=4";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY, 
  },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w300";

export const AI_KEY = process.env.REACT_APP_AI_KEY;

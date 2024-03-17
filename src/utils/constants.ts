export const LOGO =
  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const USER_LOGO =
  "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + import.meta.env.VITE_TMDB_KEY,
  },
};

export const POSTER_IMG = "https://image.tmdb.org/t/p/w200/";

export const LANG_CONFIG = [
  { langKey: "en", langName: "English" },
  { langKey: "hindi", langName: "Hindi" },
  { langKey: "spanish", langName: "Spanish" },
];

export const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;

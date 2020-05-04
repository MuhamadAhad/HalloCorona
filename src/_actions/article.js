import { GET_ARTICLES, GET_ARTICLE, CREATE_ARTICLE } from "../_constants";
import { API, setAuthToken } from "../config/API";

export const getArticles = (date) => {
  return {
    type: GET_ARTICLES,
    payload: async () => {
      try {
        let articles = "";
        if (date) {
          articles = await API.get(`/articles?createdAt=${date}`);
        } else {
          articles = await API.get(`/articles`);
        }
        return articles.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const getArticle = (id) => {
  return {
    type: GET_ARTICLE,
    payload: async () => {
      try {
        const article = await API.get(`/article/${id}`);
        return article.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const createArticle = (data) => {
  return {
    type: CREATE_ARTICLE,
    payload: async () => {
      try {
        setAuthToken(localStorage.getItem("token"));
        const article = await API.post("/articles", data);
        return article.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};

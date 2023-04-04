import articles from "../data/data.json";

const LOAD_ARTICLES = "article/loadArticles";
const ADD_ARTICLE = "article/addArticle";

export const loadArticles = (articles) => {
  return {
    type: LOAD_ARTICLES,
    articles,
  };
};

export const addArticle = (article) => {
  return {
    type: ADD_ARTICLE,
    article,
  };
};

export const writeArticle = (article) => async (dispatch) => {
  const response = await fetch("/api/articles", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(article),
  });
  const articleW = await response.json();
  console.log("articleW: ", articleW);
  dispatch(addArticle(articleW));
};

export const fetchArticles = () => async (dispatch) => {
  const response = await fetch("/api/articles");
  const articles = await response.json();
  dispatch(loadArticles(articles));
};

const initialState = { entries: [], isLoading: true };

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ARTICLES:
      console.log("action.articles: ", action.articles);
      return { ...state, entries: [...action.articles] };
    case ADD_ARTICLE:
      return { ...state, entries: [...state.entries, action.article] };
    default:
      return state;
  }
};

export default articleReducer;

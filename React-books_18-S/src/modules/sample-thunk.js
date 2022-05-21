import { handleActions, createAction } from "redux-actions";
import * as api from "../lib/api";
import createRequestThunk from "../lib/createRequestThunk";

// action types
const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
// const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
// const GET_USERS_FAILURE = "sample/GET_USERS_FAILEURE";

// thunk function
// 리덕스 지연 함수 ( 액션함수 만들어주는 함수들임 오해 ㄴ )
// const users = createAction(GET_USERS);
/* export const getPost = (id) => async (dispatch) => {
  dispatch({ type: GET_POST }); // 리덕스 호출 시작

  try {
    const response = await api.getPost(id);
    dispatch({
      type: GET_POST_SUCCESS,
      payload: response.data,
    }); // 성공
  } catch (e) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: e,
      error: true,
    });
    throw e; // 컴포넌트 단에서 에러를 조회할 수 있게 해주는 역할
  }
};

export const getUsers = () => async (dispatch) => {
  users();

  try {
    const response = await api.getUsers();
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
}; */

export const getPost = createRequestThunk(GET_POST, api.getPost);
export const getUsers = createRequestThunk(GET_USERS, api.getUsers);

const initState = {
  /* loading: {
    GET_POST: false,
    GET_USERS: false,
  }, */
  post: null,
  users: null,
};

const sample = handleActions(
  {
    [GET_POST_SUCCESS]: (state, { payload }) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false,
      },
      post: payload,
    }),
    [GET_USERS_SUCCESS]: (state, payload) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false,
      },
      users: payload.payload,
    }),
    // loading 관련 코드는 loading 리듀서에서 동작하니깐 여기에는 필요없음
    // 만약 fail 처리를 하고싶으면 fail 코드 살려서 코드 넣어주면 됨
    // or 컨테이너에서 try/catch로 에러 값을 조회하거나 해서 사용해도 됨
    /* 
    [GET_POST]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: true,
      },
    }),
    [GET_POST_FAILURE]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false,
      },
    }),    
    [GET_USERS]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: true,
      },
    }),
    [GET_USERS_FAILURE]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false,
      },
    }), 
    */
  },
  initState
);

export default sample;

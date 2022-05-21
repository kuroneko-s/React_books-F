// store = redux instance
// action = dispatch action
const loggerMiddleware = (store) => (next) => (action) => {
  // store.dispatch = 처음 미들웨어부터 다시 처리
  // next를 안쓰면 액션이 다음으로 진행이 안됨 ( 무시됨 )
  console.group(action && action.type);
  console.log("이전 상태", store.getState());
  console.log("액션", action);
  next(action);
  console.log("다음 상태", store.getState());
  console.groupEnd();
};

export default loggerMiddleware;

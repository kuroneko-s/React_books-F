import { createContext, useContext } from "react";

/*
  {
    promises : [],
    done: boolean
  }
*/
const PreloadContext = createContext(null);
export default PreloadContext;

export const Preloader = ({ resolve }) => {
  const preloadContext = useContext(PreloadContext);

  if (!preloadContext) return null; // 유효하지 않다면 아무것도 안함
  if (preloadContext.done) return null; // 작업이 끝났으면 아무것도 안함

  // promises : [];
  // reoslve 함수가 (파라미터) Promise를 반환하지 않더라도 Promise 취급을 하기 위해서 Promise.resolve 사용했음
  preloadContext.promises.push(Promise.resolve(resolve()));

  return null;
};

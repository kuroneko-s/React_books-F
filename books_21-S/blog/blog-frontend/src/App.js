import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // 로그인 화면
import PostListPage from './pages/PostListPage'; // 기본 화면
import PostPage from './pages/PostPage'; // 상세 화면
import RegisterPage from './pages/RegisterPage'; // 회원가입 화면
import WritePage from './pages/WritePage'; // 글쓰기 화면

function App() {
  return (
    <Switch>
      <Route component={PostListPage} path={['/@:username', '/']} exact />
      <Route component={LoginPage} path={'/login'} />
      <Route component={RegisterPage} path={'/register'} />
      <Route component={WritePage} path={'/write'} />
      <Route component={PostPage} path={'/@:username/:postId'} />
    </Switch>
  );
}

export default App;

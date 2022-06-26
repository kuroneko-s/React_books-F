import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';

function HeaderContainer() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const onLogout = () => dispatch(logout());

  return <Header user={user} onLogout={onLogout} />;
}

export default HeaderContainer;

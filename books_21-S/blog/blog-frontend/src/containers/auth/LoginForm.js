import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initializeForm } from './../../modules/auth';

function LoginForm() {
  const dispatch = useDispatch();
  const state = useSelector((state) => ({
    form: state.auth.login,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name, // username, password, passwordConfirm
        value,
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  return (
    <AuthForm
      type="login"
      form={state}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}

export default LoginForm;

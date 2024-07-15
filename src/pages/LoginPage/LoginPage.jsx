import React from 'react';
import LoginForm from '../../features/login/ui/LoginForm.jsx';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  return (
    <div className={styles.wrapperLoginPage}>
      <span className={styles.titleLogin}>Войдите в свой профиль</span>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
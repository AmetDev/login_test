import React, {useState, useEffect, useRef} from 'react';
import styles from './LoginForm.module.scss';

import iconLetter from '../../../assets/icons/letter.svg';
import iconLock from '../../../assets/icons/lock.svg';
import iconEyeSlash from '../../../assets/icons/eyeSlash.svg';
import iconEye from '../../../assets/icons/eye.svg';
import { Login } from './LoginAdd/LoginAdd';
const LoginForm = () => {

  const [click, setClick] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [emailError, setEmailError] = useState('Введите почту');
  const [isFocusedPassword, setIsFocusedPassword] = useState(false)
  const [isFocusedEmail, setIsFocusedEmail] = useState(false)
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [passwordError, setPasswordError] = useState('Введите пароль');
  const [login, setLogin] = useState(false)

  const handleClick = () => {
    setClick(!click)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; 
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный ввод почты')
    } else {
      setEmailError('')
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordError('Пароль должен быть не менее 6 символов и иметь заглавные буквы')
      if (!e.target.value) {
        setPasswordError('Пароль не может быть пустым')
      }
    } else if (!/[A-ZА-ЯЁ]/.test(e.target.value)) {
      setPasswordError('Пароль должен быть не менее 6 символов и иметь заглавные буквы')
    }
    else {
      setPasswordError('')
    }
  };

  const handlerBlur = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailInput(true)
        break
      case 'password':
        setPasswordInput(true)
        break
    }
  }

  useEffect(() => {
    if (emailError || passwordError) {
      setLogin(false)
    } else {
      setLogin(true)
    }
  }, [emailError, passwordError])
  const handleLogin = () => {
    if(login) {
      Login(email, password)
    }
  }
  const handleFocusEmail = () => {
    setIsFocusedEmail(true);
  };
  const handleFocusPassword = () => {
    setIsFocusedPassword(true);
  };

  const handleClickOutside = (e) => {
 
    if (emailRef.current && !emailRef.current.contains(e.target)) {
     
  
      setIsFocusedEmail(false);
    }
    if( passwordRef.current && !passwordRef.current.contains(e.target)) {
      
      setIsFocusedPassword(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className={styles.wrapperLoginForm}>
        <div  onFocus={handleFocusEmail} ref={emailRef} className={!isFocusedEmail? styles.inputLog:styles.inputLogActive}>
            <img 
                className={styles.imgInput} 
                src={iconLetter} 
                alt='letter' 
            />
            <div 
           className={styles.wrapperInput}>
              <input
                  value={email}
                  name='email'
                  type='email'
                  placeholder=' '
                  onChange={e => handleEmailChange(e)}
                  onBlur={e => handlerBlur(e)}
                  required
              />
              <label className={styles.loginLabel}>
                Электронная почта
              </label>
            </div>
        </div>
        <div className={!isFocusedPassword? styles.inputLog:styles.inputLogActive}
        ref={passwordRef} onFocus={handleFocusPassword}>
            <img 
                className={styles.imgInput} 
                src={iconLock} 
                alt='lock' 
            />
            <div   className={styles.wrapperInput}>
              <input
                value={password}
                name='password'
                type={click === true ? 'text' : 'password'}
                placeholder=' '
                onChange={e => handlePasswordChange(e)}
                onBlur={e => handlerBlur(e)}
                required
              />
              <label className={styles.loginLabel}>
                Пароль
              </label>
            </div>
            <button 
                className={styles.btnEye}
                onClick={handleClick}
            >
                {click === true ? 
                    <img 
                    className={styles.imgInput} 
                    src={iconEye} 
                    alt="eye" 
                    /> :
                    <img 
                        className={styles.imgInput} 
                        src={iconEyeSlash} 
                        alt="eyeSlash" 
                    /> 
                }
            </button>
        </div>
        <span className={styles.text}>Забыли пароль?</span>
        {(emailInput && emailError) && <div className={styles.errorMessage}>{emailError}</div>}
        {(passwordInput && passwordError) && <div className={styles.errorMessage}>{passwordError}</div>}
        <button
            disabled={!login}
            onClick={handleLogin}
            className={login ? styles.btnLogin : styles.btnLoginBlock}
            type='submit'
          >
            Войти
        </button>
        <span className={styles.text}>
          Зарегистрироваться
        </span>
    </div>
  );
};

export default LoginForm;
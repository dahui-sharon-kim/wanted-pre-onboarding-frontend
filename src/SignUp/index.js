import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AppColors } from '../theme/styles/AppColors';
import IdPwInput from '../common/IdPwInput';
import IdPwContainer from '../common/IdPwContainer';
import Button from '../common/Button';
import * as ROUTES from '../constants/routes';

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  background-color: ${AppColors.lightGrey};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RowContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

function SignUp() {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [info, setInfo] = useState({ email: '', password: '' });
  const onChange = e => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const submitAvailable = (email, password) => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return email.length !== 0 && reg.test(email) && password.length >= 8;
  };
  const submitAvailableMsg = (email, password) => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(email)) {
      return <p style={{ color: AppColors.red, fontSize: 14 }}>이메일 주소를 확인하세요</p>;
    }
    if (password.length < 8) {
      return <p style={{ color: AppColors.red, fontSize: 14 }}>패스워드는 8자 이상으로 입력해주세요</p>;
    }
    return <p style={{ color: AppColors.textBlue, fontSize: 14 }}>좋습니다!</p>;
  };
  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };
  const onSubmit = (info, isAvailable) => {
    if (isAvailable) {
      fetch('https://pre-onboarding-selection-task.shop/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(info),
        })
      .then(result => result.ok && alert('회원가입 완료!'));
    };
    return null;
  };

  return (
    <Wrapper>
      <h1>계정을 만드세요</h1>
      <IdPwContainer>
        <IdPwInput
          name="email"
          value={info.email}
          onChange={onChange}
          type="text"
          placeholder="이메일 주소를 입력해주세요"
          borderWidth="1px 1px 0 1px"
          borderRadius="6px 6px 0 0"
        />
        <IdPwInput
          name="password"
          value={info.password}
          onChange={onChange}
          type="password"
          placeholder="비밀번호를 입력해주세요"
          borderWidth="1px"
          borderRadius="0 0 6px 6px"
        />
        <div style={{ margin: '20px 0 10px 0' }}> {submitAvailableMsg(info.email, info.password)} </div>
        <Button onClick={() => onSubmit(info, submitAvailable(info.email, info.password))} isInvalid={!submitAvailable(info.email, info.password)}>
          계정 만들기
        </Button>
        <RowContainer>
          <p> 이미 계정이 있으세요? </p>
          <div
            style={{
              margin: 10,
              cursor: 'pointer',
              color: hover ? AppColors.textBlue : AppColors.black,
              textDecoration: hover ? 'underline' : 'none',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => navigate(ROUTES.HOME)}
          >
            로그인 하러 가기
          </div>
        </RowContainer>
      </IdPwContainer>
    </Wrapper>
  );
}

export default SignUp;

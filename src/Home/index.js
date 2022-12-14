import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BsArrowUpRight } from 'react-icons/bs';
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Divider = styled.div`
  width: 200px;
  border: 0.5px solid ${AppColors.lightGrey3};
  margin: 30px 0;
`;

function Home() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({ email: '', password: '' });
  const userId = localStorage.getItem('login-token');

  useEffect(() => {
    if (userId) {
      navigate(ROUTES.TODO);
    }
  }, []);

  const onChange = e => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const submitAvailable = (email, password) => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return email.length !== 0 && reg.test(email) && password.length >= 8;
  };
  const onSubmit = async (info, isAvailable) => {
    if (isAvailable) {
      try {
        const fetchData = await fetch('https://pre-onboarding-selection-task.shop/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(info),
        });
        if (!fetchData.ok) {
          throw new Error('authentication error');
        }
        const token = await fetchData.json();
        localStorage.setItem('login-token', token.access_token);
        navigate(ROUTES.TODO);
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  return (
    <Wrapper>
      <h1>???????????????!</h1>
      <IdPwContainer>
        <IdPwInput
          name="email"
          value={info.email}
          onChange={onChange}
          type="text"
          placeholder="????????? ????????? ??????????????????"
          borderWidth="1px 1px 0 1px"
          borderRadius="6px 6px 0 0"
        />
        <IdPwInput
          name="password"
          value={info.password}
          onChange={onChange}
          type="password"
          placeholder="??????????????? ??????????????????"
          borderWidth="1px"
          borderRadius="0 0 6px 6px"
        />
        <Button onClick={() => onSubmit(info, submitAvailable(info.email, info.password))} isInvalid={!submitAvailable(info.email, info.password)}>
          ?????????
        </Button>
        <Divider />
        <RowContainer>
          <p>????????? ?????????????</p>
          <RowContainer onClick={() => navigate(ROUTES.SIGNUP)} style={{ cursor: 'pointer' }}>
            <p style={{ color: AppColors.textBlue, marginLeft: 10 }}>???????????? ????????????</p>
            <BsArrowUpRight style={{ color: AppColors.textBlue, marginLeft: 5 }} />
          </RowContainer>
        </RowContainer>
      </IdPwContainer>
    </Wrapper>
  );
}

export default Home;
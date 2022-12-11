import styled from "styled-components";
import { AppColors, AppColorsGradient } from "../theme/styles/AppColors";

export const Button = styled.div`
  width: 280px;
  height: 45px;
  margin: 10px;
  font-size: 16px;
  cursor: ${props => props.isInvalid? 'auto' : 'pointer'};
  background: ${props => (props.isInvalid ? AppColors.lightGrey2 : AppColorsGradient.blue)};
  color: ${props => (props.isInvalid ? '#aaa' : AppColors.white)};
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default Button;
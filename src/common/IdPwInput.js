import styled from "styled-components";

export const IdPwInput = styled.input`
  width: 280px;
  height: 45px;
  border-radius: 2px;
  border: 1px solid #d6d6d6;
  border-width: ${props => props.borderWidth};
  border-radius: ${props => props.borderRadius};
  padding: 4px 6px;
  outline: none;
  box-sizing: border-box;
  font-size: 1em;
`;

export default IdPwInput;
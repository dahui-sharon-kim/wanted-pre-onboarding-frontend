import { createGlobalStyle } from 'styled-components';
import { AppColors } from './AppColors';

const GlobalStyles = createGlobalStyle`
  h1, h2, h3, p {
    color: ${AppColors.black};
    margin: 0;
  }
`;

export default GlobalStyles;

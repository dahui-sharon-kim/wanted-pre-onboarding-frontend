import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import GlobalStyles from './theme/styles/GlobalStyles';
import Home from './Home';
import SignUp from './SignUp';
import Todo from './Todo';

function App() {
  return (
    <div className='App'>
      <GlobalStyles />
      <BrowserRouter basename="/wanted-pre-onboarding-frontend">
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.SIGNUP} element={<SignUp/>} />
          <Route path={ROUTES.TODO} element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

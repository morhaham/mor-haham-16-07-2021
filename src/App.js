import { Container } from '@chakra-ui/react';
import Header from './components/header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './components/main';

export const icons = require.context('./img/icons', true, /\.svg$/);

const App = () => {
  return (
    <Router>
      <Header />
      <Container maxW='container.xl' p='20px 10px'>
        <Switch>
          <Route exact path='/' component={Main} />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;

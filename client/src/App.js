import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

import './App.css';
import Home from './Component/HomeComponent/HomeComponent';
import Quiz from './Component/Quiz/Quiz';
import Result from './Component/ResultComponent/ResultComponent';
function App() {
  //Render different Component based on the paths
  return (
  <Router >
    <Switch>
      <Route exact path="/">
           <Home/>
      </Route>
      <Route path="/quiz">
        <Quiz/>
      </Route>
      <Route path='/result'>
        <Result/>
      </Route>
    </Switch>
  </Router>
  );
}

export default App;

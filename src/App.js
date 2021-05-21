import UsersList from './components/UsersList';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={UsersList}></Route>
      <Route path="/:id" component={UserProfile}></Route>
    </Switch>
  );
}

export default App;

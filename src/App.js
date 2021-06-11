import UsersList from './pages/UsersList';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import FormPage from './pages/FormPage';
import PhotoGallery from './pages/PhotoGallery';
import Trello from './pages/Trello';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={UsersList}></Route>
      <Route path="/form" component={FormPage}></Route>
      <Route path="/gallery" component={PhotoGallery}></Route>
      <Route path="/trello" component={Trello}></Route>
      <Route path="/:id" component={UserProfile}></Route>
    </Switch>
  );
}

export default App;

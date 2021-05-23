import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import FormPage from './pages/Form'
import NotFoundPage from './pages/NotFound'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/surveys/:id">
          <FormPage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

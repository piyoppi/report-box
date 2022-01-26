import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import FormPage from './pages/Form'
import NotFoundPage from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/surveys/:id" element={<FormPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

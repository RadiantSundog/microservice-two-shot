import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesList from './ShoesList';
import ShoeForm from './ShoeForm';
import HatsList from './HatsList';
import HatForm from './HatForm';

function App(props) {
  if (props.hats === undefined) {
    return null;
  }
function App(props) {
  if (props.shoes === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="shoes" element={<ShoesList shoes={props.shoes}/>} />
          <Route path="shoes/new" element={<ShoeForm />} />
          <Route path="hats" element={<HatsList hats={props.hats}/>} />
          <Route path="/hats/new" element={<HatForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

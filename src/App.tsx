import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, MovieDetails} from './Routes';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/home"} element={<Home />} />
        <Route path={"/"} element={<Home />} />
        <Route path="/movie/:movieId" element={<MovieDetails/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

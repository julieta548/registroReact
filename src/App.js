import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { Register } from './Register';

function App() {
  return (
    <div className="App">

    
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        {/* <Route path='/login' element={<Login/>}></Route> */}
        <Route path='https://heartfelt-starship-f7154b.netlify.app/register' element={<Register/>}></Route>

      </Routes>
      

      </BrowserRouter>
    </div>
  );
}

export default App;

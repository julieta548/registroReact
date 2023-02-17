import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Register } from './Home1';

function App() {
  return (
    <div className="App">

    
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}></Route>
        {/* <Route path='/login' element={<Login/>}></Route> */}
        

      </Routes>
      

      </BrowserRouter>
    </div>
  );
}

export default App;

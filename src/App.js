import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Show1 from './components/Show1';
import Edit from './components/Edit';
import Create from './components/Create';
import Mensajeria from './components/Mensajeria';




function App() {
  return (
    <div className="App">

    
    

      <BrowserRouter>
      <Routes>
        {/*<Route path='/' element={<Register/>}></Route>*/}
        {/* <Route path='/login' element={<Login/>}></Route> */}
        <Route path='/' element={<Show1/>}/>
        <Route path='/create' element={<Mensajeria/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>


      </Routes>
      

      </BrowserRouter>
    </div>
  );
}

export default App;

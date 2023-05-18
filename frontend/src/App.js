// import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home';
import {  BrowserRouter,Route,Routes } from 'react-router-dom';
import NewPost from './Components/newpost/NewPost';
import Show from './Components/show/Show';

function App() {
  return (<>
  <BrowserRouter>
    <Routes>
      <Route index element={<Home/>}/>
      <Route path='/newpost' element={<NewPost/>}/>
      <Route path='/newpost/show' element={<Show/>}/>
    </Routes>
  </BrowserRouter>
  </>)
}

export default App;

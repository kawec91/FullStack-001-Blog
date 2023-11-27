import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import Loginn from './Components/Login/Loginn';
import Willkomen from './Components/Willkomen/Willkomen';
import Register from './Components/Register/Register';
import Blog from './Components/Blog/Blog';
import Finden from './Components/Finden/Finden';
import Freunde from './Components/Freunde/Freunde';
import Logout from './Components/Logout/Logout';
import Oops from './Oops/Oops';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route path='/' element={<Main />}>
            <Route path='/' element={<Loginn />} />
            <Route path='/register' element={<Register />} />
            <Route path='/willkomen' element={<Willkomen />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/finden' element={<Finden />} />
            <Route path='/freunde' element={<Freunde />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/oops' element={<Oops />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

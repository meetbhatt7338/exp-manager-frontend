import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/user/Login';
import { SingUp } from './components/user/SingUp';
import { Home } from './components/expense/Home';

function App() {
  return (
    <div>

      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<SingUp />}></Route>
        <Route path='/home' element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;

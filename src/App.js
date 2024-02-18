import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/user/Login';
import { SingUp } from './components/user/SingUp';
import { Dashboard } from './components/user/Dashboard';
import { AddCategory } from './components/expense/AddCategory';
import { ListCategory } from './components/expense/ListCategory';

function App() {
  return (
    <div>

      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<SingUp />}></Route>
        <Route path='/user/dashboard' element={<Dashboard />}></Route>
        <Route path='/expense/add' element={<AddCategory />}></Route>
        <Route path='/expense/list/:id' element={<ListCategory />}></Route>
      </Routes>
    </div>
  );
}

export default App;

import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { Login } from './components/user/Login';
import { SingUp } from './components/user/SingUp';
import { Nav } from './components/user/Nav';
import { AddCategory } from './components/expense/AddCategory';
import { ListCategory } from './components/expense/ListCategory';
import { Dashboard } from './components/user/Dashboard';
import { PageNotFound } from './components/PageNotFound';
import { EditExpense } from './components/expense/EditExpense';
import ProtectedRoute from './hooks/ProtectingRoute';
import { useEffect } from 'react';
import { AddGaol } from './components/goal/AddGaol';
import { GoalList } from './components/goal/GoalList';
import { IndividualgoalList } from './components/goal/IndividualgoalList';
import { AddRevenue } from './components/revenue/AddRevenue';
import { ListRevenue } from './components/revenue/ListRevenue';
import { UpdateRevenue } from './components/revenue/UpdateRevenue';
import { Profile } from './components/profile/Profile';
import { Footer } from './components/user/Footer';
import { Logout } from './components/user/Logout';
import { LandingPage } from './components/LandingPage';


function App() {
  const navigate = useNavigate();

  // Use useEffect to update the path whenever the URL changes
  useEffect(() => {
    const path = window.location.pathname;
    navigate(path);
  }, [navigate]);

  return (
    <div>
      {window.location.pathname === '/login' ||window.location.pathname === '/signup'|| window.location.pathname === '' ? null : <Nav />}
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<SingUp />}></Route>
        <Route element={<ProtectedRoute/>}>
        <Route path='/add' element={<AddCategory />}></Route>
        <Route path='/list' element={<ListCategory />}></Route>
        <Route path='/edit/:uid/:id' element={<EditExpense />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/goal' element={<AddGaol />}></Route>
        <Route path='/viewgoal' element={<GoalList />}></Route>
        <Route path='/individualgoal/:id' element={<IndividualgoalList />}></Route>
        <Route path='/addrevenue/:id' element={<AddRevenue />}></Route>
        <Route path='/listrevenue/:id' element={<ListRevenue />}></Route>
        <Route path='/editrevenue/:id' element={<UpdateRevenue />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/logout' element={<Logout />}></Route>
        </Route>
        <Route path='/*' element={<PageNotFound />}></Route>
       
      </Routes>
      {window.location.pathname === '/login' || window.location.pathname === '/signup' ||window.location.pathname === '' || window.location.pathname === '/list' ? null : <Footer />}

    </div>
  );
}

export default App;

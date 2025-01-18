import React from 'react';
import {Routes,Route} from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import Home from './pages/Home';
import UserProtectedWrapper from './pages/UserProtectedWrapper';
import UserLogout from './pages/UserLogout';
import CaptainLogout from './pages/CaptainLogout';
import CaptainHome from './pages/CaptainHome';
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper';
import Riding from './pages/Riding';
import CaptainRiding from './pages/CaptainRiding';
const App = () => {


  
  return (
    <div >
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path='/login' element={<UserLogin/>}></Route>
        <Route path='/signup' element={<UserSignup/>}></Route>
        <Route path='/captain-login' element={<CaptainLogin/>}></Route>
        <Route path='/captain-signup' element={<CaptainSignup/>}></Route>
        <Route path='/riding' element={<Riding/>}></Route>
        <Route path='/home' element={
          <UserProtectedWrapper>
            <Home/>
          </UserProtectedWrapper>
        }></Route>
        <Route path='/user/logout' element={
          <UserProtectedWrapper>
            <UserLogout/>
          </UserProtectedWrapper>
        }></Route>

        <Route path='/captain-home' element={
          <CaptainProtectedWrapper>
          <CaptainHome/>
          </CaptainProtectedWrapper>
          // <CaptainHome/>
        }></Route>

  <Route path='/captain-riding' element={
          <CaptainProtectedWrapper>
          <CaptainRiding/>
          </CaptainProtectedWrapper>
          // <CaptainHome/>
        }></Route>

        <Route path='/captain/logout' element={
          <CaptainProtectedWrapper>
          <CaptainLogout/>
          </CaptainProtectedWrapper>
          // <CaptainHome/>
        }></Route>
      </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import  SignIn from './pages/signIn';
import  SignUp  from './pages/signUp';
import  HomePage  from './pages/homePage';


const App = () => {
  return (
    <div >
      <BrowserRouter>
     <Routes>
          <Route path="/" exact element={<SignIn />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/home" exact element={<HomePage />} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

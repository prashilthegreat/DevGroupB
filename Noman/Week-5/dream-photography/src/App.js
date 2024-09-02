import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './Pages/Shared/Header/Header';
import Footer from './Pages/Shared/Footer/Footer';
import Home from './Pages/Home/Home/Home';
import NotFound from './Pages/Shared/NotFound/NotFound';
import Login from './Pages/Login/Login/Login';
import Register from './Pages/Login/Register/Register';
import Checkout from './Pages/Checkout/Checkout';
import RequireAuth from './Pages/Login/RequireAuth/RequireAuth';
import AboutMe from './Pages/AboutMe/AboutMe';
import Blogs from './Pages/Blogs/Blogs';
import Success from './Pages/Checkout/Success/Success';
function App() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/about' element={<AboutMe></AboutMe>}></Route>
        <Route path='/blogs' element={<Blogs></Blogs>}></Route>
        <Route path='/checkout/:checkOutName' element={
          <RequireAuth>
            <Checkout></Checkout>
          </RequireAuth>
        }></Route>
        <Route path='/success' element={<RequireAuth>
          <Success></Success>
        </RequireAuth>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;

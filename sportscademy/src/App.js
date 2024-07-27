import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import AdmLogin from './AdmLogin';
import Header from './Header';
import FrontPage from './FrontPage';
import View from './View';
import BookedReport from './BookedReport';
import './bootstrap.min.css'
import AdmFrontPage from './AdmFrontPage';
import AddCourse from './AddCourse';
import EditCourse from './EditCourse';
import AdmView from './AdmView';
import AdminReport from './AdminReport';


function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Home/>}></Route>
     <Route path='login' element={<Login/>}></Route>
     <Route path='/adminLogin' element={<AdmLogin/>}></Route>
     <Route path='/register' element={<Register/>}></Route>
     <Route path='/viewAll' element={<FrontPage/>}></Route>
    <Route path='/view/:id' element={<View/>}></Route>
    <Route path='/reports' element={<BookedReport/>}></Route>
    <Route path='/admviewAll' element={<AdmFrontPage/>}></Route>
    <Route path='/addcourse' element={<AddCourse/>}></Route>
    <Route path='/editcourse/:id' element={<EditCourse/>}></Route>
    <Route path='/admview/:id' element={<AdmView/>}></Route>
    <Route path='/adminreport/:id' element={<AdminReport/>}></Route>

     </Routes>
    </div>
  );
}

export default App;

import { useState } from 'react'
import './App.css'
import { NavLink,Link,Routes,Route , useLocation} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import ResetPasswordLink from './pages/Password Reset Pages/ResetPasswordLink';
import Checkemail from './pages/Password Reset Pages/Checkemail';
import NewPassword from './pages/Password Reset Pages/NewPassword';
import ResetComplete from './pages/Password Reset Pages/ResetComplete';
import Navbar from './components/Common/Navbar';
import Aboutus from './pages/Aboutus';
import ContactUs from './pages/ContactUs';
import Dashboard from './pages/Student Dashboard/Dashboard';
import MyProfile from './pages/Student Dashboard/MyProfile';
import SettingPage from './pages/Student Dashboard/SettingPage';
import AddCourse from './pages/Instructor/AddCourse';
import MyCourses from './pages/Instructor/MyCourses';
import CategoryPageDetails from './components/Category Page/CategoryPageDetails';
import CourseCardDetails from './components/Category Page/CourseCardDetails';
import WishlistCourses from './pages/Student Dashboard/WishlistCourses';
import PurchaseCourse from './components/Common/PurchaseCourse';
import EnrolledCourses from './pages/Student Dashboard/EnrolledCourses';
import ViewPurchaseCourse from './pages/Student Dashboard/ViewPurchaseCourse';
import Forum from './components/core/Forum';
import Error from './pages/Error';


function App() {

  const location = useLocation();
  const hideNavbarRoutes = [
    '/course/watchCourse/:courseId/questions/doubt-forum',
    '/course/watchCourse/:courseId'
  ];

  // Check if current location matches any of the hideNavbarRoutes
  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route.split(":")[0])
  );

  return (
    <div className='NotionAcademy'>
     
     {/* {location.pathname !== '/course/watchCourse/:courseId/questions/doubt-forum' && <Navbar />}
     <Navbar/> */}
     {!shouldHideNavbar && <Navbar />}

     <Routes>

      <Route path='/' element={<Home/>}/>

      <Route path='/login' element={<Login/>}/>

      <Route path='/signup' element={<Signup/>} />

      <Route path='/verify-email' element={<VerifyEmail/>}/>

      <Route path='/about' element={<Aboutus/>} />

      <Route path='/reset-password' element={ <ResetPasswordLink/>  } 
        />  

      <Route path='/check-email' element={<Checkemail/>}/>

      <Route path='/update-password/:token' element={<NewPassword/>}/>

      <Route path='resetpassword-complete' element={<ResetComplete/>}/>

      <Route path='/contact' element={<ContactUs/>} />

      <Route path='/dashboard/my-profile' element={<Dashboard/>}>
           <Route index element={<MyProfile/>} />
           <Route path="settings" element={<SettingPage/>} />
           <Route path='add-course' element={<AddCourse/>}/>
           <Route path="my-courses" element={<MyCourses/>} /> 
           <Route path='wishlist-courses' element = {<WishlistCourses/>} />
           <Route path='enrolled-courses' element = {<EnrolledCourses/>} />
           <Route patch="*" element={<Error/>} />
           
      </Route>

      <Route path='/catalog/:catalogName' element=<CategoryPageDetails/>  />

      <Route path='/course/:courseId' element=<CourseCardDetails/>  />
      
      <Route path='/course/purchase-course/:courseId' element = {<PurchaseCourse/>}/>


      <Route path='/course/watchCourse/:courseId' element = {<ViewPurchaseCourse/>} />

      <Route path="/course/watchCourse/:courseId/questions/doubt-forum" element={<Forum/>} />

      <Route path='*' element={<Error/>} />

     </Routes> 
    
     
     

    </div>
  )
}

export default App

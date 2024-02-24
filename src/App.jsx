import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState } from "react";






import About from "./components/About";
import Contact from "./components/Contact";
import Pages from "./components/MainNavigation";
import Services from "./components/Services";


import Navbar from "./components/MainPage/MainHeader"
import ClientList from "./components/Client";
import LoginForm from "./components/LoginForm";
import OtherComponent from "./components/Client";

import Header from "./components/Header";
import DynamicDivsComponent from "./components/MainPage/Clients";
import AppointmentScheduler from "./components/MainPage/Appointment";
import { DataProvider } from "./components/DataContext";
import Dhruvam from "./components/MainPage/Dhruvam";
import ComponentA from "./components/ComponentA";
import { SharedProvider } from "./components/SharedContext";

import Communication from "./components/Communication";
import MessageDisplay from "./components/MessageDisplay";
import { SocketProvider } from "./components/SocketContext";
import AppointmentBooking from "./components/AppointmentBooking";
import AuthInput from "./components/AuthInput";
import { AuthProvider } from "./components/AuthContext";
import Navbar1 from "./components/MainPage/DoctorMainHeader";









function App() {
  const instanceIdentifier = 'your_unique_identifier'; 
  
  
  
  

  
  
  
  const router=createBrowserRouter([
    {path: '/Nutrition.github.io/',
      element:<><Pages  /></>,
      children:[
      { path: 'https://dhruvam123.github.io/Nutrition.github.io/about', element:<About /> },
      { path: '/Nutrition.github.io/contact', element: <Contact /> },
      { path: '/Nutrition.github.io/services', element: <Services/> },
      
    ]},
  
  
  
  
  {path:'/mainpage',element:<><Navbar/></>},
  { path: '/mainpage/clientlist', element: <ClientList/> },
  {path:'/mainpage/doctor',element:<><Navbar1/></>},
 
 
  {path:'/mainpage/clients',element:<DynamicDivsComponent/>},
  {path:'/mainpage/appointment',element:<AppointmentScheduler/>},
  {path:'/mainpage/dhruvam',element:<Dhruvam/>},
  {path:'/routeA',element:<SharedProvider><ComponentA/></SharedProvider>},
  
  {path:'/communication',element:<SocketProvider><Communication/></SocketProvider>},
  {path:'/display',element:<MessageDisplay/>},
  {path:'/patient',element:<Communication/>},
  {path:'/doctor',element:<MessageDisplay/>},
  {path:'/appointmentbooking',element:<AppointmentBooking/>}
  
  

  
 


  
 
  
  
      
  
      
    
      
      
        
      
    
    
  
  
   
   
  
  
  
  ])
  
  
  

 

  

 return ( 
 
  <>
   
  
  
  
  <DataProvider>
  <RouterProvider router={router}>
      
        <Header/>
        <DynamicDivsComponent/> 
        <Navbar/>
        
        
        
        
        <ClientList/> 
        <SharedProvider>
        
        <ComponentA/>
       
        <AuthProvider instanceIdentifier={instanceIdentifier}>
          <MessageDisplay/>
          <Communication/>
        </AuthProvider>
        
</SharedProvider>
<SocketProvider>
  <Communication/>
</SocketProvider>
        
        </RouterProvider>
        


       
     
    </DataProvider>

   
    
    
    </>
  
    
      
      
    
  );
}

export default App;
// src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

// import Communication from './components/Communication.jsx'
// import MessageDisplay from './components/MessageDisplay'

// function App() {
//   return (
//     <Router>
//       <div>
        
//         <Routes>
//         <Route path="/patient" element={<Communication/>} />
//         <Route path="/doctor" element={<MessageDisplay/>} />

//         </Routes>

        
          
        
//       </div>
//     </Router>
//   );
// }

// export default App;


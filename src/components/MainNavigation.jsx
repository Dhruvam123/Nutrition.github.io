import { Outlet } from "react-router-dom"
import './Header.css'
import Footer from "./Footer"
import Header from "./Header"
import { DataProvider } from './DataContext';
import ClientList from "./Client";

const Pages=()=>{
    
    return(
       <>
       <Header/>
        
        
            
               
                
                
                

                

           
        
           <Outlet/>
           
           

         
                
        
            <Footer/> 
            </>
        

    
        

        
         
         
         

        
        
        
       
       
    )
}
export default Pages
import AuthInput from './AuthInput';
import './Header.css';
import LoginForm from './LoginForm';
import { Link, Outlet} from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import ClientList from './Client';
import { useDataContext } from './DataContext';

//import localStorage from Storage


// Listen for the scroll event
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navclass');
    console.log(navbar);
    const letter=document.querySelectorAll('#navbar li a');
    console.log(letter);
   
  // Change navbar background color based on scroll position
  if (window.scrollY > 0) {
    navbar.style.background = 'white';

    letter.forEach((item)=>{
        item.style.color='green'
    })

    console.log('dhruvam')
  } else {
    navbar.style.background = 'rgb(11, 114, 132)';
// letter[2].style.color = 'pink';

    letter.forEach((item)=>{
        item.style.color='white'
    })

  }
});

const Header=()=>{
    const { handleLoginSubmit } = useDataContext();

  const handleSubmit = (formData) => {
    // Call the context function to update the shared state
    handleLoginSubmit(formData);
    // You may perform additional actions here if needed
  };
    
    
    let init= window.localStorage.getItem('op');
    init= init? JSON.parse(init) : null;
    console.log(init);
    let init1=window.localStorage.getItem('account');

    init1= init1? JSON.parse(init1) : null;
    console.log(init1);
    
    const[account,setaccount]=useState(init1|| false);
    const[op,setop]=useState(init || false);
    useEffect(()=>{
        window.localStorage.setItem('op', JSON.stringify(op));

    },[op])
    useEffect(()=>{
        window.localStorage.setItem('account', JSON.stringify(account));

    },[account])
   
       
    
    const handleaccount=()=>{
        setaccount(true);
        
        
    }
    const handleaccount1=()=>{
        setaccount(false);
        
        
    }
    const handleop=()=>{
         setop(true);
        //window.localStorage.setItem('op', JSON.stringify(op));
    }
    const handleopop=()=>{
        setop(false);
        //window.localStorage.setItem('op', JSON.stringify(op));
    }
    
    const [clicked,setclicked]=useState(false)
    const handleClick=()=>{
        setclicked((clicked)=>!clicked)
    }
    const image= document.querySelector('.lan');
    if(op && image!==null && image!==undefined){
        
        image.style.backgroundImage='none';

    }
    const imag=document.querySelector('.lan');
    if(!op && imag!==null && imag!==undefined){
       
        imag.style.backgroundImage='url("src/assets/dhruvam.svg")'
    }
    
    
    
    
    
       
    
    
    return(<>
    <div className='flex-row'>
        <div className="flex-row navclass fixed">
            
        
        
        <div>
            <ul id="navbar" className={clicked? '#navbar active':'#navbar'}>
                <li>
                <a><svg xmlns="http://www.w3.org/2000/svg" id="logo-15" width="49" height="48" viewBox="0 0 49 48" fill="none"> <path d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z" class="ccustom" fill="#17CF97"/> <path d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z" class="ccustom" fill="#17CF97"/> <path d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z" class="ccustom" fill="#17CF97"/> <path d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z" class="ccustom" fill="#17CF97"/> </svg></a>
                </li>
            <li>
                <Link className="active" to="/" onClick={handleopop}>Home</Link>
            </li>
            <li>
                <Link to="/about" onClick={handleop}>About</Link>
            </li>
            <li>
                <Link to="/contact"onClick={handleop}>Contact</Link>
            </li>
            <li>
                <Link to="/services"onClick={handleop}>Services</Link>
            </li>
           
            
        </ul>
    </div>
   
    <div id="mobile" onClick={handleClick}>
        <i id="bar" className={clicked? 'fas fa-times':'fas fa-bars'}></i>
    </div>  
</div> 
        

       
        
    
       
        {!op && <section className='lan flex-row' >
            <main>
            {!account&& !op && <AuthInput onevent={handleaccount}/>}
            {account && !op&& <LoginForm onevent={handleaccount1} onSubmit={handleSubmit}/>}
           
            </main>
       

            </section>} 
            </div>
            
            
       
        </>)
}
export default Header
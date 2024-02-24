import { useState } from "react";
import { Link } from "react-router-dom";
import '../MainPage/Sidebar.css'
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navclas');
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
  navbar.style.background = 'rgb(62 14 110 / 99%)'
// letter[2].style.color = 'pink';

  letter.forEach((item)=>{
      item.style.color='white'
  })

}
});
const Sidebar=()=>{
    const [open, setOpen] = useState(false);
  const Menus = [
    { title: "Dashboard", src: "Chart_fill" },
    { title: "Inbox", src: "Chat" },
    { title: "Accounts", src: "User", gap: true },
    { title: "Schedule ", src: "Calendar" },
    { title: "Search", src: "Search" },
    { title: "Analytics", src: "Chart" },
    { title: "Files ", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ];
  const [clicked,setclicked]=useState(false)
  const handleClick=()=>{
      setclicked((clicked)=>!clicked)
  }

  return (
    <>
    <nav className={open ? "navclas1" :"navclas"}>
    <a><svg xmlns="http://www.w3.org/2000/svg" id="logo-15" width="49" height="48" viewBox="0 0 49 48" fill="none"> <path d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z" class="ccustom" fill="#17CF97"/> <path d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z" class="ccustom" fill="#17CF97"/> <path d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z" class="ccustom" fill="#17CF97"/> <path d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z" class="ccustom" fill="#17CF97"/> </svg></a>

<div>
    <ul id="navbar" className={clicked? '#navbar active':'#navbar'}>
        <li>
            <Link className="active" to="/" >Home</Link>
        </li>
        <li>
            <Link to="/about" >About</Link>
        </li>
        <li>
            <Link to="/contact">Contact</Link>
        </li>
        <li>
            <Link to="/services">Services</Link>
        </li>
        
    </ul>
</div>
<div id="mobile" onClick={handleClick}>
    <i id="bar" className={clicked? 'fas fa-times':'fas fa-bars'}></i>
    


</div>
</nav>
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-20 "
        }  bg-purple-950 h-screen p-5 pt-8 relative duration-0 `}
      >
        
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer .w-7 {
            width: 3.75rem;}
top-6 w-7 border-purple-950
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Designer
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-blue-300 text-white text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-yellow-500"
              } `}
            >
              <img src={`./src/assets/${Menu.src}.png`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold ">Home Page</h1>
      </div> */}
    </div>
    <div>
      <h1>i am dhruvam</h1>
    </div>
     </>
    )
}
export default Sidebar
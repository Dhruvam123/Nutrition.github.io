import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import AppointmentBooking from "../AppointmentBooking";
import DuplicatableDivComponent from "./Clients";
import Communication from "../Communication";
import AppointmentList from "../AppointmentList";
import AppointmentList1 from "../AppointmentPatient";
import MessageDisplay from "../MessageDisplay";
import { DataProvider } from "../DataContext";


const Sidebar1 = () => {
  const [open, setOpen] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };

  const renderComponent = () => {
    switch (selectedIcon) {
      case "dashboard":
        return <DataProvider><DuplicatableDivComponent/></DataProvider>;
      case "user":
        return <AppointmentList/>;
      case "messages":
        return <MessageDisplay/>;
      case "analytics":
        return ;
      case "cart":
        return ;
      case "saved":
        return ;
      case "file manager":
        return ;
      default:
        return ;
    }
  };

  return (
    <section className="flex gap-6 ">
      <div
        className={`bg-[#0e0e0e] overflow-y-auto    ${
          open ? "w-72" : "w-16"
        } text-gray-100 px-4`}
      >
        <div className="py-3 mt-20 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-10 flex flex-col gap-6 relative">
          {[
            { name: "dashboard", icon: <MdOutlineDashboard size={20} /> },
            { name: "user", icon: <AiOutlineUser size={20} /> },
            { name: "messages", icon: <FiMessageSquare size={20} /> },
            { name: "analytics", icon: <TbReportAnalytics size={20} /> },
            { name: "File Manager", icon: <FiFolder size={20} /> },
            { name: "Cart", icon: <FiShoppingCart size={20} /> },
            { name: "Saved", icon: <AiOutlineHeart size={20} /> },
            { name: "Setting", icon: <RiSettings4Line size={20} /> },
          ].map((menu, i) => (
            <div
              key={i}
              onClick={() => handleIconClick(menu.name.toLowerCase())}
              className={`group flex items-center text-sm  gap-3.5 font-medium p-2 cursor-pointer hover:bg-gray-800 rounded-md`}
            >
              <div>{menu.icon}</div>
              <h2>{open && menu.name}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="m-auto dhruvam">{renderComponent()}</div>
    </section>
  );
};

export default Sidebar1;

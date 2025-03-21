import type React from "react"
import { LayoutDashboard, BarChart2, Building2, Search } from "lucide-react"
import Frame from "../../assets/Frame.svg"

interface SidebarProps {
  activeItem?: string
}


const DashboardIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.66667 12.5V14.1667M10 9.16667V14.1667M13.3333 5.83333V14.1667M6.5 17.5H13.5C14.9001 17.5 15.6002 17.5 16.135 17.2275C16.6054 16.9878 16.9878 16.6054 17.2275 16.135C17.5 15.6002 17.5 14.9001 17.5 13.5V6.5C17.5 5.09987 17.5 4.3998 17.2275 3.86502C16.9878 3.39462 16.6054 3.01217 16.135 2.77248C15.6002 2.5 14.9001 2.5 13.5 2.5H6.5C5.09987 2.5 4.3998 2.5 3.86502 2.77248C3.39462 3.01217 3.01217 3.39462 2.77248 3.86502C2.5 4.3998 2.5 5.09987 2.5 6.5V13.5C2.5 14.9001 2.5 15.6002 2.77248 16.135C3.01217 16.6054 3.39462 16.9878 3.86502 17.2275C4.3998 17.5 5.09987 17.5 6.5 17.5Z" stroke="white" strokeOpacity="0.5" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  
  const CampaignIcon = () => (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.8333 8.33333C15.7668 8.33333 16.2335 8.33333 16.59 8.15168C16.9036 7.99189 17.1586 7.73692 17.3183 7.42332C17.5 7.0668 17.5 6.60009 17.5 5.66667V5.16667C17.5 4.23325 17.5 3.76654 17.3183 3.41002C17.1586 3.09641 16.9036 2.84145 16.59 2.68166C16.2335 2.5 15.7668 2.5 14.8333 2.5L5.16667 2.5C4.23325 2.5 3.76654 2.5 3.41002 2.68166C3.09641 2.84144 2.84144 3.09641 2.68166 3.41002C2.5 3.76654 2.5 4.23325 2.5 5.16667L2.5 5.66667C2.5 6.60009 2.5 7.0668 2.68166 7.42332C2.84144 7.73692 3.09641 7.99189 3.41002 8.15168C3.76654 8.33333 4.23325 8.33333 5.16667 8.33333L14.8333 8.33333Z" stroke="white" stroke-opacity="0.5" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.8333 17.5C15.7668 17.5 16.2335 17.5 16.59 17.3183C16.9036 17.1586 17.1586 16.9036 17.3183 16.59C17.5 16.2335 17.5 15.7668 17.5 14.8333V14.3333C17.5 13.3999 17.5 12.9332 17.3183 12.5767C17.1586 12.2631 16.9036 12.0081 16.59 11.8483C16.2335 11.6667 15.7668 11.6667 14.8333 11.6667L5.16667 11.6667C4.23325 11.6667 3.76654 11.6667 3.41002 11.8483C3.09641 12.0081 2.84144 12.2631 2.68166 12.5767C2.5 12.9332 2.5 13.3999 2.5 14.3333L2.5 14.8333C2.5 15.7668 2.5 16.2335 2.68166 16.59C2.84144 16.9036 3.09641 17.1586 3.41002 17.3183C3.76654 17.5 4.23325 17.5 5.16667 17.5H14.8333Z" stroke="white" stroke-opacity="0.5" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    
  );
  
  const CompanyIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.0013 12.5003L6.66797 14.167L10.418 10.417M6.66797 6.66699V4.33366C6.66797 3.40024 6.66797 2.93353 6.84962 2.57701C7.00941 2.2634 7.26438 2.00844 7.57798 1.84865C7.9345 1.66699 8.40121 1.66699 9.33464 1.66699H15.668C16.6014 1.66699 17.0681 1.66699 17.4246 1.84865C17.7382 2.00844 17.9932 2.2634 18.153 2.57701C18.3346 2.93353 18.3346 3.40024 18.3346 4.33366V10.667C18.3346 11.6004 18.3346 12.0671 18.153 12.4236C17.9932 12.7372 17.7382 12.9922 17.4246 13.152C17.0681 13.3337 16.6014 13.3337 15.668 13.3337H13.3346M4.33464 18.3337H10.668C11.6014 18.3337 12.0681 18.3337 12.4246 18.152C12.7382 17.9922 12.9932 17.7372 13.153 17.4236C13.3346 17.0671 13.3346 16.6004 13.3346 15.667V9.33366C13.3346 8.40024 13.3346 7.93353 13.153 7.57701C12.9932 7.2634 12.7382 7.00844 12.4246 6.84865C12.0681 6.66699 11.6014 6.66699 10.668 6.66699H4.33464C3.40121 6.66699 2.9345 6.66699 2.57798 6.84865C2.26438 7.00844 2.00941 7.2634 1.84962 7.57701C1.66797 7.93353 1.66797 8.40024 1.66797 9.33366V15.667C1.66797 16.6004 1.66797 17.0671 1.84962 17.4236C2.00941 17.7372 2.26438 17.9922 2.57798 18.152C2.9345 18.3337 3.40121 18.3337 4.33464 18.3337Z" stroke="white" strokeOpacity="0.5" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );



export const Sidebar: React.FC<SidebarProps> = ({ activeItem = "settings" }) => {
// Menu Items Array
const menuItems = [
  { id: "dashboard", icon: <DashboardIcon />, label: "Dashboard" },
  { id: "ad-campaign", icon: <CampaignIcon />, label: "Ad Campaign" },
  { id: "company", icon: <CompanyIcon />, label: "Company" },
];

  return (
    <div className="h-screen w-76 bg-[#03060B] flex flex-col">
      {/* Logo */}
      <div className="p-6 py-7">
        <img src={Frame} alt="Frame" />
      </div>

      {/* Search */}
      <div className="px-5 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3.5  h-5 w-5  text-[#FFFFFF80]" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent text-[#FFFFFF80] rounded-lg py-2.5 pl-10 pr-4 focus:outline-none  border border-gray-700"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`flex items-center px-2 py-1.5 text-[#FFFFFF80]  hover:text-white rounded-md ${
                  activeItem === item.id ? "text-white" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                {item.icon}                
                </div>
                <span className="t font-semibold pl-2 ">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-3.5 border border-gray-700 rounded-xl mx-4 mb-4 flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden mr-2">
          <img src="https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium truncate">Olivia Rhye</p>
          <p className="text-gray-500 text-sm truncate">olivia@untitledui.com</p>
        </div>
      </div>
    </div>
  )
}


import React,{useState} from 'react';
import { Home,Login ,Movie, Person, ShoppingCart, Menu,ExitToApp,Info, Search, AccountCircle } from '@mui/icons-material'; // Import icons
import { useNavigate,Link} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { userActions } from '../store/reducers';
const SlidingMenu = ({ isOpen, closeMenu }) => {
  const {currentUser}=useSelector(state=>state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State to toggle search input
  const [searchQuery, setSearchQuery] = useState(''); 
  const handleSearchSubmit =() => {
    if (!searchQuery) return;
    closeMenu();
    navigate(`/search?query=${searchQuery}`);

  };
  return (
    <div>
       <div>
   
      <div
        onClick={closeMenu}
        className={`fixed inset-0 bg-black bg-opacity-30 z-50 transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      ></div>

    
      <div
        onClick={(e) => e.stopPropagation()} 
        className={`fixed top-0 left-0 h-full w-64 bg-black shadow-lg z-50 transition-transform duration-700 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
          <ul className="flex flex-col p-4 gap-4 text-white-700">
            <li className="hover:bg-gray-700 text-white cursor-pointer p-2 rounded-md flex items-center gap-3"
            onClick={closeMenu} >
                <Menu /> Theater
            </li>
            <li className="hover:bg-gray-700 text-white  cursor-pointer p-2 rounded-md flex items-center gap-3" onClick={()=>
              {navigate('/');
                closeMenu()
              }}>
              <Home /> Home
            </li>
            <Link className="hover:bg-gray-700 text-white cursor-pointer p-2 rounded-md flex items-center gap-3" 
            to={'/movies'} onClick={closeMenu}>
              <Movie /> Movies
            </Link>
           {
            currentUser&& <Link className="hover:bg-gray-700 text-white cursor-pointer p-2 rounded-md flex items-center gap-3"
            to={'/userprofile'} onClick={closeMenu}>
             <Person /> Profile
           </Link>
           }
            {currentUser ? (
              <Link className="hover:bg-gray-700 text-white cursor-pointer p-2 rounded-md flex items-center gap-3"
              to={'/userfood'} onClick={closeMenu}>
                <ShoppingCart /> Cart
              </Link>
            ):(
              <Link className="hover:bg-gray-700 text-white cursor-pointer p-2 rounded-md flex items-center gap-3"
              to={'/Auth'} onClick={closeMenu}>
                <ShoppingCart /> Cart
              </Link>
            )

            }
            {
              currentUser ? (<Link className="hover:bg-gray-700 text-white cursor-pointer p-2 rounded-md flex items-center gap-3"
                to={'/'} onClick={()=>{
                  dispatch(userActions.logout());
                  closeMenu();

                }}>
                <ExitToApp /> SignOut
              </Link>):(<Link className="hover:bg-gray-700 text-white cursor-pointer p-2 rounded-md flex items-center gap-3"
              to={'/Auth'} onClick={()=>{
                closeMenu();
              }}>
                <Login /> SignIn
              </Link>)
            }
            <li className="hover:bg-gray-700 text-white  cursor-pointer p-2 rounded-md flex items-center gap-3"
             onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search /> Search
            </li>
            {isSearchOpen && (
  <div className="mt-1 flex items-center bg-gray-800 rounded-md overflow-hidden">
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="p-2 bg-gray-800 text-white placeholder-gray-500 flex-grow focus:outline-none text-sm"
    />
    <button
      onClick={handleSearchSubmit}
      className="  text-white px-2 text-sm"
    >
      <Search />
    </button>
  </div>
)}

            <li className="hover:bg-gray-700  text-white  cursor-pointer p-2 rounded-md flex items-center gap-3">
            <Info/> About
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SlidingMenu;
import React from 'react'
import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search_icon from'../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import profile_icon from '../../assets/jack.png'
import { Link } from 'react-router-dom'
import { SearchContext } from '../../App'
import { useContext,useState } from 'react'

const Navbar = ({setSidebar}) => {
    const { setSearchQuery } = useContext(SearchContext);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };
    
      const handleSearchClick = () => {
        setSearchQuery(inputValue);
      };

    
  return (
    <nav className='flex-div'>
        <div className='nav-left flex-div'>
            <img className='menu-icon' onClick={()=>setSidebar(prev=>prev  === false?true:false)} src={menu_icon} alt=''></img>
            <Link to='/'><img className='logo' src={logo}></img></Link>

        </div>
        <div className='nav-middle flex-div'>
            <div className='search-box flex-div'>
                <input type='text' placeholder='Search' value={inputValue} onChange={handleInputChange}></input>
                <img src={search_icon} onClick={handleSearchClick} ></img>
            </div>
        </div>

        <div className='nav-right flex-div'>
            <img src={upload_icon}></img>
            <img src={more_icon}></img>
            <img src={notification_icon}></img>
            <img src={profile_icon} className='user-icon'></img>
        </div>
    </nav>
  )
}

export default Navbar
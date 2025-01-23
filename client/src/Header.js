import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";


export default function Header() {
  const {setUserInfo, userInfo} = useContext(UserContext);

  const showSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
  };

  const hideSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
  };
  
  function logout() {
    fetch("https://host-5kkf.onrender.com/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  useEffect(() => {
    fetch("https://host-5kkf.onrender.com/profile", {
      credentials: "include",
    }).then(res => {
      res.json().then(userinfo => {
        setUserInfo(userinfo);
      })
    });
  }, []);

  const username = userInfo?.username;

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/" className='logo'>WENXUAN</Link></li>
          <li className="hideOnMobile"><Link to="/ongoing-projects">Doing</Link></li>
          <li className="hideOnMobile"><Link to="/past-projects">Projects</Link></li>
          <li className="hideOnMobile"><Link to="/work-experience">Experience</Link></li>
          <li className="hideOnMobile"><Link to="/insights-blogs">Blog</Link></li>
          {username && (
          <>
            <li className="hideOnMobile"><Link to="/create">Post New</Link></li>
            <li className="hideOnMobile"><a onClick={logout}>Logout</a></li>
          </>
          )}

          {!username && (
          <>
            <li className="hideOnMobile"><Link to="/admin">Admin</Link></li>
            <li className="hideOnMobile"><Link to="/register">Sign Up</Link></li>
          </>
          )}
          <li className="menuButton" onClick={showSidebar}><Link to="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="28px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></Link></li>
        </ul>

        <ul className="sidebar">
          <li onClick={hideSidebar}><Link to="#"><svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></Link></li>
          <li><Link to="/">WENXUAN</Link></li>
          <li><Link to="ongoing-projects">Doing</Link></li>
          <li><Link to="past-projects">Projects</Link></li>
          <li><Link to="work-experience">Experience</Link></li>
          <li><Link to="insights-blogs">Blogs</Link></li>

          {username && (
          <>
            <li><Link to="/create">Post New</Link></li>
            <li><a onClick={logout}>Logout</a></li>
          </>
          )}

          {!username && (
          <>
            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/register">Sign Up</Link></li>
          </>
          )}

        </ul>
      </nav>
    </header>
  );
}
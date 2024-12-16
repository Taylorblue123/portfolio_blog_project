import { Link } from "react-router-dom";

export default function Header() {
  const showSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
  };

  const hideSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
  };

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/" className='logo'>WENXUAN</Link></li>
          <li className="hideOnMobile"><Link to="ongoing-projects.html">Doing</Link></li>
          <li className="hideOnMobile"><Link to="past-projects.html">Past Projects</Link></li>
          <li className="hideOnMobile"><Link to="work-experience.html">Work Experience</Link></li>
          <li className="hideOnMobile"><Link to="insights-blogs.html">Insights & Blogs</Link></li>
          <li className="hideOnMobile"><Link to="/admin">Admin</Link></li>
          <li className="hideOnMobile"><Link to="/register">Sign Up</Link></li>
          <li className="menuButton" onClick={showSidebar}><Link to="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="28px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></Link></li>
        </ul>

        <ul className="sidebar">
          <li onClick={hideSidebar}><Link to="#"><svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></Link></li>
          <li><Link to="/">WENXUAN</Link></li>
          <li><Link to="ongoing-projects.html">Doing</Link></li>
          <li><Link to="past-projects.html">Past Projects</Link></li>
          <li><Link to="work-experience.html">Work Experience</Link></li>
          <li><Link to="insights-blogs.html">Insights & Blogs</Link></li>
          <li><Link to="/admin">Admin</Link></li>
          <li><Link to="/register">Sign Up</Link></li>
        </ul>
      </nav>
    </header>
  );
}
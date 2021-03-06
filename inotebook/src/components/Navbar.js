import React from 'react'
import { Link,useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  

    const location = useLocation();
    
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/note">iNoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/note"?"active":""}`} aria-current="page" to="/note">Home</Link>
        </li>
        <li className={`nav-link ${location.pathname==="/"? "active":""}`}>
          <Link className="nav-link" to="/">About</Link>
        </li>
        
        
      </ul>
      {!localStorage.getItem("token")? 
      <form className="d-flex">
      <Link className="btn btn-primary mx-2" to="/login"  role="button">Login</Link>
      <Link className="btn btn-primary mx-2" to="/signup"  role="button">Signup</Link>
      </form>: <button className="btn btn-primary mx-2" onClick={Logout}  role="button">Logout</button>}
      
    </div>
  </div>
</nav>
  )
}

export default Navbar

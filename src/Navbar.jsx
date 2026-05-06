import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const Navbar = () => {
  return (
    <>
      <div className="container-fluid mt-3 shadow-sm ">
        <div className="row align-items-center">

          {/* Logo */}
          <div className="col-lg-3 col-6">
            <h3 className="logo mb-0">cinevault</h3>
          </div>

          {/* Menu */}
          <div className="col-lg-7 d-none d-lg-block">
            <ul className="d-flex gap-4 list-unstyled mb-0 justify-content-center">
              <li>
                <Link to='/' className='nav text-decoration-none'>Home</Link>
              </li>
              <li>
                <Link to='/movies' className='nav  text-decoration-none'>Movies</Link>
              </li>
              <li>
                <Link to='/series' className='nav  text-decoration-none'>Series</Link>
              </li>
              <li>
                <Link to='/categories' className='nav  text-decoration-none'>Categories</Link>
              </li>
            </ul>
          </div>

          {/* Icons */}
          <div className="col-lg-2 col-6 d-flex justify-content-end gap-3">
            <i className="text-light  fa-solid fa-magnifying-glass"></i>
            <i className="text-light fa-solid fa-user"></i>
          </div>

        </div>
      </div>
    </>
  )
}

export default Navbar
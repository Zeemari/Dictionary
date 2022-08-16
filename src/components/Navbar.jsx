import React from 'react'
import { FiBook, FiFacebook, FiGithub, FiTwitter } from 'react-icons/fi'

const Navbar = () => {
  return (
    <nav className='nav'>
        <p className='nav__logo'>
          <FiBook />
        </p>

        <ul className='nav__list'>
          <li>
            <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' className='nav__list-item'>
              <FiFacebook />
            </a>
          </li>
          <li>
            <a href='https://twitter.com' target='_blank' rel='noopener noreferrer' className='nav__list-item'>
              <FiTwitter />
            </a>
          </li>
          <li>
            <a href='https://github.com' target='_blank' rel='noopener noreferrer' className='nav__list-item'>
              <FiGithub />
            </a>
          </li>
        </ul>
    </nav>
  )
}

export default Navbar
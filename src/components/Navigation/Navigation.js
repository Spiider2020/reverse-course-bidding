import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss';

function Navigation({ isAuth, handleLogout, role, firstName, lastName }) {
	return (
		<nav className='nav__bar'>
			{firstName !== '' ? (
				<p className='user__details'>
					{firstName} {lastName} &nbsp; - &nbsp; {role}
				</p>
			) : (
				<p className='user__details'> </p>
			)}
			<ul className='nav__list'>
				{!isAuth ? (
					<li className='nav__item'>
						<Link to='/login'>Login</Link>
					</li>
				) : (
					''
				)}
				{!isAuth ? (
					<li className='nav__item'>
						<Link to='/register'>Register</Link>
					</li>
				) : (
					''
				)}
				{isAuth && role === 'Admin' ? (
					<li className='nav__item'>
						<Link to='/postcourse'>Post Course</Link>
					</li>
				) : (
					''
				)}
				{isAuth ? (
					<li className='nav__item'>
						<Link to='/dashboard'>Dashboard</Link>
					</li>
				) : (
					''
				)}
				{isAuth ? (
					<li className='nav__item'>
						<Link to='/profile'>Profile</Link>
					</li>
				) : (
					''
				)}
				{isAuth ? (
					<li className='nav__item'>
						<Link to='/login' onClick={handleLogout}>
							Logout
						</Link>
					</li>
				) : (
					''
				)}
			</ul>
		</nav>
	);
}

export default Navigation;

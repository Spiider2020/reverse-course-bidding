import React from 'react';
import { Link } from 'react-router-dom';
import './AccessRequired.scss';

function AccessRequired({ handleLogout }) {
	return (
		<div className='main__container'>
			<div className='card__container'>
				<img className='card__icon' src='./images/icons/warning.svg' alt='warning' />
				<div className='message__container'>
					<h3>Sorry! You can't access this part of the site.</h3>
					<p>
						You can go back to the <Link to='/dashboard'>Dashboard</Link> or you can{' '}
						<Link to='/login' onClick={handleLogout}>
							Login
						</Link>{' '}
						with a different account.
					</p>
				</div>
			</div>
		</div>
	);
}

export default AccessRequired;

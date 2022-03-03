import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';

function Login({ handleLogin, testUser, error }) {
	const [userData, setUserData] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		handleLogin(userData);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const handleUserClick = (e, user, password) => {
		e.preventDefault();
		const email_field = document.querySelector('#email_field');
		const password_field = document.querySelector('#password_field');
		email_field.value = user;
		password_field.value = password;
		setUserData({ ...userData, email: user, password: password });
	};

	return (
		<div className='container__main'>
			<div className='container__login__form'>
				<h2>Login</h2>
				<form className='login__form' onSubmit={handleSubmit}>
					<label htmlFor='email'>Email</label>
					<input
						className='input__field'
						type='email'
						name='email'
						id='email_field'
						onChange={handleInputChange}
					/>
					<label htmlFor='password'>Password</label>
					<input
						className='input__field'
						type='password'
						name='password'
						id='password_field'
						onChange={handleInputChange}
					/>
					<input className='input__button' type='submit' value='Login' />
				</form>
				<p className='error__text'>&nbsp;{error}</p>
				<p>Don't have an account?</p>
				<span className='form__link'>
					<Link to='/register'>Register</Link>
				</span>
			</div>
			<div className='login__accounts__container'>
				<h2>Hardcoded Accounts</h2>
				<div className='login__accounts'>
					{testUser.map((item, index) => (
						<div
							className='login__user'
							key={index}
							onClick={(e) => handleUserClick(e, item.email, item.password)}
						>
							<ul>
								<li className='main__li'>user :</li>
								<li className='secondary__li user'>{item.email}</li>
								<li className='main__li'>password :</li>
								<li className='secondary__li password'>{item.password}</li>
								<li className='main__li'>type :</li>
								<li className='secondary__li'>{item.role.toUpperCase()}</li>
							</ul>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Login;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.scss';

function Register({ handleRegister, error }) {
	const [accountData, setAccountData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		role: 'student',
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setAccountData({ ...accountData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleRegister(accountData);
	};

	return (
		<div className='container__main'>
			<div className='container__register__form'>
				<h2>Register</h2>
				<form className='register__form' onSubmit={handleSubmit}>
					<label htmlFor='firstName'>First Name</label>
					<input
						className='input__field'
						type='text'
						name='firstName'
						value={accountData['firstName']}
						onChange={handleInputChange}
					/>
					<label htmlFor='lastName'>Last Name</label>
					<input
						className='input__field'
						type='text'
						name='lastName'
						value={accountData['lastName']}
						onChange={handleInputChange}
					/>
					<label htmlFor='email'>Email</label>
					<input
						className='input__field'
						type='email'
						name='email'
						value={accountData['email']}
						onChange={handleInputChange}
					/>
					<label htmlFor='password'>Password</label>
					<input
						className='input__field'
						type='password'
						name='password'
						value={accountData['password']}
						onChange={handleInputChange}
					/>
					<div className='radio__buttons'>
						<label>
							<input
								type='radio'
								name='role'
								value='student'
								checked={accountData.role === 'student'}
								onChange={handleInputChange}
							/>
							Student
						</label>
						<label>
							<input
								type='radio'
								name='role'
								value='teacher'
								checked={accountData.role === 'teacher'}
								onChange={handleInputChange}
							/>
							Teacher
						</label>
					</div>
					<input className='input__button' type='submit' value='Register' />
				</form>
				<p className='error__text'>&nbsp;{error}</p>
				<p>Do you already have an account?</p>
				<span className='form__link'>
					<Link to='/login'>Login</Link>
				</span>
			</div>
		</div>
	);
}

export default Register;

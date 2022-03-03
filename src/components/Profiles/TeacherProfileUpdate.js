import React, { useState } from 'react';
import './TeacherProfileUpdate.scss';

const capitalizeStr = (text) => {
	let caps = text.charAt(0).toUpperCase() + text.slice(1);
	return caps;
};

function TeacherProfileUpdate({ handleProfileUpdate }) {
	const [accountData, setAccountData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		qualifications: '',
		experience: '',
	});

	const resetFields = () => {
		setAccountData({
			firstName: '',
			lastName: '',
			email: '',
			qualifications: '',
			experience: '',
		});
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (name === 'firstName' || name === 'lastName') {
			setAccountData({ ...accountData, [name]: capitalizeStr(value) });
		} else {
			setAccountData({ ...accountData, [name]: value });
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let tempUser = {};
		for (let key in accountData) {
			if (accountData[key] !== '') {
				tempUser[key] = accountData[key];
			}
		}
		resetFields();
		handleProfileUpdate(tempUser);
	};

	return (
		<div className='teacher__update__container' onSubmit={handleSubmit}>
			<h2>Update Profile</h2>
			<form className='update__teacher__form'>
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
				<label htmlFor='qualifications'>Qualifications</label>
				<textarea
					className='input__textarea'
					name='qualifications'
					rows='4'
					cols='40'
					value={accountData['qualifications']}
					onChange={handleInputChange}
				></textarea>
				<label htmlFor='experience'>Experience</label>
				<textarea
					className='input__textarea'
					name='experience'
					rows='4'
					cols='40'
					value={accountData['experience']}
					onChange={handleInputChange}
				></textarea>
				<input className='input__button' type='submit' value='Update' />
			</form>
		</div>
	);
}

export default TeacherProfileUpdate;

import React, { useState, useEffect } from 'react';
import './ChangePassword.scss';

function ChangePassword({ handlePasswordChange, handleMessageReset, error, confirmation, callerComp }) {
	const [internalError, setInternalError] = useState('');
	const [internalConfirmation, setInternalConfirmation] = useState('');
	const [passwordData, setPasswordData] = useState({
		oldPassword: '',
		newPassword: '',
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setPasswordData({ ...passwordData, [name]: value });
		if (confirmation !== '' || error !== '') {
			handleMessageReset();
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (passwordData.oldPassword === '' || passwordData.newPassword === '') {
			setInternalError('Both fileds need to be filled in');
		} else {
			handlePasswordChange(passwordData);
			setPasswordData({ oldPassword: '', newPassword: '' });
		}
	};

	useEffect(() => {
		if (callerComp === 'ChangePassword') {
			setInternalConfirmation(confirmation);
		}
		if (callerComp === '') {
			setInternalConfirmation('');
		}
	}, [confirmation, callerComp]);

	useEffect(() => {
		if (callerComp === 'ChangePassword') {
			setInternalError(error);
		}
		if (callerComp === '') {
			setInternalError('');
		}
	}, [error, callerComp]);

	return (
		<div className='password__change__container' onSubmit={handleSubmit}>
			<h2>Change Password</h2>
			<form className='password__change__form'>
				<label htmlFor='oldPassword'>Old Password</label>
				<input
					className='input__field'
					type='password'
					name='oldPassword'
					value={passwordData['oldPassword']}
					onChange={handleInputChange}
				/>
				<label htmlFor='newPassword'>New Password</label>
				<input
					className='input__field'
					type='password'
					name='newPassword'
					pattern='[A-Za-z0-9]{4,20}'
					value={passwordData['newPassword']}
					onChange={handleInputChange}
				/>
				<input className='input__button' type='submit' value='Change' />
			</form>
			{internalConfirmation !== '' ? (
				<p className='confirmation__text'>&nbsp;{internalConfirmation}</p>
			) : (
				<p className='error__text'>&nbsp;{internalError}</p>
			)}
		</div>
	);
}

export default ChangePassword;

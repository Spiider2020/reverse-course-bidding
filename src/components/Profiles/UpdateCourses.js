import React, { useState, useEffect } from 'react';
import './UpdateCourses.scss';

function UpdateCourses({ handleTeacherAddCourse, handleMessageReset, siteCourses, confirmation, callerComp }) {
	const [internalError, setInternalError] = useState('');
	const [internalConfirmation, setInternalConfirmation] = useState('');
	const [courseData, setCourseData] = useState({
		id: 1,
		price: 0,
	});

	const resetField = () => {
		setCourseData({
			id: 1,
			price: 0,
		});
		setInternalError('');
		let priceField = document.querySelector('#myprice');
		let selectField = document.querySelector('#courseselect');
		selectField.value = 1;
		priceField.value = '';
	};

	const handlePriceChange = (e) => {
		setCourseData({ ...courseData, price: parseInt(e.target.value) });
		if (confirmation !== '') {
			handleMessageReset();
		}
	};

	const handleCourseSelect = (e) => {
		setCourseData({ ...courseData, id: parseInt(e.target.value) });
		console.log(courseData);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (courseData.price === '') {
			setInternalError('Price need to be different than 0');
		} else {
			handleTeacherAddCourse(courseData);
			resetField();
		}
	};

	useEffect(() => {
		if (callerComp === 'UpdateCourses') {
			setInternalConfirmation(confirmation);
		}
		if (callerComp === '') {
			setInternalConfirmation('');
		}
	}, [confirmation, callerComp]);

	return (
		<div className='update__courses__container'>
			<h2>Update Courses</h2>
			<form className='add__course__form' onSubmit={handleSubmit}>
				<label htmlFor='courseselect'>Select course to add or update:</label>
				<select name='courseselect' id='courseselect' onChange={handleCourseSelect}>
					{siteCourses.map((item, index) => {
						return item.deleted ? (
							<></>
						) : (
							<option value={item.id} key={'course_sel' + index}>
								{item.name}
							</option>
						);
					})}
				</select>
				<label htmlFor='price'>Price (set to 0 to remove course)</label>
				<input className='input__field' type='number' name='price' id='myprice' onChange={handlePriceChange} />
				<input className='input__button' type='submit' value='Add/Update' />
				{internalConfirmation !== '' ? (
					<p className='confirmation__text'>&nbsp;{internalConfirmation}</p>
				) : (
					<p className='error__text'>&nbsp;{internalError}</p>
				)}
			</form>
		</div>
	);
}

export default UpdateCourses;

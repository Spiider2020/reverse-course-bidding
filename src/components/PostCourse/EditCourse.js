import React, { useState } from 'react';
import './EditCourse.scss';

function EditCourse({ courseData, handleEditCourse, handleResetAfterEdit }) {
	const [course, setCourse] = useState(courseData);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCourse({ ...course, [name]: value });
	};

	const handlePriceChange = (e) => {
		const { name } = e.target;
		const value = e.target.validity.valid ? e.target.value : course.price;
		setCourse({ ...course, [name]: value });
	};

	const handleCancelEdit = () => {
		setCourse(courseData);
		handleResetAfterEdit();
	};

	const handleApplyEdit = () => {
		handleEditCourse(course);
		handleResetAfterEdit();
	};

	return (
		<div className='edit__form__container'>
			<div className='edit__form__data'>
				<div className='edit__data__main'>
					<label htmlFor='name'>Course name</label>
					<br />
					<input
						type='text'
						name='name'
						className='edit__field'
						value={course['name']}
						onChange={handleInputChange}
					/>
					<br />
					<label htmlFor='price'>Course price</label>
					<br />
					<input
						type='text'
						pattern='[0-9]*'
						name='price'
						className='edit__field'
						value={course['price']}
						onChange={handlePriceChange}
					/>
					<br />
				</div>
				<div className='edit__data__description'>
					<label htmlFor='info'>Description</label>
					<textarea
						type='textarea'
						name='info'
						className='description__field'
						rows='4'
						value={course['info']}
						onChange={handleInputChange}
					/>
				</div>
			</div>
			<div className='edit__button__container'>
				<div className='apply__edit__button' onClick={handleApplyEdit}>
					Apply
				</div>
				<div className='cancel__edit__button' onClick={handleCancelEdit}>
					Cancel
				</div>
			</div>
		</div>
	);
}

export default EditCourse;

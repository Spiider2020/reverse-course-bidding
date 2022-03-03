import React, { useState } from 'react';
import './AddCourse.scss';

function AddCourse({ handleAddCourse, handleUpdateList }) {
	const [course, setCourse] = useState({
		name: '',
		price: '',
		info: '',
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCourse({ ...course, [name]: value });
	};

	const handlePriceChange = (e) => {
		const { name } = e.target;
		const value = e.target.validity.valid ? e.target.value : course.price;
		setCourse({ ...course, [name]: value });
	};

	const handleAddExpand = (e) => {
		let btnContainer = e.target.parentElement;
		let formContainer = e.target.nextElementSibling;
		if (e.target.tagName === 'H3') {
			btnContainer = e.target.parentElement.parentElement;
			formContainer = e.target.parentElement.nextSibling;
		}
		btnContainer.classList.add('btn__container__expanded');
		formContainer.classList.add('add__form__active');
	};

	const handleAdd = (e) => {
		let btnContainer = e.target.parentElement.parentElement.parentElement;
		let formContainer = e.target.parentElement.parentElement;
		let warningElement = document.querySelector('#add-warning');
		if (course.name === '' || course.price === '' || course.info === '') {
			warningElement.textContent = 'All fields should be filled in.';
			return;
		}
		btnContainer.classList.remove('btn__container__expanded');
		formContainer.classList.remove('add__form__active');
		warningElement.textContent = '';
		setTimeout(() => {
			handleAddCourse(course);
			handleUpdateList();
			setCourse({ name: '', price: '', info: '' });
		}, 500);
	};

	const handleCancelAdd = (e) => {
		let btnContainer = e.target.parentElement.parentElement.parentElement;
		let formContainer = e.target.parentElement.parentElement;
		let warningElement = document.querySelector('#add-warning');
		btnContainer.classList.remove('btn__container__expanded');
		formContainer.classList.remove('add__form__active');
		warningElement.textContent = '';
		setCourse({ name: '', price: '', info: '' });
	};

	return (
		<div className='add__course__btn__container'>
			<div className='h3__button' onClick={handleAddExpand}>
				<h3>Add Course</h3>
			</div>
			<div className='add__form__container '>
				<h3>Add Course</h3>
				<div className='add__form__main'>
					<div className='add__form__data'>
						<label htmlFor='name'>Course name</label>
						<br />
						<input
							type='text'
							name='name'
							className='add__field'
							value={course['name']}
							onChange={handleInputChange}
						/>
						<br />
						<div className='spacer__div'></div>
						<label htmlFor='price'>Course price</label>
						<br />
						<input
							type='text'
							pattern='[0-9]*'
							name='price'
							className='add__field'
							value={course['price']}
							onChange={handlePriceChange}
						/>
						<br />
					</div>
					<div className='add__form__info'>
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
				<div className='add__button__container'>
					<div className='add__course__button' onClick={handleAdd}>
						Add Course
					</div>
					<div className='cancel__add__button' onClick={handleCancelAdd}>
						Cancel
					</div>
				</div>
			</div>
			<div className='warning__container'>
				<p id='add-warning'></p>
			</div>
		</div>
	);
}

export default AddCourse;

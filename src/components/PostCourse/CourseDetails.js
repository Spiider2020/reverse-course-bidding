import React, { useState } from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import DeleteCourse from './DeleteCourse';
import EditCourse from './EditCourse';
import './CourseDetails.scss';

function CourseDetails({ courseData, handleRemoveCourse, handleEditCourse, handleUpdateList }) {
	const [action, setAction] = useState('');

	const handleResetAfterRemove = () => {
		setAction('');
		handleUpdateList();
	};

	const handleResetAfterEdit = () => {
		setAction('');
		const allEdit = document.querySelectorAll('.course__data__edit');
		for (let i = 0; i < allEdit.length; i++) {
			allEdit[i].classList.remove('edit__data__active');
		}
		handleUpdateList();
	};

	const handleEditClick = (e) => {
		e.target.focus();
		let editContainer = e.target.parentElement.parentElement.nextSibling;
		if (e.target.tagName === 'path') {
			editContainer = e.target.parentElement.parentElement.parentElement.parentElement.nextSibling;
		}
		if (e.target.tagName === 'svg') {
			editContainer = e.target.parentElement.parentElement.parentElement.nextSibling;
		}
		const deleteContainer = editContainer.nextSibling;
		if (action === '') {
			editContainer.classList.add('edit__data__active');
			setAction('edit');
		}
		if (action === 'edit') {
			editContainer.classList.remove('edit__data__active');
			setAction('');
		}
		if (action === 'delete') {
			deleteContainer.classList.remove('delete__data__active');
			setTimeout(() => {
				editContainer.classList.add('edit__data__active');
			}, 400);
			setAction('edit');
		}
	};

	const handleDeleteClick = (e) => {
		let editContainer = e.target.parentElement.parentElement.nextSibling;
		if (e.target.tagName === 'path') {
			editContainer = e.target.parentElement.parentElement.parentElement.parentElement.nextSibling;
		}
		if (e.target.tagName === 'svg') {
			editContainer = e.target.parentElement.parentElement.parentElement.nextSibling;
		}
		const deleteContainer = editContainer.nextSibling;
		if (action === '') {
			deleteContainer.classList.add('delete__data__active');
			setAction('delete');
		}
		if (action === 'delete') {
			deleteContainer.classList.remove('delete__data__active');
			setAction('');
		}
		if (action === 'edit') {
			editContainer.classList.remove('edit__data__active');
			setTimeout(() => {
				deleteContainer.classList.add('delete__data__active');
			}, 400);
			setAction('delete');
		}
	};

	return (
		<div className='course__data__container'>
			<div className='course__data__main'>
				<div className='course__info__container'>
					<h3>{courseData.name}</h3>
					<div className='small__items__container'>
						<p>ID: {courseData.id}</p>
						<p>Price: {courseData.price}</p>
					</div>
					<p>{courseData.info}</p>
				</div>
				<div className='course__action__container'>
					<span
						className={action !== 'edit' ? 'edit__button' : 'edit__button edit__clicked'}
						onClick={handleEditClick}
					>
						<MdEdit /> Edit
					</span>
					<span
						className={action !== 'delete' ? 'delete__button' : 'delete__button delete__clicked'}
						onClick={handleDeleteClick}
					>
						<MdDeleteForever /> Delete
					</span>
				</div>
			</div>
			<div className='course__data__edit'>
				<EditCourse
					courseData={courseData}
					handleEditCourse={handleEditCourse}
					handleResetAfterEdit={handleResetAfterEdit}
				/>
			</div>
			<div className='course__data__delete'>
				<DeleteCourse
					courseId={courseData.id}
					handleRemoveCourse={handleRemoveCourse}
					handleResetAfterRemove={handleResetAfterRemove}
				/>
			</div>
		</div>
	);
}

export default CourseDetails;

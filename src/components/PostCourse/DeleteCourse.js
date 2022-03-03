import React from 'react';
import './DeleteCourse.scss';

function DeleteCourse({ courseId, handleRemoveCourse, handleResetAfterRemove }) {
	const handleDelete = (e) => {
		e.preventDefault();
		const courseContainer = e.target.parentElement.parentElement.parentElement;
		const deleteContainer = e.target.parentElement.parentElement;
		deleteContainer.classList.remove('delete__data__active');
		setTimeout(() => {
			courseContainer.classList.add('course__deleted');
		}, 400);
		setTimeout(() => {
			courseContainer.classList.remove('course__deleted');
		}, 900);
		setTimeout(() => {
			handleRemoveCourse(courseId);
			handleResetAfterRemove();
		}, 900);
	};

	return (
		<div className='delete__confirmation__container'>
			<p>Are you sure you want to delete this course?</p>
			<div className='delete__button' onClick={handleDelete}>
				Yes, Delete
			</div>
		</div>
	);
}

export default DeleteCourse;

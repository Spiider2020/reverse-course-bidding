import React from 'react';
import './CourseHistory.scss';

function CourseHistory({ completedCourses }) {
	const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
	return (
		<div className='course__history__container'>
			<div className='history__stats__container'>
				<div className='stats__block'>
					<h4>Courses Completed</h4>
					<p>{completedCourses.length}</p>
				</div>
				<div className='stats__block'>
					<h4>Total Earned</h4>
					<p>
						{completedCourses.reduce((accumulator, item) => {
							return accumulator + item.earned;
						}, 0)}
					</p>
				</div>
			</div>
			<h3>Completed Courses</h3>
			<div className='history__completed__container'>
				{completedCourses.length === 0 ? (
					<div className='no__completed__courses'>
						<p>You dont have any completed courses yet.</p>
					</div>
				) : (
					<></>
				)}
				{completedCourses.map((item, index) => {
					return (
						<div className='completed__card' key={'completed-' + index}>
							<div className='completed__card__field no__border__left'>{item.courseName}</div>
							<div className='completed__card__field'>
								{new Intl.DateTimeFormat('en-GB', options).format(item.date)}
							</div>
							<div className='completed__card__field'>{item.timeSlot + 9 + ':00'}</div>
							<div className='completed__card__field'>{item.earned}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default CourseHistory;

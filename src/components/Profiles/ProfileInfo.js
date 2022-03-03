import React from 'react';
import './ProfileInfo.scss';

function ProfileInfo({ data, siteCourses }) {
	const getCourseName = (cId) => {
		for (let i = 0; i < siteCourses.length; i++) {
			if (siteCourses[i].id === cId) {
				return siteCourses[i].name;
			}
		}
	};

	return (
		<div className='profile__info__container'>
			<h2>Profile Information</h2>
			<div className='profile__info__row'>
				<span>Name:</span>
				<span>
					{data.firstName} {data.lastName}
				</span>
			</div>
			<div className='profile__info__row'>
				<span>Email:</span>
				<span>{data.email}</span>
			</div>
			<div className='profile__info__row'>
				<span>UserId:</span>
				<span>{data.id}</span>
			</div>
			<div className='profile__info__row'>
				<span>Accout Type:</span>
				<span>{data.role}</span>
			</div>
			{data.role === 'Teacher' ? (
				<>
					<div className='profile__info__block'>
						<span>Qualification:</span>
						<div>{data.qualifications}</div>
					</div>
					<div className='profile__info__block'>
						<span>Experience:</span>
						<div>{data.experience}</div>
					</div>
				</>
			) : (
				''
			)}

			{data.role === 'Teacher' ? (
				<div className='profile_taught_courses'>
					<h3>Taught course:</h3>
					<div className='profile__course__row title__row'>
						<span>Name</span>
						<span>Price</span>
					</div>
					{data.taughtCourses.map((item, index) => {
						return (
							<div
								className={index % 2 === 0 ? 'profile__course__row grey__row' : 'profile__course__row'}
								key={'course' + index}
							>
								<span>{getCourseName(item.courseId)}</span>
								<span>{item.price}</span>
							</div>
						);
					})}
				</div>
			) : (
				''
			)}
		</div>
	);
}

export default ProfileInfo;

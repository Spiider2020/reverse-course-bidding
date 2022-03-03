import React from 'react';
import { FiInfo } from 'react-icons/fi';
import './YourBookings.scss';

function YourBookings({ bookedCourses, role }) {
	const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
	return (
		<div className='bookings__container'>
			<div className='bookings__titlebar'>
				<span>Booking List</span>
				<span>Booking count: {bookedCourses.length}</span>
			</div>
			<div className='bookings__list'>
				{bookedCourses.length === 0 ? (
					<div className='no__courses'>
						<p>Your dont have any courses booked yet</p>
					</div>
				) : (
					<></>
				)}
				{bookedCourses.map((item, index) => {
					return (
						<div className='booking__card' key={'bcard-' + index}>
							<h3>{item.courseName}</h3>
							<p>Course Description:</p>
							<p className='booking__description'>{item.courseInfo}</p>
							<div className='info__block__container'>
								<div className='info__block'>
									<h4>Booking date:</h4>
									<p>{new Intl.DateTimeFormat('en-GB', options).format(item.date)}</p>
									<h4>Booking Time Slot:</h4>
									<p>
										{item.timeSlot + 9 + ':00 - '} {item.timeSlot + 10 + ':00'}
									</p>
								</div>
								{role === 'Student' || role === 'Admin' ? (
									<div className='info__block'>
										<h4>Teacher</h4>
										<p>{item.teacherName}</p>
									</div>
								) : (
									<></>
								)}
								{role === 'Teacher' || role === 'Admin' ? (
									<div className='info__block'>
										<h4>Student</h4>
										<p>{item.studentName}</p>
									</div>
								) : (
									<></>
								)}
								{role === 'Admin' ? (
									<div className='info__block'>
										<h4>Price</h4>
										<div className='info__block__price'>
											<p>Course price:</p>
											<p>{item.price}</p>
										</div>
										<div className='info__block__price'>
											<p>Teacher price:</p>
											<p>{item.teacherPrice}</p>
										</div>
										<div className='price__profit__separator'></div>
										<div className='info__block__price'>
											<p>Profit:</p>
											<p>{item.price - item.teacherPrice}</p>
										</div>
									</div>
								) : (
									<div className='info__block'>
										<h4>Price</h4>
										<div className='info__block__price'>
											<p>Course price:</p>
											<p>{item.price}</p>
										</div>
									</div>
								)}
							</div>
							{item.courseDeleted ? (
								<div className='deleted__warning'>
									<FiInfo />
									<p>Course no longer available for booking. This does not affect this booking.</p>
								</div>
							) : (
								<></>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default YourBookings;

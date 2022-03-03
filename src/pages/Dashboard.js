import React, { useState } from 'react';
import YourBookings from '../components/Dashboard/YourBookings';
import BookCourse from '../components/Dashboard/BookCourse';
import CourseHistory from '../components/Dashboard/CourseHistory';
import './Dashboard.scss';

function Dashboard({ data, siteCourses, getTeachersTimeslots, handleBookCourse, refreshUserCourses }) {
	const [selectedTab, setSelectedTab] = useState('yourbookings');

	const handleTabSelect = (e) => {
		if (e.target.id === 'yourbookings') {
			refreshUserCourses();
		}
		setSelectedTab(e.target.id);
	};

	const GetTabContent = () => {
		switch (selectedTab) {
			case 'yourbookings':
				return (
					<YourBookings
						bookedCourses={data.bookedCourses}
						refreshUserCourses={refreshUserCourses}
						role={data.role}
					/>
				);
			case 'bookcourse':
				return (
					<BookCourse
						getTeachersTimeslots={getTeachersTimeslots}
						handleBookCourse={handleBookCourse}
						siteCourses={siteCourses}
						userTimeslots={data.timeSlots}
						handleToBookings={handleTabSelect}
					/>
				);
			case 'coursehistory':
				return <CourseHistory completedCourses={data.completedCourses} />;
			default:
				return <p>Something went wrong!!!</p>;
		}
	};

	return (
		<div className='dashboard__main__container'>
			<div className='dashboard__content__container'>
				<div className='dashboard__menu'>
					<div
						id='yourbookings'
						className={
							selectedTab === 'yourbookings' ? 'menu__tab active__tab left__tab' : 'menu__tab left__tab'
						}
						onClick={handleTabSelect}
					>
						{data.role === 'Admin' ? 'All Bookings' : 'Your Bookings'}
					</div>
					{data.role === 'Student' ? (
						<div
							id='bookcourse'
							className={
								selectedTab === 'bookcourse'
									? 'menu__tab active__tab right__tab'
									: 'menu__tab right__tab'
							}
							onClick={handleTabSelect}
						>
							Book Course
						</div>
					) : (
						<>
							{data.role === 'Admin' ? (
								<></>
							) : (
								<div
									id='coursehistory'
									className={
										selectedTab === 'coursehistory'
											? 'menu__tab active__tab right__tab'
											: 'menu__tab right__tab'
									}
									onClick={handleTabSelect}
								>
									Course History
								</div>
							)}
						</>
					)}
				</div>
				<div className='dashboard__content'>
					<GetTabContent />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;

import React, { useState } from 'react';
import { Calendar } from 'react-date-range';
import { getDay, addDays } from 'date-fns';
import { enGB } from 'date-fns/locale';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './BookCourse.scss';

function BookCourse({ getTeachersTimeslots, handleBookCourse, siteCourses, userTimeslots, handleToBookings }) {
	// state initialization
	const [selectedDate, setSelectedDate] = useState();
	const [steps, setSteps] = useState([
		{ number: 0, label: 'Choose Course', completed: false },
		{ number: 1, label: 'Choose Date', completed: false },
		{ number: 2, label: 'Choose Time', completed: false },
		{ number: 3, label: 'Select Payment', completed: false },
		{ number: 4, label: 'All done', completed: false },
	]);
	const [currentStep, setCurrentStep] = useState(steps[0]);
	const [newBooking, setNewBooking] = useState({
		courseId: 0,
		teacherId: '',
		price: 0,
		date: null,
		timeSlot: -1,
	});
	const [payed, setPayed] = useState(false);
	const options = { day: 'numeric', month: 'numeric', year: 'numeric' };

	//book components
	const SelectCourse = () => {
		return (
			<div className='select__course__container'>
				{siteCourses.map((item, index) => {
					return item.deleted ? (
						<></>
					) : (
						<div
							className='select__course__button'
							role='button'
							cid={item.id}
							cprice={item.price}
							key={'cbtn-' + index}
							onClick={handleCourseSelect}
						>
							<div className='select__course__info'>
								<h2 className='select__course__name'>{item.name}</h2>
								<div className='select__course__description'>
									<p>{item.info}</p>
								</div>
							</div>
							<div className='select__course__price'>{item.price}</div>
						</div>
					);
				})}
			</div>
		);
	};

	const SelectDate = () => {
		return (
			<div className='calendar__container'>
				<Calendar
					locales={enGB}
					onChange={handleDateSelect}
					date={selectedDate}
					minDate={addDays(new Date(), 1)}
					disabledDay={disableDates}
					weekStartsOn={1}
				/>
				<button className='selection__back__button' onClick={goBack}>
					Back
				</button>
			</div>
		);
	};
	const SelectTime = () => {
		let teacherSlots = getTeachersTimeslots(newBooking.date, newBooking.courseId);
		let availableSlots = checkUserSlots(teacherSlots, userTimeslots);
		return (
			<div className='select__time__container'>
				<div className='select__time__data'>
					<SelectionInfo />
					<h4>Available Time Slots</h4>
					<div className='timeslots__container'>
						{availableSlots.map((item, index) => {
							return (
								<button
									className={
										item === ''
											? 'timeslot__select__button timeslot__disabled'
											: 'timeslot__select__button'
									}
									key={'timeslot-' + index}
									onClick={handleSlotSelect}
									data={item}
									slot={index}
									disabled={item === ''}
								>
									{index + 9 + ':00 - '}
									{index + 10 + ':00'}
								</button>
							);
						})}
					</div>
				</div>
				<button className='selection__back__button' onClick={goBack}>
					Back
				</button>
			</div>
		);
	};
	const MakePayment = () => {
		return (
			<div className='make__payment__container'>
				<div className='payment__data'>
					<SelectionInfo />
					<div className='payment__method'>
						<input type='checkbox' name='payforthis' defaultChecked={payed} onChange={handlePayment} />
						<label htmlFor='payforthis'>Pay locally</label>
					</div>
				</div>
				{payed ? (
					<button className='selection__back__button book__course__button' onClick={handleBookingSubmit}>
						Book Course
					</button>
				) : (
					<></>
				)}
				<button className='selection__back__button' onClick={goBack}>
					Back
				</button>
			</div>
		);
	};
	const BookingCompleted = () => {
		return (
			<div className='booking__complete'>
				<div className='booking__confirmation'>
					<h3>You have successfully booked a course</h3>
					<h4>Booking Info</h4>
					<div className='booking__confirmation__data'>
						<div className='confirmation__data__row'>
							<p>Course name:</p>
							<p>{getCourseName(newBooking.courseId)}</p>
						</div>
						<div className='confirmation__data__row'>
							<p>Course price:</p>
							<p>{newBooking.price}</p>
						</div>
						<div className='confirmation__data__row'>
							<p>Course date:</p>
							<p>{new Intl.DateTimeFormat('en-GB', options).format(newBooking.date)}</p>
						</div>
						<div className='confirmation__data__row'>
							<p>Course time:</p>
							<p>
								{newBooking.timeSlot + 9 + ':00 - '}
								{newBooking.timeSlot + 10 + ':00'}
							</p>
						</div>
					</div>
				</div>
				<button id='yourbookings' className='booking__complete__button' onClick={handleToBookings}>
					See your bookings
				</button>
			</div>
		);
	};

	const SelectionInfo = () => {
		return (
			<div className='current__selection__info'>
				<div className='selection__info__block'>
					<h4>Selected course:</h4>
					<p>{getCourseName(newBooking.courseId)}</p>
				</div>
				<div className='selection__info__block'>
					<h4>Selected date:</h4>
					<p>{new Intl.DateTimeFormat('en-GB', options).format(newBooking.date)}</p>
				</div>
				<div className='selection__info__block'>
					<h4>Course price:</h4>
					<p>{newBooking.price}</p>
				</div>
				{newBooking.timeSlot !== -1 ? (
					<div className='selection__info__block'>
						<h4>Selected Time:</h4>
						<p>
							{newBooking.timeSlot + 9 + ':00 - '}
							{newBooking.timeSlot + 10 + ':00'}
						</p>
					</div>
				) : (
					<></>
				)}
			</div>
		);
	};

	// Helper Functions
	const goToNext = () => {
		setSteps(
			steps.map((step) => {
				if (step.number === currentStep.number) {
					step.completed = true;
				}
				return step;
			})
		);
		console.log('current step', currentStep.number + 1);
		setCurrentStep(steps[currentStep.number + 1]);
	};

	const goBack = () => {
		setSteps(
			steps.map((step) => {
				if (step.number === currentStep.number - 1) {
					step.completed = false;
				}
				return step;
			})
		);
		setCurrentStep(steps[currentStep.number - 1]);
	};

	const disableDates = (date) => {
		return getDay(date) === 6 || getDay(date) === 0;
	};

	const getCourseName = (id) => {
		for (let i = 0; i < siteCourses.length; i++) {
			if (siteCourses[i].id === id) {
				return siteCourses[i].name;
			}
		}
		return 'Course NOT FOUND';
	};

	const checkUserSlots = (teacherSlots, userSlots) => {
		let tempSlots = [...teacherSlots];
		for (let i = 0; i < userSlots.length; i++) {
			if (userSlots[i].date.toString() === newBooking.date.toString()) {
				for (let j = 0; j < userSlots[i].slots.length; j++) {
					if (userSlots[i].slots[j] === 1) {
						tempSlots[j] = '';
					}
				}
			}
		}
		return tempSlots;
	};

	const handleCourseSelect = (e) => {
		setNewBooking({
			...newBooking,
			courseId: parseInt(e.target.attributes.cid.value),
			price: parseInt(e.target.attributes.cprice.value),
		});
		console.log(newBooking);
		goToNext();
	};

	const handleDateSelect = (e) => {
		setSelectedDate(e);
		setNewBooking({
			...newBooking,
			date: e,
		});
		goToNext();
	};

	const handleSlotSelect = (e) => {
		setNewBooking({
			...newBooking,
			teacherId: e.target.attributes.data.value,
			timeSlot: parseInt(e.target.attributes.slot.value),
		});
		goToNext();
	};

	const handlePayment = (e) => {
		setPayed(!payed);
	};
	const handleBookingSubmit = () => {
		goToNext();
		handleBookCourse(newBooking);
	};

	return (
		<div className='book__box__container'>
			<div className='book__steps__container'>
				{steps.map((step, index) => {
					return (
						<>
							{index < steps.length - 1 ? (
								<div className='step__container' key={'step-' + index}>
									<div className='step__number'>
										{step.completed ? (
											<div className='step__completed'>&#10004;</div>
										) : (
											<div
												className={
													step.number === currentStep.number
														? 'step__normal step__active'
														: 'step__normal'
												}
											>
												{index + 1}
											</div>
										)}
										<p className='step__number-label'>{step.label}</p>
										{index < steps.length - 2 ? (
											<div
												className={
													index < currentStep.number
														? 'step__divider step__divider__loaded'
														: 'step__divider'
												}
											>
												<div className='step__loader'></div>
											</div>
										) : (
											<></>
										)}
									</div>
								</div>
							) : (
								<></>
							)}
						</>
					);
				})}
			</div>
			<div className='book__component__container'>
				{currentStep.number === 0 ? (
					<SelectCourse />
				) : (
					<>
						{currentStep.number === 1 ? (
							<SelectDate />
						) : (
							<>
								{currentStep.number === 2 ? (
									<SelectTime />
								) : (
									<>
										{currentStep.number === 3 ? (
											<MakePayment />
										) : (
											<>{currentStep.number === 4 ? <BookingCompleted /> : <></>}</>
										)}
									</>
								)}
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
}

export default BookCourse;

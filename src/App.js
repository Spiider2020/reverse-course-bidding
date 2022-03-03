import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AdRoute from './components/PrivateRoute/AdRoute';
import AccessRequired from './pages/AccessRequired';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PostCourse from './pages/PostCourse';
// import { parse } from 'date-fns/esm';

// ---------------- Hardcoded data -------------------
const testUser = [
	{
		firstName: 'SUPERUSER',
		lastName: '',
		id: '1000',
		role: 'Admin',
		email: 'usernou@admin.com',
		password: 'admintest234',
	},
	{
		firstName: 'Teacher',
		lastName: 'User',
		id: '1234',
		role: 'Teacher',
		email: 'teacher@test.com',
		password: 'teacher1234',
		timeSlots: [
			{
				date: new Date(2021, 3, 29),
				slots: [0, 0, 0, 0, 1, 0, 0, 0],
			},
		],
		taughtCourses: [
			{ id: 1, courseId: 1, price: 40 },
			{ id: 2, courseId: 3, price: 70 },
			{ id: 3, courseId: 2, price: 60 },
		],
		completedCourses: [],
	},
	{
		firstName: 'Teacher2',
		lastName: 'User',
		id: '1235',
		role: 'Teacher',
		email: 'teacher2@test.com',
		password: 'teacher1234',
		timeSlots: [
			{
				date: new Date(2021, 3, 28),
				slots: [0, 1, 0, 0, 0, 0, 0, 0],
			},
			{
				date: new Date(2021, 3, 30),
				slots: [0, 0, 0, 0, 0, 0, 1, 0],
			},
		],
		taughtCourses: [
			{ id: 1, courseId: 1, price: 45 },
			{ id: 2, courseId: 2, price: 55 },
			{ id: 3, courseId: 3, price: 65 },
		],
		completedCourses: [],
	},
	{
		firstName: 'Strudent',
		lastName: 'User',
		id: '1236',
		role: 'Student',
		email: 'student@test.com',
		password: 'student1234',
		timeSlots: [
			{
				date: new Date(2021, 3, 28),
				slots: [0, 1, 0, 0, 0, 0, 0, 0],
			},
			{
				date: new Date(2021, 3, 29),
				slots: [0, 0, 0, 0, 1, 0, 0, 0],
			},
			{
				date: new Date(2021, 3, 30),
				slots: [0, 0, 0, 0, 0, 0, 1, 0],
			},
		],
		completedCourses: [],
	},
	{
		firstName: 'Strudent2',
		lastName: 'User',
		id: '1237',
		role: 'Student',
		email: 'student2@test.com',
		password: 'student1234',
		timeSlots: [],
		bookedCourses: [],
		completedCourses: [],
	},
];

let bookedCourses = [
	{
		bookingId: 1,
		courseId: 2,
		studentId: '1236',
		teacherId: '1235',
		price: 70,
		teacherPrice: 55,
		date: new Date(2021, 3, 28),
		timeSlot: 1,
	},
	{
		bookingId: 2,
		courseId: 1,
		studentId: '1236',
		teacherId: '1234',
		price: 50,
		teacherPrice: 40,
		date: new Date(2021, 3, 29),
		timeSlot: 4,
	},
	{
		bookingId: 3,
		courseId: 3,
		studentId: '1236',
		teacherId: '1235',
		price: 90,
		teacherPrice: 65,
		date: new Date(2021, 3, 30),
		timeSlot: 6,
	},
];

let completedCourses = [
	{
		completedId: 1,
		courseId: 4,
		teacherId: '1234',
		studentId: '1237',
		earned: 50,
		price: 60,
		date: new Date(2021, 3, 22),
		timeSlot: 2,
	},
	{
		completedId: 2,
		courseId: 2,
		teacherId: '1234',
		studentId: '1237',
		earned: 60,
		price: 70,
		date: new Date(2021, 3, 26),
		timeSlot: 4,
	},
];

const siteCourses = [
	{
		id: 1,
		name: 'English 101',
		price: 50,
		info: 'Basics of the english languange.',
		deleted: false,
	},
	{
		id: 2,
		name: 'English for kids',
		price: 70,
		info: 'Learn english the FUN way.',
		deleted: false,
	},
	{
		id: 3,
		name: 'English for Business',
		price: 90,
		info: 'Learn english to get ahead in the business world.',
		deleted: false,
	},
	{
		id: 4,
		name: 'English for technical people',
		price: 60,
		info: 'Make talking technical easy.',
		deleted: false,
	},
];

const userId = parseInt(testUser[testUser.length - 1].id);
//-----------------------End of hardcoded data -------------------

const capitalizeStr = (text) => {
	let caps = text.charAt(0).toUpperCase() + text.slice(1);
	return caps;
};

const getCourseName = (id) => {
	for (let i = 0; i < siteCourses.length; i++) {
		if (siteCourses[i].id === id) {
			return siteCourses[i].name;
		}
	}
};

const getCourseInfo = (id) => {
	for (let i = 0; i < siteCourses.length; i++) {
		if (siteCourses[i].id === id) {
			return siteCourses[i].info;
		}
	}
};

const getPersonName = (id) => {
	for (let i = 0; i < testUser.length; i++) {
		if (testUser[i].id === id) {
			return testUser[i].firstName + ' ' + testUser[i].lastName;
		}
	}
};

const getTimeSlots = (userId) => {
	for (let i = 0; i < testUser.length; i++) {
		if (testUser[i].id === userId) {
			return testUser[i].timeSlots;
		}
	}
};

const getCourseDeleted = (id) => {
	for (let i = 0; i < siteCourses.length; i++) {
		if (siteCourses[i].id === id) {
			return siteCourses[i].deleted;
		}
	}
};

const getBookedCourses = (userId, role) => {
	let courses = [];

	if (role === 'Teacher') {
		courses = bookedCourses
			.filter((item) => item.teacherId === userId)
			.map((item) => {
				return {
					bookingId: item.bookingId,
					courseId: item.courseId,
					courseName: getCourseName(item.courseId),
					courseInfo: getCourseInfo(item.courseId),
					price: item.teacherPrice,
					studentId: item.studentId,
					studentName: getPersonName(item.studentId),
					date: item.date,
					timeSlot: item.timeSlot,
					courseDeleted: getCourseDeleted(item.courseId),
				};
			});
	}
	if (role === 'Student') {
		courses = bookedCourses
			.filter((item) => item.studentId === userId)
			.map((item) => {
				return {
					bookingId: item.bookingId,
					courseId: item.courseId,
					courseName: getCourseName(item.courseId),
					courseInfo: getCourseInfo(item.courseId),
					price: item.price,
					teacherId: item.teacherId,
					teacherName: getPersonName(item.teacherId),
					date: item.date,
					timeSlot: item.timeSlot,
					courseDeleted: getCourseDeleted(item.courseId),
				};
			});
	}
	if (role === 'Admin') {
		courses = bookedCourses.map((item) => {
			return {
				...item,
				courseName: getCourseName(item.courseId),
				courseInfo: getCourseInfo(item.courseId),
				studentName: getPersonName(item.studentId),
				teacherName: getPersonName(item.teacherId),
				courseDeleted: getCourseDeleted(item.courseId),
			};
		});
	}
	return courses.sort((a, b) => {
		return new Date(a.date) - new Date(b.date) || a.timeSlot - b.timeSlot;
	});
};

const getCompleted = (userId, role) => {
	let completed = [];

	if (role === 'Teacher') {
		completed = completedCourses
			.filter((item) => item.teacherId === userId)
			.map((item) => {
				return {
					completedId: item.completedId,
					courseId: item.courseId,
					courseName: getCourseName(item.courseId),
					teacherId: item.teacherId,
					earned: item.earned,
					date: item.date,
					timeSlot: item.timeSlot,
				};
			});
	}
	return completed.sort((a, b) => {
		return new Date(a.date) - new Date(b.date) || a.timeSlot - b.timeSlot;
	});
};

const teacherHasCourse = (teacherCourses, id) => {
	for (let i = 0; i < teacherCourses.length; i++) {
		if (teacherCourses[i].courseId === id) {
			return teacherCourses[i].price;
		}
	}
	return 0;
};

const getTeacherPrice = (teacherId, courseId) => {
	for (let i = 0; i < testUser.length; i++) {
		if (testUser[i].id === teacherId) {
			for (let j = 0; j < testUser[i].taughtCourses.length; j++) {
				if (testUser[i].taughtCourses[j].courseId === courseId) {
					return testUser[i].taughtCourses[j].price;
				}
			}
		}
	}
	return 0;
};

const getTeachersWithCourse = (selectedCourseId) => {
	let teachersWithCourse = [];
	for (let i = 0; i < testUser.length; i++) {
		if (testUser[i].role === 'Teacher') {
			let tempTeacherPrice = teacherHasCourse(testUser[i].taughtCourses, selectedCourseId);
			if (tempTeacherPrice !== 0) {
				teachersWithCourse.push({
					teacherId: testUser[i].id,
					teacherPrice: tempTeacherPrice,
					timeSlots: testUser[i].timeSlots,
				});
			}
		}
	}
	return teachersWithCourse.sort((a, b) => {
		return a.teacherPrice - b.teacherPrice;
	});
};

const getSlotsFromDate = (slots, selectedDate) => {
	for (let i = 0; i < slots.length; i++) {
		if (slots[i].date.toString() === selectedDate.toString()) {
			return slots[i].slots;
		}
	}
	return [0, 0, 0, 0, 0, 0, 0, 0];
};

const getTeachersTimeslots = (selectedDate, selectedCourseId) => {
	let teachersWithCourse = getTeachersWithCourse(selectedCourseId);
	let dateTimeSlots = ['', '', '', '', '', '', '', ''];
	let slotsFilled = 0;
	for (let i = 0; i < teachersWithCourse.length; i++) {
		let tempSlots = getSlotsFromDate(teachersWithCourse[i].timeSlots, selectedDate);
		for (let j = 0; j < tempSlots.length; j++) {
			if (tempSlots[j] === 0 && dateTimeSlots[j] === '') {
				dateTimeSlots[j] = teachersWithCourse[i].teacherId;
				slotsFilled++;
				if (slotsFilled === 8) {
					return dateTimeSlots;
				}
			}
		}
	}
	return dateTimeSlots;
};

const updateTimeslots = (userId, date, timeSlot) => {
	for (let i = 0; i < testUser.length; i++) {
		if (testUser[i].id === userId) {
			let tempSlots = testUser[i].timeSlots;
			for (let j = 0; j < tempSlots.length; j++) {
				if (tempSlots[j].date.toString() === date.toString()) {
					if (tempSlots[j].slots[timeSlot] === 0) {
						tempSlots[j].slots[timeSlot] = 1;
						return;
					} else throw new Error('Time slot no longer available');
				}
			}
			let newDate = date;
			let newSlots = [0, 0, 0, 0, 0, 0, 0, 0];
			newSlots[timeSlot] = 1;
			testUser[i].timeSlots.push({
				date: newDate,
				slots: newSlots,
			});
			return;
		}
	}
	throw new Error('User doesnt exist.');
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			id: '',
			role: '',
			isAuth: false,
			error: '',
			confirmation: '',
			timeSlots: [],
			taughtCourses: [],
			bookedCourses: [],
			completedCourses: [],
			qualifications: '',
			experience: '',
		};
	}

	handleLogout = () => {
		this.setState({
			firstName: '',
			lastName: '',
			email: '',
			id: '',
			role: '',
			isAuth: false,
			error: '',
			confirmation: '',
			callerComp: '',
			timeSlots: [],
			taughtCourses: [],
			bookedCourses: [],
			completedCourses: [],
			qualifications: '',
			experience: '',
		});
	};

	handleLogin = (user) => {
		let foundUser = false;
		for (let i = 0; i < testUser.length; i++) {
			if (user.email === testUser[i].email && user.password === testUser[i].password) {
				this.setState({
					firstName: testUser[i].firstName,
					lastName: testUser[i].lastName,
					email: testUser[i].email,
					id: testUser[i].id,
					role: testUser[i].role,
					isAuth: true,
					error: '',
					cofirmation: '',
					callerComp: '',
					timeSlots: testUser[i].timeSlots,
					bookedCourses: getBookedCourses(testUser[i].id, testUser[i].role),
					completedCourses: getCompleted(testUser[i].id, testUser[i].role),
				});
				if (testUser[i].role === 'Teacher') {
					this.setState({ taughtCourses: testUser[i].taughtCourses });
				}
				foundUser = true;
				break;
			}
		}
		if (!foundUser) {
			this.setState({ error: 'Invalid email or pasword' });
		}
	};

	handleRegister = (user) => {
		let foundUser = false;
		for (let i = 0; i < testUser.length; i++) {
			if (user.email.toLowerCase() === testUser[i].email.toLowerCase()) {
				foundUser = true;
			}
		}
		if (!foundUser) {
			let newUser = {
				firstName: capitalizeStr(user.firstName),
				lastName: capitalizeStr(user.lastName),
				id: (userId + 1).toString(),
				role: capitalizeStr(user.role),
				email: user.email,
				password: user.password,
				timeSlots: [],
				bookedCourses: [],
				completedCourses: [],
			};
			if (newUser.role === 'Teacher') {
				newUser = { ...newUser, taughtCourses: [] };
			}
			testUser.push(newUser);
			this.handleLogin(user);
		} else {
			this.setState({ error: 'Account already exists' });
		}
	};

	handleProfileUpdate = (user) => {
		for (let i = 0; i < testUser.length; i++) {
			if (this.state.email.toLowerCase() === testUser[i].email.toLowerCase()) {
				testUser[i] = Object.assign(testUser[i], user);
				console.log('testUser:', testUser);
			}
		}

		this.setState(user);
	};

	handlePasswordChange = (passwords) => {
		for (let i = 0; i < testUser.length; i++) {
			if (this.state.id === testUser[i].id) {
				if (passwords.oldPassword === testUser[i].password) {
					testUser[i].password = passwords.newPassword;
					this.setState({ confirmation: 'Password has been changed', callerComp: 'ChangePassword' });
				} else {
					this.setState({ error: 'Old Password is not valid', callerComp: 'ChangePassword' });
				}
			}
		}
	};

	handleTeacherAddCourse = (course) => {
		for (let i = 0; i < testUser.length; i++) {
			if (this.state.id === testUser[i].id) {
				let userCourses = testUser[i].taughtCourses;
				let foundCourse = false;
				for (let j = 0; j < userCourses.length; j++) {
					if (userCourses[j].courseId === course.id) {
						if (course.price === 0) {
							userCourses.splice(j, 1);
							this.setState({ confirmation: 'Course has been removed', callerComp: 'UpdateCourses' });
						} else {
							userCourses[j].price = course.price;
							this.setState({ confirmation: 'Course has been updated', callerComp: 'UpdateCourses' });
						}
						foundCourse = true;
						break;
					}
				}
				if (!foundCourse) {
					let taughtId = userCourses.length === 0 ? 1 : userCourses[userCourses.length - 1].id + 1;
					userCourses.push({
						id: taughtId,
						courseId: course.id,
						price: course.price,
					});
					this.setState({ confirmation: 'Course has been added', callerComp: 'UpdateCourses' });
				}
				this.setState({ taughtCourses: userCourses });
				break;
			}
		}
	};

	handleMessageReset = () => {
		this.setState({ error: '', confirmation: '', callerComp: '' });
	};

	handleBookCourse = (course) => {
		// {
		// 	bookingId: 2,
		// 	courseId: 1, -from param
		// 	studentId: '1236',
		// 	teacherId: '1234',- from param
		// 	price: 50, - from param
		// 	teacherPrice: 40,
		// 	date: new Date(2021, 3, 29), -from param
		// 	timeSlot: 4, -from param
		// }
		//get nextid
		let newId = bookedCourses.length + 1;
		//composing the new booking
		let newBooking = {
			...course,
			bookingId: newId,
			studentId: this.state.id,
			teacherPrice: getTeacherPrice(course.teacherId, course.courseId),
		};
		//adding the new booking
		bookedCourses.push(newBooking);
		// updating the timeslots (teacher and then student)
		updateTimeslots(newBooking.teacherId, newBooking.date, newBooking.timeSlot);
		updateTimeslots(newBooking.studentId, newBooking.date, newBooking.timeSlot);
		//updating state
		// ---> This update breaks code
		// this.setState({
		// 	bookedCourses: getBookedCourses(this.state.id, this.state.role),
		// 	timeSlot: getTimeSlots(this.state.id),
		// });
	};

	refreshUserCourses = () => {
		this.setState({
			bookedCourses: getBookedCourses(this.state.id, this.state.role),
			timeSlot: getTimeSlots(this.state.id),
		});
	};

	handleRemoveCourse = (id) => {
		for (let i = 0; i < siteCourses.length; i++) {
			if (id === siteCourses[i].id) {
				siteCourses[i].deleted = true;
			}
		}
		for (let j = 0; j < testUser.length; j++) {
			if (testUser[j].role === 'Teacher') {
				for (let k = 0; k < testUser[j].taughtCourses.length; k++) {
					if (testUser[j].taughtCourses[k].courseId === id) {
						testUser[j].taughtCourses.splice(k, 1);
					}
				}
			}
		}
		this.setState({ bookedCourses: getBookedCourses(this.state.id, this.state.role) });
	};

	handleEditCourse = (course) => {
		for (let i = 0; i < siteCourses.length; i++) {
			if (course.id === siteCourses[i].id) {
				siteCourses[i].name = course.name;
				siteCourses[i].price = parseInt(course.price);
				siteCourses[i].info = course.info;
			}
		}
		this.setState({ bookedCourses: getBookedCourses(this.state.id, this.state.role) });
	};

	handleAddCourse = (course) => {
		const newCourse = {
			id: siteCourses[siteCourses.length - 1].id + 1,
			name: course.name,
			price: parseInt(course.price),
			info: course.info,
			deleted: false,
		};
		siteCourses.push(newCourse);
	};

	render() {
		return (
			<Router basename='/reverse-bidding-system'>
				<Navigation
					isAuth={this.state.isAuth}
					handleLogout={this.handleLogout}
					role={this.state.role}
					firstName={this.state.firstName}
					lastName={this.state.lastName}
				/>
				{this.state.isAuth ? <Redirect to='/dashboard' /> : <Redirect to='/login' />}
				<Switch>
					<Route path='/login'>
						<Login handleLogin={this.handleLogin} testUser={testUser} error={this.state.error} />
					</Route>
					<Route path='/register'>
						<Register handleRegister={this.handleRegister} error={this.state.error} />
					</Route>
					<PrivateRoute path='/dashboard' isAuth={this.state.isAuth}>
						<Dashboard
							data={this.state}
							siteCourses={siteCourses}
							getTeachersTimeslots={getTeachersTimeslots}
							handleBookCourse={this.handleBookCourse}
							refreshUserCourses={this.refreshUserCourses}
						/>
					</PrivateRoute>
					<PrivateRoute path='/profile' isAuth={this.state.isAuth}>
						<Profile
							handleProfileUpdate={this.handleProfileUpdate}
							handlePasswordChange={this.handlePasswordChange}
							handleTeacherAddCourse={this.handleTeacherAddCourse}
							handleMessageReset={this.handleMessageReset}
							data={this.state}
							siteCourses={siteCourses}
						/>
					</PrivateRoute>
					<PrivateRoute path='/noaccess' isAuth={this.state.isAuth}>
						<AccessRequired handleLogout={this.handleLogout} />
					</PrivateRoute>
					<AdRoute path='/postcourse' isAuth={this.state.isAuth} role={this.state.role}>
						<PostCourse
							siteCourses={siteCourses}
							handleAddCourse={this.handleAddCourse}
							handleRemoveCourse={this.handleRemoveCourse}
							handleEditCourse={this.handleEditCourse}
						/>
					</AdRoute>
				</Switch>
			</Router>
		);
	}
}

export default App;

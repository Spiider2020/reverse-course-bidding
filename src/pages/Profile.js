import React from 'react';
import ProfileInfo from '../components/Profiles/ProfileInfo';
import StudentProfileUpdate from '../components/Profiles/StudentProfileUpdate';
import TeacherProfileUpdate from '../components/Profiles/TeacherProfileUpdate';
import ChangePassword from '../components/Profiles/ChangePassword';
import UpdateCourses from '../components/Profiles/UpdateCourses';
import './Profile.scss';

function Profile({
	handleProfileUpdate,
	handlePasswordChange,
	handleTeacherAddCourse,
	handleMessageReset,
	data,
	siteCourses,
}) {
	return (
		<div className='profile__container__main'>
			<div className='info__panel'>
				<ProfileInfo data={data} siteCourses={siteCourses} />
			</div>

			<div className='update__profile'>
				{data.role === 'Student' || data.role === 'Admin' ? (
					<StudentProfileUpdate handleProfileUpdate={handleProfileUpdate} />
				) : (
					<TeacherProfileUpdate handleProfileUpdate={handleProfileUpdate} />
				)}
			</div>
			<div className='change__password'>
				<ChangePassword
					handlePasswordChange={handlePasswordChange}
					handleMessageReset={handleMessageReset}
					error={data.error}
					confirmation={data.confirmation}
					callerComp={data.callerComp}
				/>
			</div>
			{data.role === 'Teacher' ? (
				<div className='update__courses'>
					<UpdateCourses
						handleTeacherAddCourse={handleTeacherAddCourse}
						handleMessageReset={handleMessageReset}
						siteCourses={siteCourses}
						confirmation={data.confirmation}
						callerComp={data.callerComp}
					/>
				</div>
			) : (
				''
			)}
		</div>
	);
}

export default Profile;

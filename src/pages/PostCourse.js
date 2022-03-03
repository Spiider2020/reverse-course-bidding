import React, { useState } from 'react';
import CourseDtails from '../components/PostCourse/CourseDetails';
import AddCourse from '../components/PostCourse/AddCourse';
import './PostCourse.scss';

function PostCourse({ siteCourses, handleAddCourse, handleRemoveCourse, handleEditCourse }) {
	const [, setUpdate] = useState();
	const handleUpdateList = () => {
		setUpdate({});
	};

	return (
		<div className='admin__courses__container'>
			<div className='courses__main__content'>
				<AddCourse handleAddCourse={handleAddCourse} handleUpdateList={handleUpdateList} />
				{siteCourses.map((course, index) =>
					course.deleted ? (
						<></>
					) : (
						<CourseDtails
							key={index}
							courseData={course}
							handleRemoveCourse={handleRemoveCourse}
							handleEditCourse={handleEditCourse}
							handleUpdateList={handleUpdateList}
						/>
					)
				)}
			</div>
		</div>
	);
}

export default PostCourse;

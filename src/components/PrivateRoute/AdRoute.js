import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ children, isAuth, role, ...rest }) {
	return (
		<Route
			{...rest}
			render={() => {
				return isAuth === true && role === 'Admin' ? children : <Redirect to='/noaccess' />;
			}}
		/>
	);
}

export default PrivateRoute;

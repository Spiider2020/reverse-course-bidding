import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ children, isAuth, ...rest }) {
	return (
		<Route
			{...rest}
			render={() => {
				return isAuth === true ? children : <Redirect to="/login" />;
			}}
		/>
	);
}

export default PrivateRoute;

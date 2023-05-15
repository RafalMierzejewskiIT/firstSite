import React from 'react';
import {Route, Switch} from 'react-router';
import NotLoggedIn from '../../pages/NotLoggedIn';
import Signup from '../../pages/Signup';
import Login from '../../pages/Login';

const NotLoggedInRoutes = () => {
	return (
		<Switch>
			<Route exact path='/' children={<NotLoggedIn />} />
			<Route exact path='/home' children={<NotLoggedIn />} />
			<Route exact path='/login' children={<Login />} />
			<Route exact path='/signup' children={<Signup />} />
		</Switch>
	);
};

export default NotLoggedInRoutes;

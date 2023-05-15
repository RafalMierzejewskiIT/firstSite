import React from 'react';
import {Route, Switch} from 'react-router';
import NotLoggedIn from '../../pages/NotLoggedIn';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';

const LoggedInRoutes = () => {
	return (
		<Switch>
			<Route exact path='/' children={<NotLoggedIn />} />
			<Route exact path='/home' children={<Home />} />
			<Route exact path='/login' children={<Login />} />
			<Route exact path='/signup' children={<Signup />} />
		</Switch>
	);
};

export default LoggedInRoutes;

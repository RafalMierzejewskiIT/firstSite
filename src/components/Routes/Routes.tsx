import React from 'react';
import { useRecoilValue } from 'recoil';
import userStateAtom from '../../atoms/usersState.atom';
import LoggedInRoutes from './LoggedInRoutes';
import NotLoggedInRoutes from './NotLoggedInRoutes';

const Routes = () => {
   const user = useRecoilValue(userStateAtom);

  return (
    <>
      {user && <LoggedInRoutes />}
      {!user && <NotLoggedInRoutes />}
    </>
  );
};

export default Routes;

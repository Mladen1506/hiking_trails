import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ajax } from '../utils/ajax-adapter';
import PageRouter from './PageRouter';


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    ajax.myUserData()
  }, []);

  const handleClickHome = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'HOME'
    })
  };

  const handleClickRegister = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'REGISTER'
    })
  };

  const handleClickLogin = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'LOGIN'
    })
  };

  const handleClickAbout = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'ABOUT'
    })
  };
  const handleClickAddTour = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'ADD_TOUR'
    })
  };
  const handleClickMyTours = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'MY_TOURS'
    })
  };
  const handleClickAddReview = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'ADD_REVIEW'
    })
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hiking trails
        </p>
        <nav>
          <div onClick={handleClickHome}>Home</div>
          <div onClick={handleClickRegister}>Register</div>
          <div onClick={handleClickLogin}>Login</div>
          <div onClick={handleClickAddTour}>Add Tour</div>
          <div onClick={handleClickMyTours}>My Tours</div>
          <div onClick={handleClickAddReview}>Add Review</div>
          <div onClick={handleClickAbout}>About...</div>
        </nav>
      </header>
      <div className='page-body'></div>
      <PageRouter />
    </div>
  );
}

export default App;

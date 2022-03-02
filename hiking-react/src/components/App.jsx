import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageRouter from './PageRouter';
import { ajax } from '../utils/ajax-adapter';
import { LOGIN_SUCCESS } from '../redux/actions';

const App = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const myUserName = useSelector(state => state.myUserName);

  useEffect(() => {
    ajax.myUserData()
      .then((response) => {
        console.log('test 2')
        console.log('.then() response for my user data', response)
        if (response && response.data && response.data.data && response.data.data.myUserData && response.data.data.myUserData._id) {
          console.log(response.data.data.myUserData)
          const myUserData = response.data.data.myUserData;
          dispatch({
            type: LOGIN_SUCCESS,
            payload: myUserData
          });
        }
      })
    console.log('test 3')
  }, []);

  useEffect(() => {

    dispatch({
      type: 'TOURS_FETCHING'
    });
    setTimeout(() => {
      ajax.tourGetAll()
        .then((response) => {
          console.log('response za tour get all');
          console.log(response);

          if (response && response.data && response.data.data && Array.isArray(response.data.data.tourGetAll)) {
            dispatch({
              type: 'TOURS_FETCHED',
              payload: response.data.data.tourGetAll
            });
          }
        })
    }, 500)
    dispatch({
      type: 'REVIEW_FETCHING'
    });
    ajax.reviewGetAll()
      .then((response) => {
        console.log('response for review get all');
        console.log(response);

        if (response && response.data && response.data.data && Array.isArray(response.data.data.reviewGetAll)) {
          dispatch({
            type: 'REVIEWS_FETCHED',
            payload: response.data.data.reviewGetAll
          });
        }
      })
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
  const handleClickLogout = (e) => {
    ajax.authLogout()
      .then(() => {
        ajax.deleteStoredToken();
        ajax.configureHeaders(null);
        dispatch({
          type: 'LOGOUT'
        });

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

  let jsxLoggedInMessage = null;
  let jsxMenu = null;
  if (isLoggedIn) {
    jsxLoggedInMessage = (
      <>
        You are logged in now  <b>{myUserName}</b>
      </>
    );
    jsxMenu = (
      <>
        <div onClick={handleClickHome}>Home</div>
        <div onClick={handleClickLogout}>Logout</div>
        <div onClick={handleClickMyTours}>My Tours</div>
        <div onClick={handleClickAddTour}>Add Tour</div>
        <div onClick={handleClickAddReview}>Add Review</div>
        <div onClick={handleClickAbout}>About...</div>
      </>
    );
  } else {
    // when logged out
    jsxMenu = (
      <>
        <div onClick={handleClickHome}>Home</div>
        <div onClick={handleClickRegister}>Register</div>
        <div onClick={handleClickLogin}>Login</div>
        <div onClick={handleClickAbout}>About...</div>

      </>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hiking trails
        </p>
        <nav>

          {jsxMenu}
        </nav>
      </header>
      <div className='page-body'>
        <p>{jsxLoggedInMessage}</p>
      </div>
      <PageRouter />
    </div>
  );
}

export default App;

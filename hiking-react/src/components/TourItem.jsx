import { Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionRouteWithParamsSet } from "../redux/actions";
import { ajax } from "../utils/ajax-adapter";
import { calculateAverageRating } from "../utils/tour-utils";

const TourItem = (props) => {
  const dispatch = useDispatch();
  const tour = props.tour;

  const reviews = useSelector(state => state.reviews);
  const tour_id = tour._id;

  const [userName, setUserName] = useState('');

  useEffect(() => {
    ajax.userProfileGet(tour.user_id)
      .then((response) => {
        console.log('response', response);
        if (response.data.data.userProfileGet.username) {
          setUserName(response.data.data.userProfileGet.username);
        }
      })
  }, [])


  let averageRating = calculateAverageRating(reviews.data, tour_id);


  const handleClickSingleTour = (e) => {

    dispatch(actionRouteWithParamsSet('TOUR', {
      tour_id: tour_id
    }))
  };

  return (
    <div>
      <h4 onClick={handleClickSingleTour}>{tour.name}</h4>
      <div>{tour.description}</div>
      <div>Created By:{userName}</div>
      <div>Date:{tour.date}</div>
      <div>Trail Length:{tour.trail_length}</div>
      <div>Difficulty:{tour.difficulty}</div>
      <div>Number Of Participants:{tour.max_participants}</div>
      <div>Average Rating: {averageRating}</div>
      <Typography component="legend">Average Rating:</Typography>
      <Rating
        name="average_rating"
        value={averageRating}
        readOnly
      />
    </div>
  )
};
export default TourItem;
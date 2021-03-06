import { Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { actionReviewsNeeded } from "../redux/actions";
import { calculateAverageRating, getSingleTourById } from "../utils/tour-utils";
import FormReview from "./FormReview";


const PageSingleTour = () => {
  const dispatch = useDispatch();
  const tours = useSelector((state) => state.tours);
  const routeParams = useSelector((state) => state.routeParams);
  const tour_id = routeParams.tour_id;
  const reviews = useSelector(state => state.reviews);
  const [tour, setTour] = useState({});
  const routeFreshness = useSelector((state) => state.routeFreshness);

  useEffect(() => {
    dispatch(actionReviewsNeeded());

  }, [routeFreshness]);

  useEffect(() => {
    const tour = getSingleTourById(tour_id, tours.data);
    setTour(tour);
  }, [tour_id, tours]);

  let averageRating = calculateAverageRating(reviews.data, tour_id);

  const filteredReviews = reviews.data.filter((review) => {
    if (review.tour_id === tour_id) {
      return true;
    }
    return false;
  })

  let jsxReviews = filteredReviews.map((review) => {
    return (
      <div key={review._id}>
        <Rating
          name="rating"
          value={review.rating}
          readOnly
        />
        <div>{review.rating}</div>
        <div>{review.text}</div>
      </div>
    );
  });

  return (
    <div>
      <h2>{tour.name}</h2>
      <div>{tour.description}</div>
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

      <h3>Reviews</h3>
      {jsxReviews}
      <FormReview tour_id= {tour_id} />
    </div>
  );
};
export default PageSingleTour;
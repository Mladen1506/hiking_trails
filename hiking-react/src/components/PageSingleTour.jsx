import { Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { calculateAverageRating, getSingleTourById } from "../utils/tour-utils";

const PageSingleTour = () => {

  const tours = useSelector((state) => state.tours);
  const routeParams = useSelector((state) => state.routeParams);
  const tour_id = routeParams.tour_id;
  const reviews = useSelector(state => state.reviews);
  const [tour, setTour] = useState({});

  useEffect(() => {
    const tour = getSingleTourById(tour_id, tours);
    setTour(tour);
  }, [tour_id, tours]);

  let averageRating = calculateAverageRating(reviews, tour_id);

  const filteredReviews = reviews.filter((review) => {
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
    </div>
  );
};
export default PageSingleTour;
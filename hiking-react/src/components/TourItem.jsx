import { Rating, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { calculateAverageRating } from "../utils/tour-utils";

const TourItem = (props) => {
  const tour = props.tour;

  const review = useSelector(state => state.reviews);
  const tour_id = tour._id;


  let averageRating = calculateAverageRating(review, tour_id);

  return (
    <div>
      <h4>{tour.name}</h4>
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
    </div>
  )
};
export default TourItem;
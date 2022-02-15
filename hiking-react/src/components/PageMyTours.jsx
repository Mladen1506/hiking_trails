import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TourItem from "./TourItem";



const PageMyTours = (props) => {
  const dispatch = useDispatch ();
  const tours = useSelector((state) => state.tours);

  const handleClickAddTour = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'ADD_TOUR'
    })
  };
  const _handleClickEditTour = (tour_id) => {
    dispatch({
      type: 'ROUTE_WITH_PARAMS_SET',
      payload: {
        route:'EDIT_TOUR',
        params: {
          id: 123
        }
      }
    })
  };

  const myTours = tours;

  let jsx = myTours.map((tour, index) => {
    const tour_id = tour._id;
    return (
      <tr key={tour._id}>
        <td><TourItem tour={tour} /></td>
        <td>
          <Button
            type="button"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={(e) => {_handleClickEditTour(tour_id) }}
          >Edit</Button> 
          <Button
            type="button"
            color="error"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >Delete</Button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h1>My Tours</h1>
      <table className="my-tours">
        <tbody>
          {jsx}
        </tbody>
      </table>
      <Button
        type="button"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleClickAddTour}
      >Add New Tour</Button>
    </>
  );
}

export default PageMyTours;
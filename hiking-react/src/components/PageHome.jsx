import { useSelector } from "react-redux";



const PageHome = (props) => {
  const tours = useSelector((state) => state.tours);

  let jsx = tours.map((tour, index) => {
    return (
      <div key = {tour._id}>
        <h4>{tour.name}</h4>
        <div>{tour.description}</div>
        <div>{tour.date}</div>
        <div>{tour.trail_length}</div>
        <div>{tour.difficulty}</div>
        <div>{tour.max_participants}</div>
      </div>
    );
  });
  return (
    <>
    <h1>Home Page</h1>
    {jsx}
    </>
  );
}

export default PageHome;
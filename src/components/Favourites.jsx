import { useSelector } from "react-redux";
import Job from "./Job";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Favourites = () => {
  const favouritesNames = useSelector(state => state.favourites.content);
  const [favourites, setFavourites] = useState([]);

  const fetchFavourite = async favouriteName => {
    const url = "https://strive-benchmark.herokuapp.com/api/jobs?company=" + favouriteName;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const { data } = await response.json();
        // console.log(data);
        // setJobs(data);
        // console.log(data[0]);
        setFavourites([...favourites, data[0]]);
        return data[0];
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFavourites = () => {
    favouritesNames.forEach(elm => fetchFavourite(elm));
  };

  useEffect(() => fetchFavourites(), [favourites]);

  return (
    <>
      <Link to="/">home</Link>
      {favourites.map(elm => (
        <Job key={elm._id} data={elm} />
      ))}
    </>
  );
};

export default Favourites;

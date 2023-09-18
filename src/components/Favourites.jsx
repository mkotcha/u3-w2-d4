import { useSelector } from "react-redux";
import Job from "./Job";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const Favourites = () => {
  const favouritesNames = useSelector(state => state.favourites.content);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourite = async favouriteName => {
      const url = "https://strive-benchmark.herokuapp.com/api/jobs?company=" + favouriteName;

      try {
        const response = await fetch(url);
        if (response.ok) {
          const { data } = await response.json();
          setFavourites(prevfav => [...prevfav, data[0]]);
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

    setFavourites([]);
    fetchFavourites();
  }, [favouritesNames]);

  return (
    <>
      <Container>
        <Link to="/">home</Link>
        {favourites.map((elm, i) => (
          <Job key={elm._id + i} data={elm} />
        ))}
      </Container>
    </>
  );
};

export default Favourites;

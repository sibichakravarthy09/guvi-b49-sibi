import React, { useEffect, useState } from 'react';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia } from '@material-ui/core';

const cardStyle = {
  cardMain: {
    maxWidth: '300px',
    maxHeight: '300px',
    margin: '10px',
  },

  cardImage: {
    height: '150px',
    backgroundImage: "url(" + "https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" +  ")",
    marginLeft: '7px',
    marginRight: '7px',
    marginTop: '5px',
  },

};

const Produts = () => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const getMovieList = async () => {
      const url = 'http://api.themoviedb.org/3/search/movie?api_key=myapikey&query=Avengers';
      const response = await fetch(url);
      const responseJson = await response.json();
      setMovieData(responseJson.results);
    };

    getMovieList();
  }, []);

  return (
    <>
      {movieData.map((movie) => (
        <Card style={cardStyle.cardMain} key={movie.id}>
          <CardActionArea>
            <CardMedia style={cardStyle.cardImage} />
            <CardContent>
              <p>{movie.original_title}</p>
              <p>{movie.original_date}</p>
            </CardContent>
          </CardActionArea>
          <CardActions style={cardStyle.cardButton}>
            <Button>Watch</Button>
            <Button>Like</Button>
            <Button>Rent</Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
};

export default Produts;
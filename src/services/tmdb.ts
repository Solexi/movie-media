// services/tmdb.ts
import axios from "axios";
const cheerio = require ('cheerio')

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  imdb_rating: string;
  genres: string;
}

export const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
export const BASE_URL = "https://api.themoviedb.org/3";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: "en-US",
  },
});

export const fetchTopRatedMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axiosInstance.get("/movie/top_rated", {
      params: { page: 1 },
    });
    const topRatedMovies = response.data.results;

    const movieGenresPromises = topRatedMovies.map(async (movie: any) => {
      const genres = await fetchMovieGenres(movie.genre_ids);
      return {
        ...movie,
        genres,
      };
    });

    const top10MoviesWithGenres = await Promise.all(movieGenresPromises);
    const top10Movies = top10MoviesWithGenres.slice(0, 10);
    return top10Movies;
  } catch (error) {
    throw error;
  }
};

export const fetchMovieGenres = async (genreIds: number[]) => {
  try {
    const response = await axiosInstance.get('/genre/movie/list');
    const genresData = response.data.genres;
    const genres = genresData
      .filter((genre: any) => genreIds.includes(genre.id))
      .map((genre: any) => genre.name);

    return genres;
  } catch (error) {
    throw error;
  }
};

export const fetchTrendingMovies = async () => {
  try{
    const response = await axiosInstance.get("/trending/movie/day?", {
      // params: {
      //   time_window: "day",
      // },
    });
    const trendingMovies = response.data.results;
    const top5Trending = trendingMovies.slice(0, 5);

    return top5Trending
  } catch (err){
    throw err;
  }
}


// In tmdb.ts
export const fetchSearchResults = async (query: any) => {
  try {
      const response = await axiosInstance.get('/search/movie', {
          params: {
              query,
          },
      });
      return response.data;
  } catch (error) {
      throw error;
  }
};


export const getMovieDetails = async (movieId: number) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchVideoTrailer = async (movieId: number) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}/videos`);
    const trailers = response.data.results.filter((video: { type: string; }) => video.type === 'Trailer');

    if (trailers.length > 0) {
      return trailers[0].key; // Return the key of the first trailer found
    } else {
      throw new Error('No trailers found for this movie.');
    }
  } catch (error) {
    throw error;
  }
};




// export const fetchIMDBRating = async (movieId: number) => {
//   try {
//     const response = await axiosInstance.get(`/movie/${movieId}/external_ids`);
//     const imdbId = response.data.imdb_id;

//     // Now that you have the IMDb ID, fetch the IMDb rating from the IMDb API
//     const imdbApiUrl = `https://imdb-api.com/en/API/Ratings/k_1234567/${imdbId}`;
//     const imdbResponse = await axios.get(imdbApiUrl);

//     // Extract IMDb rating from the response
//     const imdbRating = imdbResponse.data.imDb;

//     return imdbRating;
//   } catch (error) {
//     throw error;
//   }
// };

// // services/tmdb.ts
// import axios from 'axios';

// const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
// const API_KEY = process.env.MOVIEMEDIA_TMDB;

// const instance = axios.create({
//   baseURL: TMDB_BASE_URL,
//   params: {
//     api_key: API_KEY,
//   },
// });

// export const fetchTopMovies = async () => {
//   try {
//     const response = await instance.get('/movie/top_rated');
//     return response.data.results;
//   } catch (error) {
//     throw error;
//   }
// };

// export const searchMovies = async (query: string) => {
//   try {
//     const response = await instance.get('/search/movie', {
//       params: {
//         query,
//       },
//     });
//     return response.data.results;
//   } catch (error) {
//     throw error;
//   }
// };

// export const fetchMovieDetails = async (movieId: number) => {
//   try {
//     const response = await instance.get(`/movie/${movieId}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

    // Fetch IMDb ratings for each movie
    // const moviesWithIMDBRating = await Promise.all(
    //   topRatedMovies.map(async (movie: any) => {
    //     const imdbRating = await fetchIMDBRating(movie.id);
    //     return {
    //       ...movie,
    //       imdbRating,
    //     };
    //   })
    // );
    // Limit to top 10 movies
    // const top10Movies = moviesWithIMDBRating.slice(0, 10);
    // return moviesWithIMDBRating;
    // return response.data;
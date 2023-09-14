import React, { useState, useEffect } from 'react';
import { Box, Flex, HStack, Icon, Image, Link as ChakraLink, Text } from '@chakra-ui/react';
import { fetchTopRatedMovies, Movie } from '../../services/tmdb';
import imdb from "../../assets/Images/imdb.png";
import tomatoes from "../../assets/Images/rotten.png";
import { FaHeart } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/index.css'
import { Link } from 'react-router-dom';

const MovieCard: React.FC = () => {
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
    const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});

    const handleFavorite = (movieId: number) => {
        setFavorites((prevFavorites) => ({
            ...prevFavorites,
            [movieId]: !prevFavorites[movieId], // Toggle the favorite status for the clicked movie
        }));
    }

    const formatDateToUTC = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        const utcDateString = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getUTCDate().toString().padStart(2, "0")}`;
        return utcDateString;
    };


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await fetchTopRatedMovies();

                setTopRatedMovies(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching top-rated movies:', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <Box
            display={"grid"}
            gap={"20px"}
            w={"100%"}
            gridTemplateColumns={"1.2fr 1.2fr 1.2fr 0fr"}
        // mx={80}
        >
            {topRatedMovies.map((movie: any) => (
                <Box
                    key={movie.id}
                    fontFamily="DM Sans, sans-serif"
                >
                    <Box
                        w={"250px"}
                        h={"490px"}
                        data-testid="movie-card"
                    >
                        <HStack position="relative">
                            <Link to={`/movie/${movie.id}`}>
                                <Image
                                    h={370}
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    data-testid="movie-poster"
                                />
                            </Link>
                            <Box
                                w={"30px"}
                                h={"29.21px"}
                                bg={"rgba(243, 244, 246, 0.5)"}
                                position="absolute"
                                top={10}
                                right={10}
                                borderRadius={"50%"}
                            >
                                <Icon
                                    as={FaHeart}
                                    color={favorites[movie.id] ? "#B91C1C" : "#D1D5DB"}
                                    w={"20px"}
                                    h={"20px"}
                                    position="absolute"
                                    top={5}
                                    left={5}
                                    onClick={() => handleFavorite(movie.id)}
                                    cursor={"pointer"}
                                />
                            </Box>
                        </HStack>
                        <Text
                            data-testid="movie-release-date"
                            fontWeight={700}
                            fontSize={"12px"}
                            color={"#9CA3AF"}
                        >
                            USA, {new Date(movie.release_date).getFullYear()}
                            {/* {formatDateToUTC(movie.release_date)} */}
                        </Text>
                        <ChakraLink href={`/movie/${movie.id}`} textDecoration={"none"} color={"#000000"}>
                            <Text
                                data-testid="movie-title"
                                fontWeight={700}
                                fontSize={"18px"}
                                mt={0}
                                mb={0}
                            >{movie.title}</Text>
                        </ChakraLink>
                        <Flex
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                            mb={-5}
                        >
                            <Flex
                                flexDirection={"row"}
                                align={"center"}
                            >
                                <Image
                                    src={imdb}
                                    alt={"IMDB"}
                                    w={"35px"}
                                    h={"17px"}
                                    mr={10}
                                />
                                <Text
                                    fontSize={"12px"}
                                    fontWeight={400}
                                    color={"#111827"}
                                    lineHeight={"12px"}
                                >
                                    {movie.vote_average * 10}.0 / 100
                                </Text>
                            </Flex>
                            <Flex
                                align={"center"}
                            >
                                <Image
                                    src={tomatoes}
                                    alt={"Rotten Tomatoes"}
                                    w={"16px"}
                                    h={"17px"}
                                    mr={10}
                                />
                                <Text
                                    fontSize={"12px"}
                                    fontWeight={400}
                                    color={"#111827"}
                                    lineHeight={"12px"}
                                >
                                    97%
                                </Text>
                            </Flex>
                        </Flex>
                        <Text
                            color={"#9CA3AF"}
                            fontSize={"12px"}
                            fontWeight={700}
                        >
                            {movie.genres.join(', ')}
                        </Text>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default MovieCard;

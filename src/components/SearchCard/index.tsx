// SearchCard.tsx

import { Box, Flex, Text, VStack, Image, Link as ChakraLink } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { fetchMovieGenres } from "../../services/tmdb";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

interface SearchCardProps {
    searchResults: any[];
    isSearching: boolean;
    onMovieSelect: (movieId: number) => void;
    loading: boolean;
}

const SearchCard: React.FC<SearchCardProps> = ({ searchResults, isSearching, onMovieSelect, loading }) => {
    const [genreNames, setGenreNames] = useState<string[]>([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genreNames = await fetchMovieGenres(searchResults[0]?.genre_ids);
                setGenreNames(genreNames);
            } catch (error) {
                console.error("Error fetching genre names:", error);
            }
        };

        if (searchResults.length > 0) {
            fetchGenres();
        }
    }, [searchResults]);

    return (
        <Box
            bg={"#FFFFFF"}
            w={"100%"}
            h={"400px"}
            position={"absolute"}
            top={"calc(100% + 50px)"}
            p={12}
            overflowY={"scroll"}
            borderRadius={"10px"}
        >
            {loading ?
                (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="100%"
                    >
                        <LoadingSpinner />
                    </Box>
                ) : (
                    <>
                        {searchResults.map((movie, index) => (
                            <Flex
                                p={"5px"}
                                borderRadius="10px"
                                key={index}
                                alignItems="center"
                                _hover={{
                                    background: 'rgba(243, 244, 246, 0.8)',
                                    transform: 'scale(1.02)',
                                }}
                                cursor="pointer"
                                onClick={() => onMovieSelect(movie.id)}
                            >
                                <Box
                                    borderRadius="10px"
                                    minW="60px"
                                    bgColor="transparent"
                                    mr={15}
                                >
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                                        alt={movie?.title}
                                        h="90px"
                                        borderRadius="10px"
                                        data-testid="movie-poster"
                                    />
                                </Box>
                                <Flex flexDir="column">
                                    <Text color="#9CA3AF" fontSize="12px" fontWeight="700" mb={-10}>
                                        USA,{' '}
                                        <span data-testid="movie-release-date">
                                            {new Date(movie.release_date).getFullYear() || 'Unknown'}
                                        </span>
                                    </Text>
                                    <Text color="#000000" fontSize="18px" fontWeight={700} data-testid="movie-title" mb={0}>
                                        {movie?.title}
                                    </Text>
                                    <Text color="#9CA3AF" fontSize="12px" fontWeight="700">
                                        {genreNames.join(", ")}
                                    </Text>
                                </Flex>
                            </Flex>
                        ))}
                        {!isSearching && searchResults.length < 1 ? (
                            <VStack spacing={4} align="center" mt={8}>
                                <Text>No results found</Text>
                            </VStack>
                        ) : null}
                    </>
                )}
        </Box>
    );
};

export default SearchCard;

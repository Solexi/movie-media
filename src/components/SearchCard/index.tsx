import { Link as ChakraLink, Box, Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const SearchCard = (movie: any ) => {
  return (
    <ChakraLink
      as={Link}
      to={`/movie/${movie?.id}`}
      className="search-card"
      data-testid="movie-card"
    >
      <Flex
        borderRadius="10px"
        p="20px"
        alignItems="center"
        _hover={{
          background: 'rgba(243, 244, 246, 0.8)',
          transform: 'scale(1.02)',
        }}
      >
        <Box
          borderRadius="10px"
          minW="60px"
          bgColor="transparent"
          className="poster-wrap"
        >
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
            alt={movie?.title}
            h="90px"
            borderRadius="10px"
            data-testid="movie-poster"
          />
        </Box>
        <Flex flexDir="column" gap="5px" className="detail">
          <Text color="gray.400" fontSize="12px" fontWeight="700" className="country">
            USA,{' '}
            <span data-testid="movie-release-date">
              {new Date(movie.release_date).getFullYear() || 'Unknown'}
            </span>
          </Text>
          <Text color="gray.900" fontSize="18px" fontWeight="700" className="title" data-testid="movie-title">
            {movie?.title}
          </Text>
          <Text color="gray.400" fontSize="12px" fontWeight="700" className="genre">
            {/* {getGenreByIds(movie?.genre_ids)} */}
          </Text>
        </Flex>
      </Flex>
    </ChakraLink>
  );
};

export default SearchCard;

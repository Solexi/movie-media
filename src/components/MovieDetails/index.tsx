// MovieDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVideoTrailer, getMovieDetails } from '../../services/tmdb';
import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import moviebox from "../../assets/Images/moviebox.png";
import home from "../../assets/Icons/Home.png";
import projector from "../../assets/Icons/Projector.png";
import tv from "../../assets/Icons/TV.png";
import logout from "../../assets/Icons/Logout.png";
import upcoming from "../../assets/Icons/Calendar.png";
import "typeface-poppins";

const MovieDetails: React.FC = () => {
    const { movieId } = useParams<{ movieId?: string }>();
    const [moviesDetails, setMovieDetails] = useState<any | null>(null);
    const [trailerKey, setTrailerKey] = useState("")

    // Fetch movie details based on the movieId and display them here

    useEffect(() => {
        console.log(movieId)

        const parsedMovieId = movieId ? parseInt(movieId, 10) : NaN;

        if (isNaN(parsedMovieId)) {
            // Handle the case where movieId is not a valid number
            console.error('Invalid movieId:', movieId);
            return;
        }

        const fetchDetails = async () => {
            try {
                const data = await getMovieDetails(parsedMovieId); // Replace with your fetch function
                setMovieDetails(data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        const fetchTrailer = async () => {
            try {
                const data = await fetchVideoTrailer(parsedMovieId);
                console.log(data);
                setTrailerKey(data);
                // console.log(data);     
            } catch (error) {
                console.error('Error fetching movie trailer:', error);
            }
        }

        fetchDetails();
        fetchTrailer();
    }, [movieId]);

    if (moviesDetails === null) {
        return <div>Loading...</div>;
    }

    return (
        <Flex
            w={"100%"}
            h={"100vh"}
            direction={"row"}
        >
            <Box
                display={"flex"}
                flexDirection={"column"}
                w={"226px"}
                h={"100vh"}
                borderTopRightRadius={"45px"}
                borderBottomRightRadius={"45px"}
                border={"1px solid"}
            >
                <Flex
                    direction={"row"}
                    align={"center"}
                    mb={65}
                    mx={20}
                >
                    <Image
                        src={moviebox}
                        w={"50px"}
                        h={"50px"}
                        mr={24}
                    />
                    <Text
                        fontSize={"24px"}
                        fontWeight={700}
                        color={"#000000"}
                    >
                        MovieBox
                    </Text>
                </Flex>
                <Flex
                    direction={"column"}
                    ml={42}
                // align={"center"}
                >
                    <Flex
                        flexDir={"row"}
                        align={"center"}
                    >
                        <Icon
                            as={Image}
                            src={home}
                            w={"25px"}
                            h={"25px"}
                            mr={15}
                        />
                        <Text
                            fontSize={"20px"}
                            fontWeight={600}
                            color={"#666666"}
                            fontFamily={"Poppins"}
                        >
                            Home
                        </Text>
                    </Flex>
                    <Flex
                        flexDir={"row"}
                        align={"center"}
                    >
                        <Icon
                            as={Image}
                            src={projector}
                            w={"25px"}
                            h={"25px"}
                            mr={15}
                        />
                        <Text
                            fontSize={"20px"}
                            fontWeight={600}
                            color={"#BE123C"}
                            fontFamily={"Poppins"}
                        >
                            Movies
                        </Text>
                    </Flex>
                    <Flex
                        flexDir={"row"}
                        align={"center"}
                    >
                        <Icon
                            as={Image}
                            src={tv}
                            w={"25px"}
                            h={"25px"}
                            mr={15}
                        />
                        <Text
                            fontSize={"20px"}
                            fontWeight={600}
                            color={"#666666"}
                            fontFamily={"Poppins"}
                        >
                            TV Series
                        </Text>
                    </Flex>
                    <Flex
                        flexDir={"row"}
                        align={"center"}
                    >
                        <Icon
                            as={Image}
                            src={upcoming}
                            w={"25px"}
                            h={"25px"}
                            mr={15}
                        />
                        <Text
                            fontSize={"20px"}
                            fontWeight={600}
                            color={"#666666"}
                            fontFamily={"Poppins"}
                        >
                            Upcoming
                        </Text>
                    </Flex>
                </Flex>
                <Flex
                    direction={"column"}
                    width={"170px"}
                    h={"210px"}
                    borderRadius={"20px"}
                    border={"1px solid rgba(190, 18, 60, 0.70)"}
                    background={"rgba(248, 231, 235, 0.40)"}
                    mx={28}
                    mt={48}
                    align={"center"}
                    justify={"center"}
                    fontFamily={'Poppins'}
                >
                    <Text
                        w={"137px"}
                        fontWeight={600}
                        fontSize={"15px"}
                        color={"#333333CC"}
                    >
                        Play movie quizes and earn free tickets
                    </Text>
                    <Text
                        w={"139px"}
                        fontWeight={500}
                        fontSize={"12px"}
                        color={"#333333CC"}
                    >
                        50k people are playing now
                    </Text>
                    <Box
                        as={Button}
                        w={"112px"}
                        h={"30px"}
                        borderRadius={"30px"}
                        bg={"#BE123C33"}
                        border={"0px"}
                    >
                        <Text
                            w={"137px"}
                            fontWeight={500}
                            fontSize={"12px"}
                            color={"#BE123C"}
                        >
                            Start Playing
                        </Text>
                    </Box>
                </Flex>
                <Flex
                    flexDir={"row"}
                    align={"center"}
                    ml={42}
                >
                    <Icon
                        as={Image}
                        src={logout}
                        w={"30px"}
                        h={"30px"}
                        mr={15}
                    />
                    <Text
                        fontSize={"20px"}
                        fontWeight={600}
                        color={"#666666"}
                        fontFamily={"Poppins"}
                    >
                        Log out
                    </Text>
                </Flex>
            </Box>
            <Flex
                direction={"column"}
                align={"center"}
                px={"35"}
                mt={38}
                overflowY={"scroll"}
            >
                <Box
                    //   position={"relative"}
                    overflow="hidden"
                    borderRadius="20px"
                    w={"1140px"}
                    h={"449px"}
                >
                {trailerKey && (
                    <iframe
                        title='Youtube Video Player'
                        src={`https://www.youtube.com/embed/${trailerKey}`}
                        allowFullScreen
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                    ></iframe>
                )}
                </Box>


            </Flex>
        </Flex>
    );
};

export default MovieDetails;

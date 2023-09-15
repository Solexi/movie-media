import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVideoTrailer, getMovieDetails } from '../../services/tmdb';
import { Box, Button, Flex, Icon, Image, Text, color } from '@chakra-ui/react';
import moviebox from "../../assets/Images/moviebox.png";
import home from "../../assets/Icons/Home.png";
import projector from "../../assets/Icons/Projector.png";
import tv from "../../assets/Icons/TV.png";
import logout from "../../assets/Icons/Logout.png";
import upcoming from "../../assets/Icons/Calendar.png";
import "typeface-poppins";
import star from "../../assets/Images/Star.png"
import arrow from "../../assets/Icons/Arrow.png";
import ticket from "../../assets/Icons/Tickets.png";
import list from "../../assets/Icons/List.png";
import list2 from "../../assets/Icons/Listw.png";
import movies from "../../assets/Images/bestmovies.png";

const MovieDetails: React.FC = () => {
    const { movieId } = useParams<{ movieId?: string }>();
    const [moviesDetails, setMovieDetails] = useState<any | null>(null);
    const [trailerKey, setTrailerKey] = useState("")

    const formatDateToUTC = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        const utcDateString = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getUTCDate().toString().padStart(2, "0")}`;
        return utcDateString;
    };

    function toHoursAndMinutes(totalMinutes: number) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return `${padToTwoDigits(hours)}h ${padToTwoDigits(minutes)}m`;
    }

    function padToTwoDigits(num: number) {
        return num.toString().padStart(2);
    }

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
            fontFamily={'Poppins'}
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
                    mt={20}
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
                px={"35"}
                mt={38}
                overflowY={"auto"}
                // overflowX={"auto"}
                css={{
                    overflowY: "scroll",
                    overflowX: "hidden", // Show only vertical scrollbar
                    "&::-webkit-scrollbar": {
                        width: "10px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#BE123C33",
                        borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#BE123C",
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#BE123C33",
                        borderRadius: "10px",
                    },
                }}

            >
                <Box
                    overflow="hidden"
                    borderRadius="20px"
                    w={"1140px"}
                    h={"449px"}
                    mb={20}
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
                <Box
                    // w={"774px"}
                    h={"150px"}
                    fontFamily={'Poppins'}
                >
                    <Flex
                        direction={"row"}
                        align={"center"}
                        justify={"space-between"}
                    >
                        <Flex
                            w={"774px"}
                        >
                            <Flex
                                direction={"row"}
                                fontWeight={500}
                                fontSize={"16px"}
                                color={"#404040"}
                                align={"center"}
                                mr={20}
                            >
                                <Text
                                    data-testid="movie-title"
                                    overflowWrap="break-word"
                                >
                                    {moviesDetails.title}
                                    <span style={{ fontWeight: 700, padding: "10px" }}>•</span>
                                </Text>
                                <Text
                                    data-testid="movie-release-date"
                                >
                                    {formatDateToUTC(moviesDetails.release_date)}  <span style={{ fontWeight: 700, padding: "5px" }}>•</span>
                                </Text>
                                <Text>
                                    PG-13 <span style={{ fontWeight: 700, padding: "5px" }}>•</span>
                                </Text>
                                <Text
                                    data-testid="movie-runtime"
                                    w={100}
                                >
                                    {toHoursAndMinutes(moviesDetails.runtime)}
                                </Text>
                            </Flex>
                            <Flex
                                direction={"row"}
                                align={"center"}
                            >
                                {moviesDetails.genres.map((genre: any) => (
                                    <Box
                                        key={genre.id}
                                        border={"1px solid #F8E7EB"}
                                        py={2}
                                        px={5}
                                        borderRadius={15}
                                        mr={5}
                                        color={"#BE123C"}
                                        bg={"#FFFFFF"}
                                        fontSize={"12px"}
                                        fontWeight={500}
                                    >
                                        {genre.name}
                                    </Box>
                                ))}
                            </Flex>
                        </Flex>
                        <Flex
                            w={"144px"}
                            flexDir={"row"}
                            align={"center"}
                        >
                            <Image
                                src={star}
                                alt={"Star"}
                                w={"30px"}
                                h={"30px"}
                                mr={4}
                            />
                            <Text
                                color={"#666666"}
                                fontSize={"16px"}
                                fontWeight={500}
                            >
                                {moviesDetails.vote_average} <span style={{ color: "#000000", fontSize: "14px" }}> | 350k</span>
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex
                        direction={"row"}
                        justifyContent={"space-between"}
                    >
                        <Box
                            w={"774px"}
                        >
                            <Text
                                fontSize={"16px"}
                                fontWeight={400}
                                data-testid="movie-overview"
                            >
                                {moviesDetails.overview}
                            </Text>
                            <Text>
                                Director: <span style={{ color: "#BE123C" }}>Joseph Kosinski</span>
                            </Text>
                            <Text>
                                Writers: <span style={{ color: "#BE123C" }}>Jim Cash, Jack Epps Jr, Peter Craig</span>
                            </Text>
                            <Text>
                                Stars: <span style={{ color: "#BE123C" }}>Tom Cruise, Jennifer Connelly, Val Kilmer</span>
                            </Text>
                            <Flex
                                border={"1px solid #C7C7C7"}
                                direction={"row"}
                                borderRadius={"10px"}
                                justifyContent={"space-between"}
                            >
                                <Box
                                    fontSize={"20px"}
                                    fontWeight={500}
                                    color={"#FFFFFF"}
                                    borderRadius={"10px"}
                                    bg={"#BE123C"}
                                    px={"20px"}
                                    py={"7px"}
                                >
                                    Top rated movie #65
                                </Box>
                                <Flex
                                    dir='row'
                                    align={"center"}
                                    mr={10}
                                >
                                    Awards 9 nominations
                                    <Icon
                                        as={Image}
                                        src={arrow}
                                        ml={8}
                                    />
                                </Flex>
                            </Flex>
                        </Box>
                        <Flex
                            direction={"column"}
                            w={""}
                        >
                            <Box
                                as={Button}
                                bg={"#BE123C"}
                                color={"#FFFFFF"}
                                px={36}
                                py={12.5}
                                borderRadius={"10px"}
                                border={"0px"}
                                cursor={"pointer"}
                                mb={12}
                                style={{
                                    fontWeight: 700,
                                    fontSize: "16px",
                                }}
                            >
                                <Icon
                                    as={Image}
                                    src={ticket}
                                    w={25}
                                    h={25}
                                    mr={10}
                                />
                                See Showtimes
                            </Box>
                            <Box
                                as={Button}
                                bg={"#BE123C1A"}
                                color={"#000000"}
                                px={36}
                                py={12.5}
                                borderRadius={"10px"}
                                border={"1px solid #BE123C"}
                                cursor={"pointer"}
                                mb={23}
                                style={{
                                    fontWeight: 700,
                                    fontSize: "16px",
                                }}
                            >
                                <Icon
                                    as={Image}
                                    src={list}
                                    w={25}
                                    h={25}
                                    mr={10}
                                />
                                More Watch Options
                            </Box>
                            <Box
                                bg={`url(${movies})`}
                                w={"340px"}
                                h={"230px"}
                                borderRadius={"10px"}
                            >
                                <Flex
                                    position={"relative"}
                                    bg={"#12121280"}
                                    h={"42px"}
                                    top={"190px"}
                                    zIndex={0}
                                    color={"#FFFFFF"}
                                    fontSize={"14px"}
                                    fontWeight={500}
                                    justify={"center"}
                                    align={"center"}
                                    borderRadius={"0px 0px 10px 10px"}
                                >
                                    <Icon
                                        as={Image}
                                        src={list2}
                                        w={25}
                                        h={25}
                                        mr={10}
                                    />
                                    The Best Movies and Shows in September
                                </Flex>
                            </Box>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    );
};

export default MovieDetails;

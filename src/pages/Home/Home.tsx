import { Box, Flex, Image, Input, InputGroup, InputRightElement, Stack, Text, Icon } from "@chakra-ui/react"
import MovieCard from "../../components/MovieCard/index";
import { useEffect, useState } from "react";
import { fetchTrendingMovies, fetchSearchResults } from "../../services/tmdb";
import "../../styles/index.css";
import imdb from "../../assets/Images/imdb.png";
import tomatoes from "../../assets/Images/rotten.png";
import watch from "../../assets/Images/watch.png";
import moviebox from "../../assets/Images/moviebox.png";
import menu from "../../assets/Images/Menu.png";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import SearchCard from "../../components/SearchCard";

const Home: React.FC = () => {
    const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [clearQuery, setClearQuery] = useState(false);
    const [enterPressed, setEnterPressed] = useState(false);
    const navigate = useNavigate();
    const [isSearching, setIsSearching] = useState(false);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // User pressed Enter, fetch search results
            fetchSearch(query);
            navigate(`/search/${query}`)
            setEnterPressed(true);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        if (newQuery.trim() !== '') {
            fetchSearch(newQuery);
            setShowResults(true);
            setClearQuery(true)
            console.log(newQuery)
        } else {
            setShowResults(false);
            setClearQuery(false);
            setSearchResults([]);
        }
    };

    const fetchSearch = async (query: string) => {
        try {
            const data = await fetchSearchResults(query);
            setSearchResults(data.results);
            console.log(searchResults);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleSlideChange = (index: number) => {
        setCurrentSlide(index);
    };

    const handleClearQuery = (e: any) => {
        setQuery("");
        setSearchResults([]);
        setClearQuery(false);
    }


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) =>
                prevSlide === trendingMovies.length - 1 ? 0 : prevSlide + 1
            );
        }, 30000); // Change image every 30 seconds

        return () => clearInterval(interval);
    }, [trendingMovies.length]);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const data = await fetchTrendingMovies();
                setTrendingMovies(data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };

        if (trendingMovies.length === 0) {
            fetchTrending();
        }
        console.log(trendingMovies)
    }, [trendingMovies])
    return (
        <Stack
            w={"100%"}
            flexDirection="column"
            align={"center"}
            fontFamily={"DM Sans"}
        >
            <Flex
                overflow={"hidden"}
            >
                {trendingMovies.map((movie: any, index) => (
                    <Box
                        key={index}
                        w={"100vw"}
                        h={"600px"}
                        display={index === currentSlide ? "block" : "none"}
                        transition={"opacity 0.5s ease-in-out"}
                        opacity={index === currentSlide ? 1 : 0}
                        bg={`linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url(https://image.tmdb.org/t/p/w1280${trendingMovies[currentSlide]?.backdrop_path}) lightgray 50% / cover no-repeat`}
                        bgSize={"cover"}
                        zIndex={index === currentSlide ? 1 : 0}
                    >
                        <Flex
                            dir="row"
                            align={"center"}
                            zIndex={1}
                            as={"nav"}
                            bg={"transparent"}
                            justify={"space-evenly"}
                            h={"80px"}
                            px={120}
                        >
                            <>
                                <Image
                                    src={moviebox}
                                    w={"50px"}
                                    h={"50px"}
                                    mr={24}
                                />
                                <Text
                                    fontSize={"24px"}
                                    fontWeight={700}
                                    color={"#FFFFFF"}
                                >
                                    MovieBox
                                </Text>
                            </>
                            <InputGroup>
                                <Input
                                    value={query}
                                    zIndex={2}
                                    type="search"
                                    placeholder={"What do you want to watch?"}
                                    w={"36.46vw"}
                                    h={"36px"}
                                    color={"#FFFFFF"}
                                    fontSize={"16px"}
                                    fontWeight={400}
                                    bg={"transparent"}
                                    border={"2px solid #D1D5DB"}
                                    px={"10px"}
                                    borderRadius={"6px"}
                                    mx={150}
                                    _placeholder={{
                                        color: "#FFFFFF",
                                        fontSize: "16px",
                                        fontWeight: 400,
                                    }}
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
                                />
                                {clearQuery ? (
                                    <InputRightElement
                                        position={"relative"}
                                        left={-180}
                                    >
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            color="#FFFFFF"
                                            onClick={handleClearQuery}
                                        />
                                    </InputRightElement>) : (
                                    <InputRightElement
                                        children={
                                            <FontAwesomeIcon
                                                icon={faSearch}
                                                color="#FFFFFF"
                                            />
                                        }
                                        position={"relative"}
                                        left={-180}
                                    />
                                )}
                            </InputGroup>
                            {showResults && (
                                <Box
                                    bg={"#d1d5db"}
                                    w={"490px"}
                                    h={"500px"}
                                    position={"absolute"}
                                    top={"8%"}
                                    px={12}
                                    overflowY={"scroll"}
                                    mr={0}
                                >
                                    {searchResults.map((movie, index) => (
                                        <Text
                                            key={index}
                                            borderBottom={"0.5px solid"}
                                        >
                                            {movie.title}
                                        </Text>
                                    ))}
                                    {!isSearching && searchResults.length < 1 ? (
                                        <>
                                            <div className="no-result">
                                                <p>No results found</p>
                                            </div>
                                        </>
                                    ) : null}
                                </Box>
                            )}

                            <>
                                <Text
                                    zIndex={10}
                                    mr={27}
                                    w={"80px"}
                                    fontSize={"16px"}
                                    textAlign={"center"}
                                    fontWeight={700}
                                    color={"#FFFFFF"}
                                >
                                    Sign in
                                </Text>
                                <Image
                                    src={menu}
                                    w={"36px"}
                                    h={"36px"}
                                />
                            </>
                        </Flex>
                        <Box
                            display={"flex"}
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                            px={120}
                        >
                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                h={"100%"}
                                pb={100}
                            >
                                <Text
                                    pt={78}
                                    color={"#FFFFFF"}
                                    w={"404px"}
                                    fontSize={"48px"}
                                    fontWeight={700}
                                    mb={0}
                                >
                                    {movie.title}
                                </Text>
                                <Flex
                                    flexDirection={"row"}
                                    justifyContent={"space-between"}
                                    mb={-10}
                                    w={"184px"}
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
                                            color={"#FFFFFF"}
                                            lineHeight={"12px"}
                                        >
                                            {parseInt(movie.vote_average) * 10}.0 / 100
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
                                            color={"#FFFFFF"}
                                            lineHeight={"12px"}
                                        >
                                            97%
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Text
                                    color={"#FFFFFF"}
                                    w={"450px"}
                                    mb={30}
                                >
                                    {movie.overview}
                                </Text>
                                <Flex
                                    bg={"#BE123C"}
                                    borderRadius={"6px"}
                                    w={"169px"}
                                    h={"36px"}
                                    align={"center"}
                                >
                                    <Image
                                        src={watch}
                                        w={"20px"}
                                        h={"20px"}
                                        ml={"14px"}
                                        mr={8}
                                    />
                                    <Text
                                        color={"#FFFFFF"}
                                        fontSize={"14px"}
                                        fontWeight={700}
                                        mr={"14px"}
                                    >
                                        WATCH TRAILER
                                    </Text>
                                </Flex>
                            </Box>
                            <Flex
                                flexDirection={"column"}
                                justify={"center"}
                            >
                                {trendingMovies.map((_, index) => (
                                    <Flex
                                        zIndex={1}
                                        key={index}
                                        flexDir={"row"}
                                        align={"center"}
                                        w={"36px"}
                                        justify={"flex-end"}
                                    >
                                        {index === currentSlide && (
                                            <Box
                                                w="20px"
                                                h="3px"
                                                bg="#FFFFFF"
                                                mr="5px"
                                            ></Box>
                                        )}
                                        <Text
                                            display={"flex"}
                                            flexDir={"column"}
                                            color={index === currentSlide ? "#FFFFFF" : "#9CA3AF"}
                                            fontSize={index === currentSlide ? "16px" : "12px"}
                                            fontWeight={700}
                                            cursor="pointer"
                                            onClick={() => handleSlideChange(index)}
                                        >
                                            {index + 1}
                                        </Text>
                                    </Flex>
                                ))}
                            </Flex>
                        </Box>
                    </Box>
                ))}
            </Flex>
            <Flex
                w={"100%"}
                display={"flex"}
                flexDirection="row"
                justifyContent={"space-between"}
                align={"center"}
                h={"47px"}
                mt={70}
                mb={44}
            >
                <Text
                    fontSize={"36px"}
                    fontWeight={700}
                    ml={"8vw"}
                >
                    Featured Movie
                </Text>
                <Flex
                    flexDirection={"row"}
                    w={"107px"}
                    h={"24px"}
                    justify={"center"}
                    align={"center"} /* Add this line to vertically center the content */
                    cursor={"pointer"}
                    mr={"8vw"}
                >
                    <Text
                        fontSize={"18px"}
                        fontWeight={400}
                        color={"#B91C1C"}
                        mr={8}
                    >
                        See more
                    </Text>
                    <Box alignContent={"center"}>
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            width={"11.67px"}
                            height={"5.83px"}
                            color="#B91C1C"
                        />
                    </Box>
                </Flex>

            </Flex>
            <Box
                mb={147}
            >
                <MovieCard />
            </Box>
            <Flex
                align={"center"}
                direction={"column"}
                gap={36}
            >
                <Flex
                    flexDirection={"row"}
                    align={"center"}
                    gap={48}
                >
                    <Icon as={FaFacebook} w={"24px"} h={"27.43px"} color="blue.500" />
                    <Icon as={FaInstagram} w={"24px"} h={"27.43px"} color="blue.500" />
                    <Icon as={FaTwitter} w={"24px"} h={"27.43px"} color="blue.500" />
                    <Icon as={FaYoutube} w={"24px"} h={"27.43px"} color="blue.500" />
                </Flex>
                <Flex
                    fontSize={"18px"}
                    fontWeight={700}
                    color={"#111827"}
                    align={"center"}
                    gap={48}
                    mr={16}
                >
                    <Text>
                        Conditions of Use
                    </Text>
                    <Text
                    >
                        Privacy Policy
                    </Text>
                    <Text>
                        Press Room
                    </Text>
                </Flex>
                <Text
                    fontSize={"18px"}
                    fontWeight={400}
                    color={"#6B7280"}
                    lineHeight={"12px"}
                >
                    © 2021 MovieBox. All Rights Reserved.
                </Text>
            </Flex>
        </Stack>
    )
}

export default Home;
import logo from "./logo.svg";
import "./App.css";
import ReactPlayer from "react-player";
import {
  ChakraProvider,
  extendTheme,
  Box,
  Button,
  Flex,
  Container,
  Icon,
  Square,
  Stack,
  Text,
  Heading,
  Grid,
  GridItem,
  Progress,
  Center,
  Divider,
  List,
  ListItem,
  ListIcon,
  Textarea,
  Tag,
  TagLabel,
  TagCloseButton,
  TagLeftIcon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  Tooltip,
  Spinner,
  Input,
} from "@chakra-ui/react";
import { FiEdit2, FiCheck, FiPlus } from "react-icons/fi";
import { useState } from "react";

const theme = extendTheme({
  /*fonts: {
    heading: "'Epilogue', sans-serif",
    body: "'Inter', sans-serif",
  },*/
  colors: {
    "pt-bg": "#F6FAFD",
    "pt-blue": "#0168FF",
    "pt-navy": "#012D9B",
  },
});

const Header = () => {
  return (
    <Box m={6}>
      <Heading size="md">Caller #123456</Heading>
    </Box>
  );
};

const Issue = () => {
  return (
    <Box width={200}>
      <Box py={3} m={3}>
        <Heading size="md">Customer Info</Heading>
        <Box py={3}>
          <Tag>Residential</Tag>
          <Text color="grey">English</Text>
          <Text color="grey">9:31 am PST</Text>
        </Box>

        <Box py={3}>
          <Heading size="xs">Name</Heading>
          <Text>Greg Abott</Text>
          <Heading size="xs">ANI</Heading>
          <Text>12345678</Text>
        </Box>

        <Box>
          <Center>
            <Button size="sm" variant="outline" rightIcon={<FiEdit2 />}>
              View more details
            </Button>
          </Center>
        </Box>
      </Box>
      <Divider />

      <Box m={3} py={3}>
        <Heading size="md">Customer Issues</Heading>
        <Box my={3}>
          <Tag borderRadius="full" variant="solid" colorScheme="green">
            <TagLabel>High Bill</TagLabel>
            <TagCloseButton />
          </Tag>
        </Box>
        <Tag borderRadius="full" variant="solid">
          <TagLeftIcon as={FiPlus} />
          <TagLabel>Custom Issue</TagLabel>
        </Tag>
      </Box>
    </Box>
  );
};

const Transcript = () => {
  const [file, setFile] = useState();

  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [player, setPlayer] = useState();
  const [seeking, setSeeking] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState();
  const [currStep, setCurrStep] = useState();

  const log = [
    { speaker: "agent", text: "Hello" },
    { speaker: "caller", text: "World" },
    { speaker: "agent", text: "Bingo" },
    { speaker: "caller", text: "Bango" },
    { speaker: "agent", text: "Bongo" },
  ];

  const key = [
    { label: "greeting", color: "green" },
    { label: "question", color: "yellow" },
  ];

  const data = [
    { time: 1000, label: "greeting" },
    { time: 2000, label: "greeting" },
    { time: 6000, label: "question" },
    { time: 9000, label: "greeting" },
    { time: 10000, label: "greeting" },
    { time: 11000, label: "question" },
  ];

  const ref = (player) => {
    setPlayer(player);
  };

  const handleSeekMouseDown = (e) => {
    setSeeking(true);
  };

  const handleSeekMouseUp = (v) => {
    setSeeking(false);
    player.seekTo(v, "seconds");
  };

  const handleProgress = (state) => {
    if (!seeking) setPlayedSeconds(state.playedSeconds);
  };

  return (
    <Box>
      <Box m={3}>
        <Center>
          <Input
            width={300}
            borderWidth={0}
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setLoading(true);
              setTimeout(() => setLoading(false), 5000);
            }}
          />
        </Center>

        {loading ? (
          <Spinner />
        ) : (
          <Box>
            <Center mb={9} mt={-230}>
              <ReactPlayer
                controls
                playing={playing}
                onReady={() => {
                  setTimeout(() => {
                    setPlayerReady(true);
                  }, 1000);
                }}
                ref={ref}
                url="/AUDIO_8076.mp3"
                onProgress={(state) => handleProgress(state)}
              />
            </Center>
            <Center>
              <Box>
                {key.map((item) => {
                  return (
                    <Flex m={3} key={item.label}>
                      <Box bg={item.color} height={30} width={30} />
                      <Text mx={2}>{item.label}</Text>
                    </Flex>
                  );
                })}
              </Box>
            </Center>
          </Box>
        )}
        {playerReady && (
          <Slider
            size="sm"
            defaultValue={0}
            min={0}
            max={player.getDuration()}
            onChangeStart={(v) => handleSeekMouseDown(v)}
            onChangeEnd={(v) => handleSeekMouseUp(v)}
            onChange={(v) => setPlayedSeconds(v)}
            value={playedSeconds}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <SliderTrack height={5}>
              <SliderFilledTrack bg="gainsboro" />
            </SliderTrack>

            {data.map((timestamp, i) => {
              const findKeyIndex = (label) => {
                for (let i = 0; i < key.length; i++) {
                  if (key[i].label === label) {
                    return i;
                  }
                }
              };

              if (timestamp.label === "no label") return;

              var time = timestamp.time / 1000;
              return (
                <SliderMark key={timestamp.time} value={time} mt="-18">
                  <Box
                    borderRadius={9}
                    height={9}
                    width={1}
                    bg={key[findKeyIndex(timestamp.label)].color}
                  />
                </SliderMark>
              );
            })}

            <Tooltip
              hasArrow
              bg="teal.500"
              color="white"
              placement="top"
              isOpen={showTooltip}
              label={"test"}
            >
              <SliderThumb size="sm">
                <Box width={1} height={16} bg="whitesmoke" borderWidth={1} />
              </SliderThumb>
            </Tooltip>
          </Slider>
        )}

        {/*
        <Heading>Transcript</Heading>
        {log.map((item) => {
          return (
            <Box
              bg="teal"
              m={3}
              p={2}
              borderRadius={100}
              borderBottomLeftRadius={item.speaker !== "agent" && 0}
              borderBottomRightRadius={item.speaker === "agent" && 0}
            >
              <Text align={item.speaker === "agent" ? "right" : "left"}>
                {item.text}
              </Text>
            </Box>
          );
        })}*/}
      </Box>

      <Divider />

      <Box m={3}>
        <Heading>Call Summary</Heading>
        <Textarea />
      </Box>
    </Box>
  );
};

const ProgressStats = () => {
  const template = [
    "Greeting & Verification",
    "Issue Identification",
    "Solve Issue",
    "Offer Resources",
    "Wrap Up",
  ];

  return (
    <Box width={330}>
      <Box my={6} mx={3}>
        <Heading size="md">Progress</Heading>
        <Center>
          <Box>
            <Center>
              <Text fontSize="3xl">70%</Text>
            </Center>
            <Center>
              <Text fontSize="xl">12:11</Text>
            </Center>
          </Box>
        </Center>
        <Box width="100%">
          <Progress borderRadius={9} value={70} />
        </Box>
      </Box>

      <Divider />

      {/*<Box my={6} mx={3}>
        <Heading size="md">Customer Issue</Heading>
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            High Billing
          </Text>

          <Button size="sm" variant="outline" rightIcon={<FiEdit2 />}>
            Change
          </Button>
        </Box>
  </Box>*/}

      <Divider />

      <Box my={6} mx={3}>
        <Heading size="md">Template</Heading>
        <Box>
          <List spacing={3}>
            {template.map((item) => {
              return (
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  {item}
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>

      <Divider />

      <Box my={6} mx={3}>
        <Heading size="md">Sentiment</Heading>
        <Center>
          <Box>
            <Center>
              <Text fontSize="md">Happy</Text>
            </Center>
          </Box>
        </Center>
        <Box width="100%">
          <Progress borderRadius={9} value={90} />
        </Box>
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Grid
          templateAreas={`"header header header"
                  "issue transcript progress"`}
          gridTemplateRows={"60px 1fr 30px"}
          gridTemplateColumns={"200px 1fr"}
          h="100vh"
          //gap="3"
          color="blackAlpha.700"
        >
          <GridItem borderBottomWidth={3} area={"header"}>
            <Header />
          </GridItem>
          <GridItem borderRightWidth={3} area={"issue"}>
            <Issue />
          </GridItem>
          <GridItem area={"transcript"}>
            <Transcript />
          </GridItem>
          <GridItem borderLeftWidth={3} area={"progress"}>
            <ProgressStats />
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default App;

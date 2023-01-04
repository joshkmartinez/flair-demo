import logo from "./logo.svg";
import "./App.css";
import ReactPlayer from "react-player";
import {
  ChakraProvider,
  extendTheme,
  Box,
  Button,
  Flex,
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
import { FiEdit2, FiCircle, FiCheckCircle, FiPlus } from "react-icons/fi";
import { useState, useRef } from "react";

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

const App = () => {
  const Header = () => {
    return (
      <Box m={6}>
        <Heading size="md">Caller #123456</Heading>
      </Box>
    );
  };

  const [file, setFile] = useState();

  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [player, setPlayer] = useState();
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
    { label: "Greeting", color: "red" },
    { label: "Listen to Customer’s Concerns", color: "orange" },
    { label: "Identification / Verification", color: "tomato" },
    { label: "Check Meter Reading is Estimated or Actual", color: "green" },
    { label: "Assess Nonseasonal Effects", color: "blue" },
    { label: "Assess Seasonal Effects", color: "indigo" },
    { label: "Check HVAC Maintenance", color: "violet" },
    { label: "Troubleshoot & Offer Solutions", color: "maroon" },
  ];

  // essentially starts empty, gets filled with script from template
  const data = [
    /* time: 0, label: "Greeting" }*/
  ];

  const template = [
    { step: "Greeting", time: 0 },
    { step: "Listen to Customer’s Concerns", time: 24 },
    { step: "Identification / Verification", time: 49 },
    { step: "Check Meter Reading is Estimated or Actual", time: 78 },
    { step: "Assess Nonseasonal Effects", time: null },
    { step: "Assess Seasonal Effects", time: 111 },
    { step: "Check HVAC Maintenance", time: 132 },
    { step: "Troubleshoot & Offer Solutions", time: 150 },
  ];

  template.map((item, j) => {
    if (item.time != null) {
      for (
        let i = item.time;
        i < (j == template.length - 1 ? 10 : template[j + 1].time);
        //(template[j + 1].time == null ? template[j + 2].time :  )
        i = i + 0.3
      ) {
        data.push({ time: i * 1000, label: item.step });
      }
    }
  });

  for (let i = 78; i < 111; i = i + 0.3) {
    data.push({
      time: i * 1000,
      label: "Check Meter Reading is Estimated or Actual",
    });
  }

  for (let i = 150; i < 228; i = i + 0.3) {
    data.push({ time: i * 1000, label: "Troubleshoot & Offer Solutions" });
  }

  //console.log(data);

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

  function timeFormat(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  }

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
                {playerReady && (
                  <Box>
                    <Box my={3}>
                      <Tag
                        borderRadius="full"
                        variant="solid"
                        colorScheme="green"
                      >
                        <TagLabel>High Bill</TagLabel>
                        <TagCloseButton />
                      </Tag>
                    </Box>
                    <Tag borderRadius="full" variant="solid">
                      <TagLeftIcon as={FiPlus} />
                      <TagLabel>Custom Issue</TagLabel>
                    </Tag>
                  </Box>
                )}
              </Box>
            </Box>
          </GridItem>
          <GridItem area={"transcript"}>
            <Box p={3}>
              <Center>
                {!loaded && (
                  <Input
                    zIndex={1}
                    width={300}
                    borderWidth={0}
                    multiple={false}
                    type="file"
                    accept=".mp3"
                    onChange={(e) => {
                      //setFile(e.target.files[0]);
                      setLoading(true);
                      setTimeout(() => {
                        setLoading(false);
                        setLoaded(true);
                      }, 5000);
                    }}
                  />
                )}
              </Center>
              {loading && (
                <Center m={9}>
                  <Spinner />
                </Center>
              )}
              {loaded && (
                <Box>
                  <Box>
                    <Center mb={9} mt={-230}>
                      <ReactPlayer
                        controls
                        playing={playing}
                        onReady={() => {
                          setTimeout(() => {
                            setPlayerReady(true);
                          }, 2000);
                        }}
                        ref={ref}
                        url={"/AUDIO_8076.mp3"}
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

                  {playerReady && (
                    <Box m={9}>
                      <Slider
                        size="sm"
                        defaultValue={0}
                        min={0}
                        max={player.getDuration()}
                        onChangeStart={(v) => handleSeekMouseDown(v)}
                        onChangeEnd={(v) => handleSeekMouseUp(v)}
                        onChange={(v) => setPlayedSeconds(v)}
                        value={playedSeconds}
                        //onMouseEnter={() => setShowTooltip(true)}
                        //onMouseLeave={() => setShowTooltip(false)}
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
                            <SliderMark
                              key={timestamp.time}
                              value={time}
                              mt="-18"
                              zIndex={1}
                            >
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
                            <Box
                              width={1}
                              height={16}
                              bg="whitesmoke"
                              borderWidth={1}
                            />
                          </SliderThumb>
                        </Tooltip>
                      </Slider>
                    </Box>
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
              )}
              <Divider />

              <Box m={3}>
                <Heading>Call Summary</Heading>
                <Textarea
                  my={3}
                  height={360}
                  defaultValue={
                    playerReady
                      ? `Customer verified: Customer Account – 123456789
Issue Detected: High Bill
Customer’s complaint: High bill for a few months now
Agent Paula verified last three bills are not estimated. Agent Paula confirmed that bills are higher compared to previous year
Agent Paula verified customer AC was serviced 4 years back
Customer objects that just AC service alone cannot cause high bill by more than $50
Agent Paula compares hourly usage and notices pikes from 9 pm-6am
Customer confirms that husband is Uber driver and charges his Tesla at that time.
Agent Paula agrees. Agent shares follow up action to send a SMS link for AC maintenance and mobile apps.
Agent advises customer to sign up for high bill alerts, evaluate EV rates using calculators and enroll in budget bill using mobile app.
Agent Actions & ToDo’s:
         Send text with link to best HVAC maintenance vendors
         Send text with link to mobile app
`
                      : ""
                  }
                />
              </Box>
            </Box>
          </GridItem>
          <GridItem borderLeftWidth={3} area={"progress"}>
            <Box width={330}>
              <Box my={6} mx={3}>
                <Heading size="md">Progress</Heading>
                <Center>
                  <Box>
                    <Center>
                      <Text fontSize="3xl">
                        {playerReady &&
                          Math.floor(
                            (playedSeconds / player.getDuration()) * 100
                          )}
                        %
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="xl">{timeFormat(setPlayedSeconds)}</Text>
                    </Center>
                  </Box>
                </Center>
                <Box width="100%">
                  <Progress
                    borderRadius={9}
                    value={playedSeconds}
                    max={playerReady && player.getDuration()}
                  />
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
                    {playerReady &&
                      template.map((item) => {
                        return (
                          <ListItem key={item.step}>
                            <ListIcon
                              as={
                                item.time === null || item.time > playedSeconds
                                  ? FiCircle
                                  : FiCheckCircle
                              }
                              color={
                                item.time === null || item.time > playedSeconds
                                  ? "grey"
                                  : "green.500"
                              }
                            />
                            {item.step}
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
                  <Progress
                    borderRadius={9}
                    value={
                      playerReady &&
                      (playedSeconds / player.getDuration()) *
                        100 *
                        (Math.random() * (1 - 0.7) + 0.7)
                    }
                  />
                </Box>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default App;

import logo from "./logo.svg";
import "./App.css";

import {
  ChakraProvider,
  extendTheme,
  Box,
  Button,
  CloseButton,
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
} from "@chakra-ui/react";
import { FiEdit2, FiCheck, FiPlus } from "react-icons/fi";

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
    <Box p={4}>
      <Heading size="md">Caller #123456</Heading>
    </Box>
  );
};

const Issue = () => {
  return (
    <Box width={200}>
      <Box py={3} m={3}>
        <Box>
          <Heading size="md">Customer Info</Heading>
          <Tag>Residential</Tag>
          <Text color="grey">English, Spanish</Text>
          <Text color="grey">9:00</Text>
        </Box>

        <Box p={3}>
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
  const log = [
    { speaker: "agent", text: "Hello" },
    { speaker: "caller", text: "World" },
    { speaker: "agent", text: "Bingo" },
    { speaker: "caller", text: "Bango" },
    { speaker: "agent", text: "Bongo" },
  ];

  return (
    <Box>
      <Box m={3}>
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
        })}
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
    <Box width={230}>
      <Box my={6} mx={3}>
        <Heading size="sm">Progress</Heading>
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

      <Box my={6} mx={3}>
        <Heading size="sm">Customer Issue</Heading>
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            High Billing
          </Text>

          <Button size="sm" variant="outline" rightIcon={<FiEdit2 />}>
            Change
          </Button>
        </Box>
      </Box>

      <Divider />

      <Box my={6} mx={3}>
        <Heading size="sm">Template</Heading>
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
        <Heading size="sm">Sentiment</Heading>
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
          gap="3"
          color="blackAlpha.700"
        >
          <GridItem bg="orange.300" area={"header"}>
            <Header />
          </GridItem>
          <GridItem bg="pink.300" area={"issue"}>
            <Issue />
          </GridItem>
          <GridItem bg="green.300" area={"transcript"}>
            <Transcript />
          </GridItem>
          <GridItem bg="blue.300" area={"progress"}>
            <ProgressStats />
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default App;

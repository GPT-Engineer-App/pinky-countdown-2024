import { Box, Center, VStack, Text, Heading, useColorModeValue, Container, HStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";

const CountDownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <Text key={interval} fontSize="3xl" fontWeight="bold" mx={2}>
        {timeLeft[interval]} {interval}
      </Text>,
    );
  });

  return (
    <Center>
      <HStack>{timerComponents.length ? timerComponents : <Text>Time's up!</Text>}</HStack>
    </Center>
  );
};

const Index = () => {
  const bgColor = useColorModeValue("pink.100", "pink.900");
  const color = useColorModeValue("pink.800", "pink.100");

  return (
    <Box bg={bgColor} minH="100vh">
      <Container centerContent py="40">
        <VStack spacing={8}>
          <Heading color={color} as="h1" size="2xl" textAlign="center" letterSpacing="wider" fontWeight="extrabold">
            Countdown to April 28th, 2024
          </Heading>
          <Box p={4} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
            <CountDownTimer targetDate="2024-04-28T00:00:00" />
          </Box>
          <Center w="full">
            <FaClock size="3em" color={color} />
          </Center>
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;

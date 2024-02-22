import { Box, Center, VStack, Text, useColorModeValue, Container, HStack, Table, Thead, Tbody, Tr, Td, Th } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";

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

  const padWithZero = (number) => String(number).padStart(2, "0");

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    const value = timeLeft[interval];
    return (
      <Text key={interval} fontSize="9xl" fontWeight="bold" marginRight={2}>
        {padWithZero(value)}
      </Text>
    );
  });

  return (
    <Center>
      <Center>
        {timerComponents.length
          ? timerComponents.reduce((prev, curr) => [
              prev,
              <Text fontSize="6xl" fontWeight="bold" mx={2}>
                :
              </Text>,
              curr,
            ])
          : null}
      </Center>
    </Center>
  );
};

const Index = () => {
  const bgColor = useColorModeValue("pink.100", "pink.900");
  const color = useColorModeValue("pink.800", "pink.100");

  return (
    <Box bg={bgColor} minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Container centerContent>
        <CountDownTimer targetDate="2024-04-28T00:00:00" />
        <Center w="full">
          <FaHeart size="6em" color={color} />
        </Center>
      </Container>
    </Box>
  );
};

export default Index;

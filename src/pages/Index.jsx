import { Box, Center, VStack, Text, useColorModeValue, Container, HStack, Table, Thead, Tbody, Tr, Td, Th } from "@chakra-ui/react";
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

  const timerComponents = (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Interval</Th>
          <Th>Time</Th>
        </Tr>
      </Thead>
      <Tbody>
        {Object.entries(timeLeft).map(([interval, value]) =>
          value ? (
            <Tr key={interval} verticalAlign="center">
              <Td>{interval}</Td>
              <Td fontSize="3xl" fontWeight="bold">
                {value}
              </Td>
            </Tr>
          ) : null,
        )}
      </Tbody>
    </Table>
  );

  return (
    <Center>
      <Center>{timerComponents}</Center>
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
          <VStack>
            <Text color={color} fontSize="6xl" fontWeight="extrabold" textAlign="center">
              Countdown to
            </Text>
            <Text color={color} fontSize="6xl" fontWeight="extrabold" textAlign="center">
              April 28th, 2024
            </Text>
          </VStack>
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

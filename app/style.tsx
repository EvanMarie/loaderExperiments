import {
  Avatar,
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "@remix-run/react";

export const Colors = {
  myBlue: "cyan",
  myPink: "#FF29DD",
  myGreen: "#7cfcab",
  myYellow: "#F1B770",
  myPurple: "#43126D",
  myDark: "#1F2024",
  myLight: "#CFFAF7",
};

export const ButtonStyles = {
  bg: Colors.myGreen,
  color: Colors.myDark,
  fontSize: "1rem",
  w: "100px",
  border: "1px solid",
  shadow: "2xl",
  _hover: {
    bg: Colors.myDark,
    color: Colors.myGreen,
  },
};

export function NavBar() {
  function ClickAction(page: string) {
    const navigate = useNavigate();
    return () => {
      navigate(page);
    };
  }
  return (
    <ButtonGroup
      mb={3}
      spacing={4}
      w="100%"
      maxW="1200px"
      bg={Colors.myLight}
      p={2}
    >
      <Button onClick={ClickAction("/")} {...ButtonStyles}>
        Home
      </Button>
      <Button onClick={ClickAction("countries")} {...ButtonStyles}>
        Countries
      </Button>
      <Button onClick={ClickAction("users")} {...ButtonStyles}>
        Users
      </Button>{" "}
      <Button onClick={ClickAction("photos")} {...ButtonStyles}>
        Photos
      </Button>
      <Button onClick={ClickAction("reqresUsers")} {...ButtonStyles}>
        Reqres
      </Button>
    </ButtonGroup>
  );
}

export function PageContainer({
  children,
  bg = Colors.myYellow,
  ...props // capture the rest of the BoxProps properties
}: { children?: React.ReactNode; bg?: string } & BoxProps) {
  return (
    <Box w="100%" maxW="1200px" bg={bg} p={3} {...props}>
      {children}
    </Box>
  );
}

export function ContactCard(user: any) {
  return (
    <Card w="350px" p="5px" shadow="xl">
      <CardBody p="5px">
        <Box
          borderBottom="1px solid"
          rounded="none"
          fontSize="1.23rem"
          color={Colors.myBlue}
        >
          <Text>{user.name}</Text>
        </Box>
        <VStack w="100%" fontSize="1rem" spacing={0} align="flex-start">
          <Text color={Colors.myPink}>{user.email}</Text>
          <Text>{user.phone}</Text>
          <Text>{user.website}</Text>
        </VStack>
      </CardBody>
    </Card>
  );
}

export function PhotoCard(photo: any) {
  return (
    <Card w="250px" p="5px" shadow="xl" bg={Colors.myGreen}>
      <CardBody p="5px">
        <VStack w="100%" fontSize="1rem" spacing={0}>
          <Box rounded="none" fontSize="1rem" color={Colors.myBlue} h="100px">
            <Text>{photo.title}</Text>
          </Box>
          <Image w="200px" h="200px" src={photo.url} />
        </VStack>
      </CardBody>
    </Card>
  );
}

export function ReqresUserCard(user: any) {
  return (
    <Card w="300px" p="5px" shadow="xl" bg={Colors.myGreen}>
      <CardBody p="5px">
        <VStack w="100%" fontSize="1rem" spacing={0}>
          {" "}
          <HStack w="100%">
            <HStack>
              <Avatar src={user.avatar} />
              <VStack align="flex-start" spacing={0}>
                <Box rounded="none" fontSize="1rem" color={Colors.myBlue}>
                  <Text>
                    {user.firstName} {user.lastName}
                  </Text>
                </Box>
                <Text>{user.email}</Text>
              </VStack>
            </HStack>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
}

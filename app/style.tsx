import {
  Avatar,
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Center,
  Flex,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Form, useNavigate } from "@remix-run/react";

export const Colors = {
  myBlue: "#0CD7E8",
  myPink: "#BD0DFF",
  myGreen: "#00FFCC",
  myMedium: "#4A5069",
  myPurple: "#470070",
  myDark: "#181b26",
  myLight: "#C5E3FD",
};

export const ButtonStyles = {
  bg: Colors.myBlue,
  color: Colors.myDark,
  fontSize: { base: "12px", md: "15px" },
  w: "125px",
  h: "30px",
  border: "1px solid",
  shadow: "2xl",
  _hover: {
    bg: Colors.myDark,
    color: Colors.myBlue,
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
    <ButtonGroup mb={3} spacing={[1, 2, 3]} w="100%" maxW="1200px" p={2}>
      <Button onClick={ClickAction("/")} {...ButtonStyles}>
        Home
      </Button>
      <Button onClick={ClickAction("library")} {...ButtonStyles}>
        Library
      </Button>
      <Button onClick={ClickAction("notesWithSchema")} {...ButtonStyles}>
        Notes
      </Button>
      <Button onClick={ClickAction("nasa")} {...ButtonStyles}>
        NASA
      </Button>
      <Button onClick={ClickAction("art")} {...ButtonStyles}>
        Art
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
  bg = Colors.myMedium,
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
          <Image
            w="200px"
            h="200px"
            src={photo.url}
            fallbackSrc="/loading.png"
          />
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

export const myShadow = "2px 2px 5px rgba(0,0,0,0.5)";

export const inputStackStyles = {
  spacing: "0px",
  fontSize: "1rem",
  fontWeight: 700,
  w: "100%",
};

export const inputLabelStyles = {
  fontWeight: 700,
  fontSize: "0.8rem",
  mb: "0px",
  color: Colors.myBlue,
};

export const inputFieldStyles = {
  variant: "filled",
  size: "xs",
  bg: Colors.myLight,
  color: Colors.myDark,
  rounded: "md",
  w: "125px",
  py: "5px",
  _focusBorderColor: Colors.myBlue,
  _focus: {
    bg: Colors.myLight,
    color: Colors.myDark,
    _focusBorderColor: Colors.myBlue,
  },
};

export const scrollBarStyles = {
  // For Chrome, Safari, and newer versions of Edge
  "&::-webkit-scrollbar": {
    width: "8px",
    backgroundColor: "aiArt.700",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: Colors.myDark,
    borderRadius: "8px",
    minHeight: "40px",
    maxHeight: "100px",
    transition: "all 0.3s ease-in-out",
  },
  "&:hover::-webkit-scrollbar-thumb": {
    backgroundColor: Colors.myMedium,
    transition: "all 0.3s ease-in-out",
  },

  // For Firefox
  "&": {
    scrollbarWidth: "thin", // This can be "auto", "thin", or "none"
    scrollbarColor: "cyan", // This styles the thumb and the track
  },
  // "&:hover": {
  //   scrollbarColor: "aiArt.400 aiArt.700",
  // },
};

export function APIDefaultContainer({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <Flex w="100%" justify="center">
      <Form method="get">
        <Stack
          direction={{ base: "column", sm: "row" }}
          align="center"
          justify="center"
          py={2}
          w="100%"
          bg={Colors.myMedium}
          position="fixed"
          top="75px"
          left="0"
          zIndex={2}
        >
          <Input
            name="q"
            placeholder="Search for a book"
            size="sm"
            w="400px"
            rounded="md"
            variant="filled"
            bg={Colors.myDark}
            color={Colors.myLight}
            border="1px solid"
            focusBorderColor={Colors.myPink}
            _focus={{
              bg: Colors.myDark,
              color: Colors.myLight,
              _focusBorderColor: Colors.myPink,
            }}
            _hover={{
              bg: Colors.myDark,
              color: Colors.myLight,
              _focusBorderColor: Colors.myPink,
            }}
          />
          <Button type="submit" size="sm">
            Search
          </Button>
        </Stack>
      </Form>
      <Flex overflow="auto" align="flex-start" pt="50px" position="relative">
        <Box
          padding={4}
          w="100%"
          mx="auto"
          bg="gray.800"
          overflowWrap="break-word"
          sx={{ columnCount: [1, 1, 2, 2, 3, 4], columnGap: "8px" }}
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}

export function APICard({
  children,
  index,
}: {
  children?: React.ReactNode;
  index?: number;
}) {
  const CardColors = [Colors.myBlue, Colors.myPink, Colors.myGreen];
  return (
    <Center
      mb={4}
      mx={2}
      key={index}
      sx={{
        breakInside: "avoid",
        WebkitColumnBreakInside: "avoid",
      }}
    >
      <Card
        w="390px"
        h="fit-content"
        bg={index ? CardColors[index % CardColors.length] : Colors.myBlue}
        shadow="dark-lg"
        rounded="xl"
        p={4}
      >
        <Center w="100%" h="100%">
          <VStack w="100%" h="100%" justify="space-between">
            {children}
          </VStack>
        </Center>
      </Card>
    </Center>
  );
}

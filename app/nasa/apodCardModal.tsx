import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ButtonStyles, Colors, myShadow } from "~/style";

export const ApodCardModal = ({ data, isOpen, onClose }: any) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", sm: "3xl" }}
      >
        <ModalOverlay
          sx={{
            bgGradient: "linear(to-r, rgba(0, 20, 20, 0.5), rgba(0, 0, 0, 0))",
            backdropFilter: "blur(4px)",
          }}
        />
        <ModalContent>
          <ModalHeader bg={Colors.myDark} roundedBottom="none">
            {" "}
            <VStack
              bg={Colors.myBlue}
              fontSize="1rem"
              px={2}
              spacing={0}
              w="98%"
            >
              <Text>
                <span style={{ fontWeight: 700 }}>APOD Date: {data.date}</span>
              </Text>
              <Text fontSize="0.9rem">{data.title}</Text>
            </VStack>
          </ModalHeader>
          <ModalCloseButton
            onClick={onClose}
            color={Colors.myLight}
            top="0px"
            right="2px"
          />
          <ModalBody bg={Colors.myMedium} rounded="none">
            {" "}
            <Stack
              direction={{ base: "column", md: "row" }}
              bg={Colors.myBlue}
              p={4}
              shadow={myShadow}
              justify="center"
              align="center"
            >
              {data.media_type === "image" ? (
                <Box p="5px">
                  <Image
                    src={data.url}
                    alt={data.title}
                    w="350px"
                    h="350px"
                    objectFit="cover"
                    shadow={myShadow}
                  />
                </Box>
              ) : (
                <iframe
                  title={data.title}
                  src={data.url}
                  frameBorder="0"
                  allow="encrypted-media"
                  allowFullScreen
                  style={{ width: "350px", height: "350px" }}
                ></iframe>
              )}

              <Flex fontSize="0.8rem" lineHeight="1.1rem" justify="center">
                <Text w="375px">{data.explanation}</Text>
              </Flex>
            </Stack>
          </ModalBody>

          <ModalFooter bg={Colors.myDark} roundedTop="none">
            <Button {...ButtonStyles} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

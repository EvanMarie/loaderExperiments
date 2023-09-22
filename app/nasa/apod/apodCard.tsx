import {
  useDisclosure,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Colors, myShadow } from "~/style";
import { ArrowUpDownIcon } from "@chakra-ui/icons";
import { ApodCardModal } from "./apodCardModal";

export type APODResponse = {
  title: string;
  date: string;
  media_type: "image" | "video";
  url: string;
  explanation: string;
};

interface APODCardProps {
  data: APODResponse;
}

export default function APODCard({ data }: APODCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <VStack
      spacing={1}
      bg={Colors.myPurple}
      py={2}
      px={{ base: 2, md: 4 }}
      mx={4}
      w={{ base: "375px", md: "400px" }}
      h="575px"
      justify="space-evenly"
      rounded="xl"
      shadow={myShadow}
    >
      <VStack
        bg={Colors.myBlue}
        fontSize={{ base: "0.9rem", md: "1rem" }}
        px={2}
        spacing={0}
        w="100%"
        maxW={{ base: "325px", md: "375px" }}
        shadow={myShadow}
        onClick={onOpen}
        _hover={{ cursor: "pointer" }}
      >
        <Text>
          <span style={{ fontWeight: 700 }}>APOD Date: {data.date}</span>
        </Text>
        <Text fontSize={{ base: "0.8rem", md: "0.9rem" }}>{data.title}</Text>
      </VStack>
      <VStack direction={{ base: "column", md: "row" }} spacing={3} p={2}>
        {data.media_type === "image" ? (
          <Image
            src={data.url}
            alt={data.title}
            w={{ base: "300px", md: "350px" }}
            h={{ base: "300px", md: "350px" }}
            objectFit="cover"
            shadow={myShadow}
            onClick={onOpen}
            _hover={{ cursor: "pointer" }}
          />
        ) : (
          <iframe
            title={data.title}
            src={data.url}
            allow="encrypted-media"
            allowFullScreen
            style={{ width: "350px", height: "350px" }}
          ></iframe>
        )}
        <HStack
          w="350px"
          bg={Colors.myBlue}
          fontSize={{ base: "0.8rem", md: "0.9rem" }}
          lineHeight="1.1rem"
          p={2}
          pr={0}
          shadow={myShadow}
          spacing={0}
          align="flex-start"
          onClick={onOpen}
          _hover={{ cursor: "pointer" }}
        >
          <Text noOfLines={3}>{data.explanation}</Text>
          <Flex flex="1" h="100%" align="flex-start">
            <IconButton
              aria-label="expand explanation"
              icon={<ArrowUpDownIcon boxSize="20px" />}
              p={0}
              onClick={onOpen}
              right="5px"
              top="5px"
              size="sm"
              variant="filled"
            />
          </Flex>
        </HStack>
      </VStack>
      <ApodCardModal data={data} isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
}

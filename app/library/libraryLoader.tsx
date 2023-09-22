import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { Colors } from "~/style";

export let loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  let url = new URL(request.url);
  let queryTerm = url.searchParams.get("q");

  if (!queryTerm) {
    return { docs: [] };
  }

  try {
    let response = await fetch(
      `https://openlibrary.org/search.json?q=${queryTerm}`
    );
    let data = await response.json();
    return data.docs;
  } catch (error) {
    throw new Error("Failed to fetch book data");
  }
};

interface BookData {
  title: string;
  author_name: string[];
  first_publish_year: number;
  characters: string[];
  cover_i: string;
}

export default function LibraryLoader() {
  const books: BookData[] = useLoaderData();

  function hasCoverImage(book: BookData): boolean {
    return Boolean(book.cover_i);
  }

  const CardColors = [Colors.myBlue, Colors.myPink, Colors.myGreen];

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
          {books &&
            books.length > 0 &&
            books.map((book, index) => (
              <Center
                mb={4}
                mx={2}
                key={index}
                sx={{
                  breakInside: "avoid",
                  "-webkit-column-break-inside": "avoid",
                }}
              >
                <Card
                  w="390px"
                  h="fit-content"
                  bg={CardColors[index % CardColors.length]}
                  shadow="dark-lg"
                  rounded="xl"
                  p={4}
                >
                  <Center w="100%" h="100%">
                    <VStack w="100%" h="100%" justify="space-between">
                      <Text size="lg" noOfLines={2}>
                        {book.title}
                      </Text>
                      <Text>
                        <strong>First Published:</strong>{" "}
                        {book.first_publish_year}
                      </Text>
                      {hasCoverImage(book) ? (
                        <Image
                          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                          alt={book.title}
                          w="250px"
                          objectFit="cover"
                          shadow="dark-lg"
                        />
                      ) : null}
                      <Text>
                        by{" "}
                        {book.author_name && book.author_name.length > 0
                          ? book.author_name[0]
                          : "Unknown Author"}
                      </Text>
                    </VStack>
                  </Center>
                </Card>
              </Center>
            ))}{" "}
        </Box>
      </Flex>
    </Flex>
  );
}

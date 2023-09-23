import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { APICard, APIDefaultContainer } from "~/style";

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

  return (
    <APIDefaultContainer>
      {books &&
        books.length > 0 &&
        books.map((book, index) => (
          <Box key={index}>
            <APICard index={index}>
              <VStack spacing={0}>
                <Text fontSize="xl" fontWeight="bold" lineHeight="xl">
                  {book.title}
                </Text>
                <Text>
                  by{" "}
                  {book.author_name && book.author_name.length > 0
                    ? book.author_name[0]
                    : "Unknown Author"}
                </Text>
                <Text fontSize="lg">
                  <strong>Year:</strong> {book.first_publish_year}
                </Text>
              </VStack>
              {hasCoverImage(book) ? (
                <Image
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  w="250px"
                  objectFit="cover"
                  shadow="dark-lg"
                />
              ) : null}
            </APICard>
          </Box>
        ))}{" "}
    </APIDefaultContainer>
  );
}

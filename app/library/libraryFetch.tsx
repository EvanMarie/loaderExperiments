import { Card, Center, Image, Skeleton, Text, VStack } from "@chakra-ui/react";

import React, { useState, useEffect } from "react";
import { Colors } from "~/style";

interface BookData {
  title: string;
  author_name: string[];
  first_publish_year: number;
  characters: string[];
  cover_i: string;
}

export default function LibraryFetch() {
  const [data, setData] = useState<BookData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const queryTerm = "toast";

  useEffect(() => {
    setLoading(true);
    fetch(`https://openlibrary.org/search.json?q=${queryTerm}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const bookList = data.docs;
        setData(bookList[0]);
      })
      .catch((error) => console.error("Fetch error:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Center w="100%">
        <Skeleton
          startColor={Colors.myBlue}
          endColor={Colors.myPink}
          h="550px"
          w="390px"
          speed={2}
          rounded="xl"
        />
      </Center>
    );
  }

  if (!data) {
    return <Center w="100%">Error loading data or data not available.</Center>;
  }

  return (
    <Center w="100%">
      <Card
        w="390px"
        h="550px"
        bg={Colors.myPink}
        shadow="dark-lg"
        rounded="xl"
        p={4}
      >
        <Center w="100%" h="100%">
          {" "}
          <VStack w="100%">
            <Text size="lg" noOfLines={2}>
              {data.title}
            </Text>
            <Text>
              <strong>First Published:</strong> {data.first_publish_year}
            </Text>
            {data.cover_i === "" ? (
              <Image
                src={`https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg`}
                alt={data.title}
                w="250px"
                objectFit="cover"
                shadow="dark-lg"
              />
            ) : (
              <Skeleton w="250px" h="350px" rounded="xl" speed={5} />
            )}
            <Text mt={4}>
              <strong>Author:</strong> {data.author_name[0] || "N/A"}
            </Text>
          </VStack>
        </Center>
      </Card>
    </Center>
  );
}

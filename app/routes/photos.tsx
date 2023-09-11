import { Text, VStack, Wrap } from "@chakra-ui/react";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PageContainer, PhotoCard } from "~/style";

export const loader: LoaderFunction = async () => {
  let response = await fetch("https://jsonplaceholder.typicode.com/photos");
  let photos = await response.json();
  return photos;
};

export default function Photos(props: any) {
  const data = useLoaderData();
  return (
    <PageContainer>
      <Text fontSize="1.5rem" mb={4}>
        Endpoint: https://jsonplaceholder.typicode.com/photos
      </Text>
      <VStack w="100%">
        <Wrap spacing={4} justify="center">
          {data &&
            data.map((photo: any) => (
              <PhotoCard key={photo.id} title={photo.title} url={photo.url} />
            ))}
        </Wrap>
      </VStack>
    </PageContainer>
  );
}

import { Text, VStack } from "@chakra-ui/react";
import { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { APICard } from "~/style";

export let loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  try {
    // Initial request to fetch artworks
    let response = await fetch(
      `https://api.artic.edu/api/v1/artworks/search?q=Cats&limit=1`
    );
    let initialData = await response.json();

    // Check if data exists and api_link is available
    if (
      initialData &&
      initialData.data &&
      initialData.data[0] &&
      initialData.data[0].api_link
    ) {
      let apiLinkResponse = await fetch(initialData.data[0].api_link);
      let apiLinkData = await apiLinkResponse.json();

      // Combine the initial data and the data from api_link or structure them in the desired way
      return {
        artwork: initialData.data,
        detailedData: apiLinkData,
      };
    } else {
      throw new Error("API link not found in initial data");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch art data");
  }
};

export default function ArtComponent() {
  const { artwork, detailedData } = useLoaderData();

  console.log(detailedData);

  return (
    <APICard>
      <VStack>
        <Text fontSize="xl" fontWeight="bold">
          {artwork[0].title}
        </Text>
        <Text>{artwork[0]["thumbnail"].alt_text}</Text>
        <Text>{artwork[0].date_display}</Text>
      </VStack>
    </APICard>
  );
}

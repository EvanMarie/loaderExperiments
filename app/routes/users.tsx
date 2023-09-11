import { Heading, Text, VStack, Wrap } from "@chakra-ui/react";
import { LoaderFunction } from "@remix-run/node";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports

import { useLoaderData } from "@remix-run/react";
import { PageContainer, ContactCard } from "~/style";

export const loader: LoaderFunction = async () => {
  let response = await fetch("https://jsonplaceholder.typicode.com/users");
  let users = await response.json();
  return users;
};

export default function Users(props: any) {
  const data = useLoaderData();
  return (
    <PageContainer>
      <Text fontSize="1.5rem" mb={4}>
        Endpoint: https://jsonplaceholder.typicode.com/users
      </Text>
      <VStack w="100%">
        <Wrap spacing={4} justify="center">
          {data &&
            data.map((user: any) => (
              <ContactCard
                key={user.id}
                name={user.name}
                email={user.email}
                phone={user.phone}
                website={user.website}
              />
            ))}
        </Wrap>
      </VStack>
    </PageContainer>
  );
}

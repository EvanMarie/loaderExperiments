import { Text, VStack, Wrap } from "@chakra-ui/react";
// import { LoaderFunction, json } from "@remix-run/node";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { useEffect, useState } from "react";
import { PageContainer, ReqresUserCard } from "~/style";

// export const loader: LoaderFunction = async () => {
//   let response = await fetch("https://reqres.in/api/users");
//   let users = await response.json();

//   console.log(users[0]);
//   return users;
// };

export default function Users(props: any) {
  const [users, setUsers] = useState([]);
  const fetcher = async () => {
    const res = await fetch("https://reqres.in/api/users/");
    const json = await res.json();
    setUsers(json.data);
  };
  useEffect(() => {
    fetcher();
  }, []);
  return (
    <PageContainer>
      <Text fontSize="1.5rem" mb={4}>
        Endpoint: https://reqres.in/api/users/"
      </Text>
      <VStack w="100%">
        <Wrap spacing={4} justify="center">
          {users &&
            users.map((user: any) => (
              <ReqresUserCard
                key={user.id}
                firstName={user.first_name}
                lastName={user.last_name}
                email={user.email}
                avatar={user.avatar}
              />
            ))}
        </Wrap>
      </VStack>
    </PageContainer>
  );
}

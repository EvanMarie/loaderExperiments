import { Flex } from "@chakra-ui/react";
import type { V2_MetaFunction } from "@remix-run/node";
import { Colors } from "~/style";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <Flex
      color={Colors.myPink}
      w="100%"
      flex="1"
      align="center"
      justify="center"
      fontSize="2rem"
    >
      Welcome to my API Call Experiments!
    </Flex>
  );
}

import APOD from "~/nasa/apod";
import { PageContainer } from "~/style";

export const API_KEY = "sg7tFr6kjpdAjdnRhiG4norOr69q5Ojpb50jOK4c";

export default function NASA() {
  return (
    <PageContainer
      maxW="110%"
      rounded="none"
      px="0px"
      overflowX="hidden"
      pb="100px"
    >
      <APOD />
    </PageContainer>
  );
}

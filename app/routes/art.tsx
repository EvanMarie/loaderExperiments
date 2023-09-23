import ArtComponent from "~/art/artLoader";
import { PageContainer } from "~/style";
export { loader } from "~/art/artLoader";

export default function Art() {
  return (
    <PageContainer
      maxW="110%"
      rounded="none"
      px="0px"
      overflowX="hidden"
      pb="100px"
    >
      <ArtComponent />
    </PageContainer>
  );
}

// import LibraryFetch from "~/library/libraryFetch";
import LibraryLoader from "~/library/libraryLoader";
import { PageContainer } from "~/style";
export { loader } from "~/library/libraryLoader";

export default function EONET() {
  return (
    <PageContainer
      maxW="110%"
      rounded="none"
      px="0px"
      overflowX="hidden"
      pb="100px"
    >
      <LibraryLoader />
      {/* <LibraryFetch /> */}
    </PageContainer>
  );
}

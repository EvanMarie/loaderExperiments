// src/routes/Countries.tsx

import React, { useState } from "react";
import SearchCountries, {
  Country,
  fetchCountryData,
} from "../countriesComponents/searchCountries"; // assuming both are exported from the same file
import { ButtonStyles, Colors, PageContainer } from "~/style";
import { Button, Input, Select, Stack, VStack, Wrap } from "@chakra-ui/react";

export default function Countries() {
  const [searchType, setSearchType] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [countryData, setCountryData] = useState<
    Country[] | { error: string } | null
  >(null);

  const handleSearch = async () => {
    const data = await fetchCountryData(searchType, searchTerm);
    setCountryData(data);
    console.log(data);
  };

  const fieldWidth = "300px";
  const inputStyles = {
    bg: Colors.myLight,
    color: Colors.myDark,
    fontSize: "1rem",
    w: fieldWidth,
    border: "1px solid",
    shadow: "2xl",
    _hover: {
      bg: Colors.myDark,
      color: Colors.myGreen,
    },
    _focus: {
      bg: Colors.myDark,
      color: Colors.myGreen,
    },
  };

  return (
    <PageContainer maxW="1500px">
      <VStack w="100%" p={2} align="flex-start">
        <Stack
          direction={{ base: "column", md: "row" }}
          w="100%"
          justify="center"
          align="center"
        >
          <Select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            variant="filled"
            {...inputStyles}
            size="sm"
            rounded="md"
          >
            <option value="name">Name</option>
            <option value="alpha">Code</option>
            <option value="currency">Currency</option>
            <option value="region">Region</option>
            <option value="lang">Language</option>
            <option value="capital">Capital City</option>
          </Select>
          <Input
            variant="filled"
            size="sm"
            {...inputStyles}
            rounded="md"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter search term..."
          />

          <Button
            {...ButtonStyles}
            w={fieldWidth}
            size="sm"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Stack>

        <Wrap w="100%" justify="center" align="stretch" spacing={4}>
          {countryData && "error" in countryData ? (
            <div>Error: {countryData.error}</div>
          ) : (
            Array.isArray(countryData) &&
            countryData.map((country: Country) => (
              <SearchCountries key={country.cca3} {...country} />
            ))
          )}
        </Wrap>
      </VStack>
    </PageContainer>
  );
}

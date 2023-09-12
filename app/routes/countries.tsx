// src/routes/Countries.tsx
import { Box, Button, HStack, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import ByName, {
  Country,
  fetchCountryData,
} from "~/countriesComponents/byName";
import { ButtonStyles, Colors } from "~/style";

export default function Countries() {
  const [countryName, setCountryName] = useState<string>("");
  const [countryData, setCountryData] = useState<
    Country | { error: string } | null
  >(null);

  const handleSearch = async () => {
    const data = await fetchCountryData(countryName);
    setCountryData(data);
  };

  return (
    <VStack bg={Colors.myYellow} w="400px" h="400px" p={2} align="flex-start">
      <HStack w="100%">
        <Input
          variant="filled"
          size="sm"
          rounded="md"
          type="text"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          placeholder="Enter country name..."
        />
        <Button {...ButtonStyles} size="sm" onClick={handleSearch}>
          Search
        </Button>
      </HStack>
      {countryData && <ByName {...countryData} />}
    </VStack>
  );
}

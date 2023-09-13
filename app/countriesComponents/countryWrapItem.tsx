import {
  Box,
  HStack,
  IconButton,
  Image,
  Text,
  Tooltip,
  VStack,
  WrapItem,
} from "@chakra-ui/react";
import { Colors } from "~/style";
import { Link as ReactLink } from "react-router-dom";
import countries from "i18n-iso-countries";
import { BsPinMapFill } from "react-icons/bs";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const labelStyle = {
  fontWeight: "bold",
  color: Colors.myGreen,
};

interface currenciesProps {
  [key: string]: {
    name: string;
    symbol: string;
  };
}

interface CountryLikeItemProps {
  common: string;
  official: string;
  flagUrl: string;
  coatOfArmsUrl: string;
  mapURL: string;
  subregion: string;
  capital: string;
  population: number;
  borders: string[];
  languages: object;
  unMember: boolean;
  currencies: currenciesProps;
}

export default function CountryWrapItem({
  common,
  official,
  flagUrl,
  coatOfArmsUrl,
  mapURL,
  subregion,
  capital,
  population,
  borders,
  languages,
  unMember,
  currencies,
}: CountryLikeItemProps) {
  const borderCountryNames = borders
    ? borders
        .map((code) => {
          const name = countries.getName(code, "en");
          return name || code;
        })
        .join(", ")
    : "No bordering countries";

  function displayCurrencies(currencies: currenciesProps) {
    if (!currencies) {
      return null; // Or return a default message or JSX if you prefer.
    }

    const currencyElements = Object.values(currencies).map((currency) => (
      <HStack key={currency.name} spacing={2}>
        <Text>{currency.name}</Text>
        <Box p={1} border="1px solid black">
          <Text fontWeight="700">{currency.symbol}</Text>
        </Box>
      </HStack>
    ));
    return currencyElements;
  }

  console.log(currencies);
  return (
    <WrapItem w="390px" shadow="2px 2px 5px rgba(0,0,0,0.5)">
      <VStack
        bg={Colors.myDark}
        p={4}
        color={Colors.myLight}
        align="flex-start"
      >
        <HStack justify="space-evenly">
          <Image src={flagUrl} alt={`Flag of ${common}`} w="50%" maxH="120px" />
          {coatOfArmsUrl && (
            <Image
              src={coatOfArmsUrl}
              alt={`Coat of Arms of ${common}`}
              w="30%"
            />
          )}
        </HStack>
        <VStack w="100%" spacing={0} align="flex=start">
          <HStack justify="space-between">
            <Text style={{ color: Colors.myBlue, fontSize: "1.5rem" }}>
              {common}
            </Text>
            <ReactLink to={mapURL} target={"_blank"}>
              <Tooltip label="Google Maps">
                <IconButton
                  size="sm"
                  bg={Colors.myGreen}
                  _hover={{ bg: Colors.myBlue }}
                  icon={<BsPinMapFill />}
                  aria-label="Google Maps"
                />
              </Tooltip>
            </ReactLink>{" "}
          </HStack>
          <Text style={{ color: Colors.myYellow, fontSize: "1rem" }}>
            ( {official})
          </Text>
        </VStack>
        <VStack w="100%" spacing={1} align="flex-start" fontSize="1rem">
          <Text>
            <span style={labelStyle}>Region:</span> {subregion}
          </Text>

          <Text>
            <span style={labelStyle}>Capital:</span> {capital}
          </Text>

          <Text>
            <span>{unMember ? "UN Member" : "Not a UN Member"}</span>{" "}
          </Text>

          <Text>
            <span style={labelStyle}>Population:</span>{" "}
            {population.toLocaleString()}
          </Text>

          <Text>
            <span style={labelStyle}>Country Borders:</span>{" "}
            {borderCountryNames}
          </Text>

          <Text>
            <span style={labelStyle}>Languages:</span>{" "}
            {Object.values(languages).join(", ")}
          </Text>

          <HStack>
            <span style={labelStyle}>Currency:</span>
            {displayCurrencies(currencies)}
          </HStack>
        </VStack>
      </VStack>
    </WrapItem>
  );
}

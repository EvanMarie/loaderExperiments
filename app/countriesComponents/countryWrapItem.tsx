import {
  Center,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { Colors, myShadow } from "~/style";
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
        <Center
          p={1}
          border="1px solid white"
          bg={Colors.myGreen}
          color={Colors.myDark}
          w="40px"
          h="40px"
        >
          <Text fontWeight="700" fontSize="1.25rem">
            {currency.symbol}
          </Text>
        </Center>
      </HStack>
    ));
    return currencyElements;
  }

  console.log(currencies);
  return (
    <Flex w="390px" direction="column" bg={Colors.myDark}>
      <VStack
        p={4}
        color={Colors.myLight}
        align="flex-start"
        shadow={myShadow}
        flex="1"
        h="100%"
      >
        <HStack
          justify="space-evenly"
          bg={Colors.myLight}
          p={2}
          w="100%"
          shadow={myShadow}
          spacing={4}
        >
          <Image src={flagUrl} alt={`Flag of ${common}`} w="50%" maxH="120px" />
          {coatOfArmsUrl && (
            <Image
              src={coatOfArmsUrl}
              alt={`Coat of Arms of ${common}`}
              w="30%"
              maxH="120px"
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
                  bg={Colors.myPink}
                  color={Colors.myLight}
                  border="1px solid"
                  _hover={{ bg: Colors.myBlue }}
                  icon={<BsPinMapFill size="18px" />}
                  aria-label="Google Maps"
                />
              </Tooltip>
            </ReactLink>{" "}
          </HStack>
          <Text style={{ color: Colors.myMedium, fontSize: "1rem" }}>
            ( {official})
          </Text>
        </VStack>
        <VStack w="100%" spacing={1} align="flex-start" fontSize="0.9rem">
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
    </Flex>
  );
}

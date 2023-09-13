import { Box, HStack, Image, Text, WrapItem } from "@chakra-ui/react";
import { Colors } from "~/style";
import { Link as ReactLink } from "react-router-dom";
import countries from "i18n-iso-countries";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const labelStyle = {
  fontWeight: "bold",
  color: Colors.myGreen,
};

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
}: CountryLikeItemProps) {
  const borderCountryNames = borders
    ? borders
        .map((code) => {
          const name = countries.getName(code, "en");
          return name || code; // If the name doesn't exist, revert back to the code
        })
        .join(", ")
    : "0";

  return (
    <WrapItem>
      <Box bg={Colors.myDark} p={4} color={Colors.myLight}>
        <HStack>
          <Image src={flagUrl} alt={`Flag of ${common}`} width="125px" />
          {coatOfArmsUrl && (
            <Image
              src={coatOfArmsUrl}
              alt={`Coat of Arms of ${common}`}
              width="125px"
            />
          )}
        </HStack>
        <Text style={{ color: Colors.myBlue, fontSize: "1.5rem" }}>
          {common}
        </Text>
        <Text style={{ color: Colors.myYellow, fontSize: "1rem" }}>
          ( {official})
        </Text>
        <ReactLink to={mapURL} target={"_blank"}>
          <Text color={Colors.myPink}>Google Maps</Text>
        </ReactLink>
        <p>
          <span style={labelStyle}>Region:</span> {subregion}
        </p>
        <p>
          <span style={labelStyle}>Capital:</span> {capital}
        </p>
        <p>
          <span style={labelStyle}>Population:</span>{" "}
          {population.toLocaleString()}
        </p>
        <p>
          <span style={labelStyle}>Country Borders:</span> {borderCountryNames}
        </p>

        <p>
          <span style={labelStyle}>Languages:</span>{" "}
          {Object.values(languages).join(", ")}
        </p>
        <br />
      </Box>
    </WrapItem>
  );
}

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Box, Image } from "@chakra-ui/react";
import { LoaderFunction, json, LoaderArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";

export interface Country {
  name: {
    common: string;
    official: string;
  };
  flags: {
    svg: string;
  };
  region: string;
  capital: string;
  population: number;
}

export let loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  let countryName = new URL(request.url).searchParams.get("name");

  if (!countryName) {
    return json({ error: "No country name provided" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const data = await response.json();

    if (!data || data.status === 404) {
      return json({ error: "Country not found" }, { status: 404 });
    }

    return json(data[0]);
  } catch (error) {
    console.error("Failed to fetch country data:", error);
    return json({ error: "Internal server error" }, { status: 500 });
  }
};

export async function fetchCountryData(
  countryName: string
): Promise<Country | { error: string }> {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const data = await response.json();

    if (!data || data.status === 404) {
      return { error: "Country not found" };
    }

    return data[0];
  } catch (error) {
    console.error("Failed to fetch country data:", error);
    return { error: "Internal server error" };
  }
}

export default function ByName(props: Country | { error: string }) {
  if ("error" in props) {
    return <div>Error: {props.error}</div>;
  }

  const { common, official } = props.name;
  const { svg: flagUrl } = props.flags;

  return (
    <Box>
      <Image src={flagUrl} alt={`Flag of ${common}`} width="200px" />
      <h1>
        {common} ({official})
      </h1>
      <p>
        <strong>Region:</strong> {props.region}
      </p>
      <p>
        <strong>Capital:</strong> {props.capital}
      </p>
      <p>
        <strong>Population:</strong> {props.population}
      </p>
      <Link to="/">Go back</Link>
    </Box>
  );
}

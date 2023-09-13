import { LoaderFunction, json, LoaderArgs } from "@remix-run/node";
import CountryWrapItem from "./countryWrapItem";

export interface Country {
  altSpellings: string[];
  area: number;
  borders: string[];
  capital: string[];
  capitalInfo: {
    latlng: [number, number];
  };
  car: {
    side: string;
    signs: string[];
  };
  cca2: string;
  cca3: string;
  ccn3: string;
  cioc: string;
  coatOfArms: {
    png: string;
    svg: string;
  };
  continents: string[];
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  demonyms: {
    [key: string]: {
      f: string;
      m: string;
    };
  };
  fifa: string;
  flag: string;
  flags: {
    alt: string;
    png: string;
    svg: string;
  };
  gini: {
    [year: number]: number;
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  independent: boolean;
  landlocked: boolean;
  languages: {
    [key: string]: string;
  };
  latlng: [number, number];
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  name: {
    common: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
    official: string;
  };
  population: number;
  postalCode: {
    format: string;
    regex: string;
  };
  region: string;
  startOfWeek: string;
  status: string;
  subregion: string;
  timezones: string[];
  tld: string[];
  translations: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
  unMember: boolean;
}

export let loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  let searchTerm = url.searchParams.get("term");
  let searchType = url.searchParams.get("type") || "name";

  if (!searchTerm) {
    return json({ error: "No search term provided" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/${searchType}/${searchTerm}`
    );
    const data = await response.json();

    if (!data || data.status === 404) {
      return json({ error: "Country not found" }, { status: 404 });
    }

    return json(data);
  } catch (error) {
    console.error("Failed to fetch country data:", error);
    return json({ error: "Internal server error" }, { status: 500 });
  }
};

export async function fetchCountryData(
  searchType: string,
  searchTerm: string
): Promise<Country[] | { error: string }> {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/${searchType}/${searchTerm}`
    );
    const data = await response.json();
    console.log(data);

    if (!data || data.status === 404) {
      return { error: "Country not found" };
    }

    return Array.isArray(data) ? data : [data]; // Ensure the result is always an array
  } catch (error) {
    console.error("Failed to fetch country data:", error);
    return { error: "Internal server error" };
  }
}

export default function SearchCountries(props: Country | { error: string }) {
  if ("error" in props) {
    return <div>Error: {props.error}</div>;
  }

  const { common, official } = props.name;
  const { svg: flagUrl } = props.flags;
  const { png: coatOfArmsUrl } = props.coatOfArms;
  const { googleMaps: mapURL } = props.maps;

  return (
    <CountryWrapItem
      common={common}
      official={official}
      flagUrl={flagUrl}
      coatOfArmsUrl={coatOfArmsUrl}
      mapURL={mapURL}
      subregion={props.subregion}
      capital={props.capital?.[0] || "N/A"}
      population={props.population}
      borders={props.borders}
      languages={props.languages}
      unMember={props.unMember}
      currencies={props.currencies}
    />
  );
}

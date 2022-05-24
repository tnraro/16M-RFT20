import { fetchL10n } from "./fetchL10n";
import { ErCharacterData, ErResponse } from "./types";

export interface CharacterData {
  id: number;
  name: string;
  ko: string;
}
export async function fetchCharacters(): Promise<CharacterData[]> {
  const apiKey = process.env.API_KEY;
  if (apiKey == null) {
    throw new Error("API_KEY is not defined");
  }
  const res = await fetch("https://open-api.bser.io/v1/data/Character", {
    headers: {
      accept: "application/json",
      "x-api-key": apiKey,
    }
  });
  if (res.status < 200 || res.status >= 300) {
    throw new Error(`${res.status}: ${res.statusText}`);
  }
  const result: ErResponse<unknown[]> = await res.json();
  if (result.code < 200 || result.code >= 300) {
    throw new Error(`${result.code}: ${result.message}`);
  }
  if (!result.data.every((x): x is ErCharacterData => {
    if (typeof (x as ErCharacterData).code !== "number") return false;
    if (typeof (x as ErCharacterData).name !== "string") return false;
    return true;
  })) {
    throw new Error("invalid data");
  }
  const l10n = await fetchL10n("Korean");
  const data: ErCharacterData[] = result.data;
  return data.map((x: any): CharacterData => {
    const data: CharacterData = {
      id: x.code,
      name: x.name,
      ko: l10n.get(`Character/Name/${x.code}`) ?? x.name,
    };
    return data;
  });
}
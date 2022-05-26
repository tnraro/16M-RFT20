import { ErL10nData, ErResponse } from "./types";

function isL10nData(x: unknown): x is ErL10nData {
  if (typeof x !== "object") return false;
  if (typeof (x as ErL10nData).l10Path !== "string") return false;
  return true;
}
export async function fetchL10n(lang = "Korean") {
  const apiKey = process.env.API_KEY;
  if (apiKey == null) {
    throw new Error("API_KEY is not defined");
  }
  const res = await fetch("https://open-api.bser.io/v1/l10n/" + lang, {
    headers: {
      accept: "application/json",
      "x-api-key": apiKey,
    }
  });
  if (res.status < 200 || res.status >= 300) {
    throw new Error(`${res.status}: ${res.statusText}`);
  }
  const result: ErResponse<unknown> = await res.json();
  if (result.code < 200 || result.code >= 300) {
    throw new Error(`${result.code}: ${result.message}`);
  }
  if (!isL10nData(result.data)) throw new Error("invalid data");
  return fetchL10nData(result.data.l10Path);
}
async function fetchL10nData(url: string) {
  const res = await fetch(url);
  const text = await res.text();
  return new Map<string, string>(
    text.split(/\r?\n/).map(x => x.trim().split("┃")) as [string, string][]
  );
}
export interface ErResponse<T> {
  code: number;
  message: string;
  data: T;
}
export interface ErCharacterData {
  code: number;
  name: string;
}
export interface ErL10nData {
  "l10Path": string;
}
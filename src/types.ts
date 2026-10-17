import type { Dispatch, SetStateAction } from "react";

export type Screen =
  | "homepage"
  | "ogloszenia"
  | "historia"
  | "kontakt"
  | "cookies";

export type SetCurrentScreen = Dispatch<SetStateAction<Screen>>;

export type AdjustHeight = (height: number) => void;

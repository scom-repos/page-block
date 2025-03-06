import { ISpace } from "@ijstech/components";

export interface ISettings {
  height?: number|string;
  width?: number|string;
  backgroundImageUrl?: string;
  direction?: 'horizontal'|'vertical';
  gap?: number|string;
  margin?: ISpace;
  padding?: ISpace;
  maxWidth?: number|string;
  light?: IColors;
  dark?: IColors;
}

export interface IColors {
  backgroundColor?: string;
}
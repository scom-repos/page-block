import { ISpace } from "@ijstech/components";

export interface ISettings {
  height?: number|string;
  width?: number|string;
  backgroundImageUrl?: string;
  direction?: 'horizontal'|'vertical';
  justifyContent?: string;
  alignItems?: string;
  gap?: number|string;
  margin?: ISpace;
  padding?: ISpace;
  maxWidth?: number|string;
  light?: IColors;
  dark?: IColors;
  overlay?: string;
  stack?: IStack;
}

export interface IColors {
  backgroundColor?: string;
}

export interface IStack {
  grow?: string;
  shrink?: string;
  basis?: string;
}
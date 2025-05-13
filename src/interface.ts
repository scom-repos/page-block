import { ISpace } from "@ijstech/components";

export interface ISettings {
  height?: number|string;
  width?: number|string;
  direction?: 'horizontal'|'vertical';
  justifyContent?: string;
  alignItems?: string;
  gap?: number|string;
  margin?: ISpace;
  padding?: ISpace;
  maxWidth?: number|string;
  minHeight?: number|string;
  light?: IColors;
  dark?: IColors;
  overlay?: string;
  stack?: IStack;
  background?: {color?: string, image?: string};
  backgroundAttachment?: string;
  transform?: string;
}

export interface IColors {
}

export interface IStack {
  grow?: string;
  shrink?: string;
  basis?: string;
}
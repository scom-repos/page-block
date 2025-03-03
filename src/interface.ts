export interface ISettings {
  height?: number|string;
  width?: number|string;
  backgroundImageUrl?: string;
  direction?: 'horizontal'|'vertical';
  gap?: number|string;
  light?: IColors;
  dark?: IColors;
}

export interface IColors {
  backgroundColor?: string;
}
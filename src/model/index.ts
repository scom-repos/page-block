import { ISettings } from '../interface';

interface IOptions {
  onUpdateBlock: () => void;
  onUpdateTheme: () => void;
}

export class Model {
  private _tag: ISettings = {
    light: {},
    dark: {}
  };
  private _options: IOptions;

  constructor(options: IOptions) {
    this._options = options;
  }

  get tag() {
    return this._tag;
  }

  set tag(value: ISettings) {
    this._tag = value;
  }

  private getData() {
    return {}
  }

  setData() {}

  private getTag() {
    return this._tag
  }

  private setTag(value: ISettings) {
    const newValue = value || {};
    for (let prop in newValue) {
      if (newValue.hasOwnProperty(prop)) {
        if (prop === 'light' || prop === 'dark') this.updateTag(prop, newValue[prop]);
        else this._tag[prop] = newValue[prop];
      }
    }

    this._options?.onUpdateTheme();
    this._options?.onUpdateBlock();
  }

  private updateTag(type: 'light' | 'dark', value: any) {
    this._tag[type] = this._tag[type] || {};
    for (let prop in value) {
      if (value.hasOwnProperty(prop)) this._tag[type][prop] = value[prop];
    }
  }

  getConfigurators() {
    return [
      {
        name: 'Builder Configurator',
        target: 'Builders',
        getActions: () => [],
        getData: this.getData.bind(this),
        setData: this.setData.bind(this),
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      }
    ]
  }
}
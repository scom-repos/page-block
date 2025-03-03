import {
  Module,
  customModule,
  Styles,
  ControlElement,
  customElements,
  Container,
  StackLayout
} from '@ijstech/components';
import { Model } from './model/index';

const Theme = Styles.Theme.ThemeVars;

interface ScomPageBlockElement extends ControlElement {
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["i-scom-page-block"]: ScomPageBlockElement;
    }
  }
}

@customModule
@customElements('i-scom-page-block')
export default class ScomPageBlock extends Module {
  private pnlWrapper: StackLayout;

  private model: Model;

  static async create(options?: ScomPageBlockElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: ScomPageBlockElement) {
    super(parent, options);
  }

  getConfigurators() {
    return this.model.getConfigurators();
  }

  private onUpdateBlock() {
    const {
      backgroundImageUrl = '',
      direction = 'vertical',
      gap = 0,
      height = 'auto',
      width = 'auto'
    } = this.model.tag || {};

    this.pnlWrapper.direction = direction;
    this.pnlWrapper.gap = gap;
    this.pnlWrapper.height = height;
    this.pnlWrapper.width = width;
    
    const themeVar = document.body.style.getPropertyValue('--theme') || 'dark';
    if (this.model.tag[themeVar]) {
      this.pnlWrapper.background.color = Theme.background.main;
    } else {
      this.pnlWrapper.background.color = 'transparent';
    }
    if (backgroundImageUrl) this.pnlWrapper.background.color = `url(${backgroundImageUrl}) center center / cover no-repeat`;
  }

  private updateStyle(name: string, value: any) {
    value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
  }

  private onUpdateTheme() {
    const themeVar = document.body.style.getPropertyValue('--theme') || 'dark';
    this.updateStyle('--background-main', this.model.tag[themeVar]?.backgroundColor);
  }

  init() {
    super.init();
    this.model = new Model({
      onUpdateBlock: this.onUpdateBlock.bind(this),
      onUpdateTheme: this.onUpdateTheme.bind(this)
    });
  }

  render() {
    return (
      <i-stack
        id="pnlWrapper"
        width="100%"
      />
    )
  }
}
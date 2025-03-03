var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/page-block/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/page-block/model/index.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Model = void 0;
    class Model {
        constructor(options) {
            this._tag = {
                light: {},
                dark: {}
            };
            this._options = options;
        }
        get tag() {
            return this._tag;
        }
        set tag(value) {
            this._tag = value;
        }
        getData() {
            return {};
        }
        setData() { }
        getTag() {
            return this._tag;
        }
        setTag(value) {
            const newValue = value || {};
            for (let prop in newValue) {
                if (newValue.hasOwnProperty(prop)) {
                    if (prop === 'light' || prop === 'dark')
                        this.updateTag(prop, newValue[prop]);
                    else
                        this._tag[prop] = newValue[prop];
                }
            }
            this._options?.onUpdateTheme();
            this._options?.onUpdateBlock();
        }
        updateTag(type, value) {
            this._tag[type] = this._tag[type] || {};
            for (let prop in value) {
                if (value.hasOwnProperty(prop))
                    this._tag[type][prop] = value[prop];
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
            ];
        }
    }
    exports.Model = Model;
});
define("@scom/page-block", ["require", "exports", "@ijstech/components", "@scom/page-block/model/index.ts"], function (require, exports, components_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_1.Styles.Theme.ThemeVars;
    let ScomPageBlock = class ScomPageBlock extends components_1.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
        }
        getConfigurators() {
            return this.model.getConfigurators();
        }
        onUpdateBlock() {
            const { backgroundImageUrl = '', direction = 'vertical', gap = 0, height = 'auto', width = 'auto' } = this.model.tag || {};
            this.pnlWrapper.direction = direction;
            this.pnlWrapper.gap = gap;
            this.pnlWrapper.height = height;
            this.pnlWrapper.width = width;
            const themeVar = document.body.style.getPropertyValue('--theme') || 'dark';
            if (this.model.tag[themeVar]) {
                this.pnlWrapper.background.color = Theme.background.main;
            }
            else {
                this.pnlWrapper.background.color = 'transparent';
            }
            if (backgroundImageUrl)
                this.pnlWrapper.background.color = `url(${backgroundImageUrl}) center center / cover no-repeat`;
        }
        updateStyle(name, value) {
            value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
        }
        onUpdateTheme() {
            const themeVar = document.body.style.getPropertyValue('--theme') || 'dark';
            this.updateStyle('--background-main', this.model.tag[themeVar]?.backgroundColor);
        }
        init() {
            super.init();
            this.model = new index_1.Model({
                onUpdateBlock: this.onUpdateBlock.bind(this),
                onUpdateTheme: this.onUpdateTheme.bind(this)
            });
        }
        render() {
            return (this.$render("i-stack", { id: "pnlWrapper", width: "100%" }));
        }
    };
    ScomPageBlock = __decorate([
        components_1.customModule,
        (0, components_1.customElements)('i-scom-page-block')
    ], ScomPageBlock);
    exports.default = ScomPageBlock;
});

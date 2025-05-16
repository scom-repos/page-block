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
define("@scom/page-block/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.containerStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.containerStyle = components_1.Styles.style({
        width: 'var(--layout-container-width)',
        maxWidth: 'var(--layout-container-max_width)',
        overflow: 'hidden',
        textAlign: 'var(--layout-container-text_align)',
        margin: '0 auto',
    });
});
define("@scom/page-block", ["require", "exports", "@ijstech/components", "@scom/page-block/model/index.ts", "@scom/page-block/index.css.ts"], function (require, exports, components_2, index_1, index_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_2.Styles.Theme.ThemeVars;
    let ScomPageBlock = class ScomPageBlock extends components_2.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
        }
        setTag(value) {
            this.model.setTag(value);
        }
        getConfigurators() {
            return this.model.getConfigurators();
        }
        onUpdateBlock() {
            const { background, direction = 'vertical', gap = 0, height = '100%', width = '100%', minHeight, margin, padding, maxWidth, justifyContent, alignItems, overlay, stack, backgroundAttachment = '', transform = '' } = this.model.tag || {};
            this.pnlWrapper.direction = direction;
            this.pnlWrapper.gap = gap;
            this.height = height;
            if (minHeight)
                this.minHeight = minHeight;
            this.width = width;
            this.display = "flex";
            if (maxWidth !== undefined) {
                this.maxWidth = maxWidth;
                this.pnlWrapper.maxWidth = maxWidth;
            }
            if (margin)
                this.margin = margin;
            if (padding)
                this.pnlWrapper.padding = padding;
            if (justifyContent)
                this.pnlWrapper.justifyContent = justifyContent;
            if (alignItems)
                this.pnlWrapper.alignItems = alignItems;
            if (stack)
                this.stack = stack;
            if (background?.color)
                this.background.color = background.color;
            else
                this.background.color = 'transparent';
            if (background?.image)
                this.background.color = `url(${background.image}) center center / cover no-repeat`;
            this.pnlOverlay.visible = !!overlay;
            this.pnlOverlay.background = { color: overlay };
            if (backgroundAttachment)
                this.style.backgroundAttachment = backgroundAttachment;
            if (transform)
                this.style.transform = transform;
        }
        updateStyle(name, value) {
            value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
        }
        onUpdateTheme() {
            const themeVar = document.body.style.getPropertyValue('--theme') || 'dark';
            this.updateStyle('--background-main', this.model.tag[themeVar]?.backgroundColor);
        }
        add(item) {
            item.parent = this.pnlWrapper;
            this.pnlWrapper.appendChild(item);
            this._controls.push(item);
            return item;
        }
        init() {
            const children = this.children;
            const childNodes = [];
            for (const child of children) {
                if (child.nodeName !== 'I-PANEL') {
                    childNodes.push(child);
                }
            }
            super.init();
            this.model = new index_1.Model({
                onUpdateBlock: this.onUpdateBlock.bind(this),
                onUpdateTheme: this.onUpdateTheme.bind(this)
            });
            for (const child of childNodes) {
                this.pnlWrapper.appendChild(child);
            }
            const tag = this.getAttribute('tag', true);
            if (tag)
                this.setTag(tag);
        }
        render() {
            return (this.$render("i-panel", { width: "100%", stack: { grow: "1" } },
                this.$render("i-panel", { id: "pnlOverlay", top: "0", left: "0", width: "100%", height: "100%", visible: false }),
                this.$render("i-stack", { id: "pnlWrapper", direction: 'vertical', width: "100%", height: "100%", mediaQueries: [
                        {
                            maxWidth: "767px",
                            properties: {
                                direction: 'vertical'
                            }
                        }
                    ], class: index_css_1.containerStyle })));
        }
    };
    ScomPageBlock = __decorate([
        components_2.customModule,
        (0, components_2.customElements)('i-page-block', {
            icon: 'stop',
            props: {},
            className: 'ScomPageBlock',
            events: {}
        })
    ], ScomPageBlock);
    exports.default = ScomPageBlock;
});

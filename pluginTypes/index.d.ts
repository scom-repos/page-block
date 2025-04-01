/// <amd-module name="@scom/page-block/interface.ts" />
declare module "@scom/page-block/interface.ts" {
    import { ISpace } from "@ijstech/components";
    export interface ISettings {
        height?: number | string;
        width?: number | string;
        direction?: 'horizontal' | 'vertical';
        justifyContent?: string;
        alignItems?: string;
        gap?: number | string;
        margin?: ISpace;
        padding?: ISpace;
        maxWidth?: number | string;
        light?: IColors;
        dark?: IColors;
        overlay?: string;
        stack?: IStack;
        background?: {
            color?: string;
            image?: string;
        };
    }
    export interface IColors {
    }
    export interface IStack {
        grow?: string;
        shrink?: string;
        basis?: string;
    }
}
/// <amd-module name="@scom/page-block/model/index.ts" />
declare module "@scom/page-block/model/index.ts" {
    import { ISettings } from "@scom/page-block/interface.ts";
    interface IOptions {
        onUpdateBlock: () => void;
        onUpdateTheme: () => void;
    }
    export class Model {
        private _tag;
        private _options;
        constructor(options: IOptions);
        get tag(): ISettings;
        set tag(value: ISettings);
        private getData;
        setData(): void;
        private getTag;
        setTag(value: ISettings): void;
        private updateTag;
        getConfigurators(): {
            name: string;
            target: string;
            getActions: () => any[];
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        }[];
    }
}
/// <amd-module name="@scom/page-block/index.css.ts" />
declare module "@scom/page-block/index.css.ts" {
    export const containerStyle: string;
}
/// <amd-module name="@scom/page-block" />
declare module "@scom/page-block" {
    import { Module, ControlElement, Container, Control } from '@ijstech/components';
    interface ScomPageBlockElement extends ControlElement {
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ["i-page-block"]: ScomPageBlockElement;
            }
        }
    }
    export default class ScomPageBlock extends Module {
        private pnlWrapper;
        private pnlOverlay;
        private model;
        static create(options?: ScomPageBlockElement, parent?: Container): Promise<ScomPageBlock>;
        constructor(parent?: Container, options?: ScomPageBlockElement);
        getConfigurators(): {
            name: string;
            target: string;
            getActions: () => any[];
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        }[];
        private onUpdateBlock;
        private updateStyle;
        private onUpdateTheme;
        add(item: Control): Control;
        init(): void;
        render(): any;
    }
}

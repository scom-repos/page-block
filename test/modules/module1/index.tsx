import { Module, customModule, Container } from '@ijstech/components';
import ScomPageBlock from '@scom/page-block';

@customModule
export default class Module1 extends Module {
    private el: ScomPageBlock;

    constructor(parent?: Container, options?: any) {
        super(parent, options);
    }

    async init() {
        super.init();
        const config = this.el.getConfigurators()[0];
        if (config?.setTag) config.setTag({
            height: 300,
            width: '100%',
            backgroundImageUrl: "https://cdn.ijsweb.com/assets/d012ea7a-cf1c-44de-8f9e-dbdd75b1e9b8/02250-RG@2x.png",
            light: {
                backgroundColor: 'white',
            },
            dark: {
                backgroundColor: 'blue'
            }
        })
    }

    render() {
        return <i-panel margin={{left: '1rem', top: '1rem'}}>
            <i-page-block
                id="el"
            />
        </i-panel>
    }
}
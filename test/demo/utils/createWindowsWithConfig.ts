import {_Window} from 'hadouken-js-adapter/out/types/src/api/window/window';

import {PreviewConfig, LayoutsConfig, ConfigurationObject} from '../../../gen/provider/config/layouts-config';
import {createApp} from '../../../src/demo/spawn';
let counter = 0;
/**
 * Creates a set of windows, one per argument.
 *
 * If argument is provided, it will be used as the windows snap preview configuration. If `undefined`, window will use
 * default service config.
 *
 * @param configs Set of snap preview configs
 */
export async function createWindowsWithConfig(type: 'snap'|'tab', ...configs: (PreviewConfig|undefined)[]): Promise<_Window[]> {
    return Promise.all(configs.map(async (previewConfig: PreviewConfig|undefined, index: number) => {
        let config: ConfigurationObject|undefined = undefined;
        if (previewConfig) {
            config = {
                preview: {
                    snap: {activeOpacity: null, targetOpacity: null},
                    tab: {activeOpacity: null, targetOpacity: null}
                }
            };
            config.preview![type] = previewConfig;
        }

        const app = await createApp({
            type: 'manifest',
            // All app uuid's must be unique, due to apparent manifest caching behaviour
            id: `window-${type}-${index}:${counter++}`,
            position: {x: 200 + (index * 350), y: 150},
            config
        });

        return app.getWindow();
    }));
}

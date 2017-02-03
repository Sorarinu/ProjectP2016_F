/**
 * WebpackDefinePluginで与えられたりする環境変数とか.
 */

/* tslint:disable:class-name */
import * as Vue from 'vue';
interface process {
    env: {
        NODE_ENV: string;
    };
}
declare var process;

// vuetify
declare module 'vue/types/vue' {
    interface Vue {
        $vuetify: any;
    }
}

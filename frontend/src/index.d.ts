/**
 * WebpackDefinePluginで与えられたりする環境変数とか.
 */

/* tslint:disable:class-name */
interface process {
    env: {
        NODE_ENV: string,
    };
}
declare var process: process;

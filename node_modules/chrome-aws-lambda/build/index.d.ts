/// <reference path="../typings/chrome-aws-lambda.d.ts" />
import { PuppeteerNode, Viewport } from 'puppeteer-core';
declare class Chromium {
    /**
     * Downloads or symlinks a custom font and returns its basename, patching the environment so that Chromium can find it.
     * If not running on AWS Lambda nor Google Cloud Functions, `null` is returned instead.
     */
    static font(input: string): Promise<string>;
    /**
     * Returns a list of additional Chromium flags recommended for serverless environments.
     * The canonical list of flags can be found on https://peter.sh/experiments/chromium-command-line-switches/.
     */
    static get args(): string[];
    /**
     * Returns sensible default viewport settings.
     */
    static get defaultViewport(): Required<Viewport>;
    /**
     * Inflates the current version of Chromium and returns the path to the binary.
     * If not running on AWS Lambda nor Google Cloud Functions, `null` is returned instead.
     */
    static get executablePath(): Promise<string>;
    /**
     * Returns a boolean indicating if we are running on AWS Lambda or Google Cloud Functions.
     * False is returned if Serverless environment variables `IS_LOCAL` or `IS_OFFLINE` are set.
     */
    static get headless(): boolean;
    /**
     * Overloads puppeteer with useful methods and returns the resolved package.
     */
    static get puppeteer(): PuppeteerNode;
}
export = Chromium;

import * as Context from './context';
import { OctokitOptions } from '@octokit/core/dist-types/types';
export declare const context: Context.Context;
export declare const GitHub: any;
/**
 * Convience function to correctly format Octokit Options to pass into the constructor.
 *
 * @param     token    the repo PAT or GITHUB_TOKEN
 * @param     options  other options to set
 */
export declare function getOctokitOptions(token: string, options?: OctokitOptions): OctokitOptions;

import type {Fn} from '../types';
import {removeAll} from '../array';

export function lastIndexOf(searchValue: string, position?: number): Fn<number, string | string[]>;
export function lastIndexOf<A, S extends A = A>(searchValue: S, position?: number): Fn<number, readonly A[]>;
export function lastIndexOf(searchValue: any, position?: number): Fn<number, any> {
	const args = removeAll(undefined)([searchValue, position]);
	return (input) => input.lastIndexOf.apply(input, args);
}

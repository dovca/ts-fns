import type {First, Fn, Negative, WithoutFirst} from '../types';
import {type Slice, slice as typedSlice} from 'string-ts';
import {isArray} from '../predicate';

function arraySlice<T>(start?: number, end?: number): Fn<T[], readonly T[]> {
	return (values) => values.slice(start, end);
}

function stringSlice<T extends string, S extends number = 0, E extends number = -1>(start?: S, end?: E): Fn<Slice<T, S, E>, T> {
	return (input) => typedSlice(input, start, end);
}

export function slice<T extends string>(): Fn<Slice<T, 0, -1>, T>;
export function slice<T extends string, S extends number>(start: S): Fn<Slice<T, S, -1>, T>;
export function slice<T extends string, S extends number, E extends number>(start: S, end: E): Fn<Slice<T, S, E>, T>;
export function slice<T extends readonly any[]>(start?: number, end?: number): Fn<T>;
export function slice<T>(start?: number, end?: number): Fn<unknown[]> | Fn<string> {
	return ((input: unknown) => {
		if (typeof input === 'string') {
			return stringSlice(start, end)(input);
		} else if (isArray<unknown>(input)) {
			return arraySlice(start, end)(input);
		} else {
			throw new Error(`slice: Expected input to be a string or an array. Got ${typeof input}.`);
		}
	}) as Fn<unknown[], readonly unknown[]> | Fn<string>;
}

export function head<T extends string, N extends number>(count?: N): Fn<Slice<T, 0, N>, T>;
export function head<T extends readonly any[]>(count?: number): Fn<T>;
export function head(count: number = 1): Fn<string> | Fn<unknown[]> {
	return (input: any) => slice(0, count)(input);
}

export function tail<T extends string, N extends number>(count?: N): Fn<Slice<T, Negative<N>>, T>;
export function tail<T extends readonly any[]>(count?: number): Fn<T>;
export function tail(count: number = 1): Fn<string> | Fn<unknown[]> {
	return (input: any) => slice(-count)(input);
}

export function decapitate<T extends string>(value: T): [Slice<T, 0, 1>, Slice<T, 1>];
export function decapitate<T extends readonly any[]>(values: T): [First<T>, WithoutFirst<T>];
export function decapitate<T extends string | readonly any[]>(values: T): [string, string] | [any, any[]] {
	return typeof values === 'string'
		? [values.slice(0, 1), values.slice(1)]
		: [values[0], values.slice(1)];
}

import {expect, test} from 'bun:test';
import {first} from '../../src';

test('first', () => {
	expect(first([])).toBe(undefined);
	expect(first([1])).toBe(1);
	expect(first([1, 2, 3])).toBe(1);
	expect(first([undefined])).toBe(undefined);
	expect<number | undefined>(first([undefined, 1])).toBe(undefined);
});

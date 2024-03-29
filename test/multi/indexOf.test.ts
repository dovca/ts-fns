import {expect, test} from 'bun:test';
import {indexOf} from '../../src';

test('indexOf', () => {
	expect(indexOf(0)([])).toBe(-1);
	expect(indexOf(0)([0, 1, 2, 1])).toBe(0);
	expect(indexOf(1)([0, 1, 2, 1])).toBe(1);
	expect(indexOf(3)([0, 1, 2, 1])).toBe(-1);
	expect(indexOf('b')('abc')).toBe(1);
	expect(indexOf('d')('abc')).toBe(-1);
	expect(indexOf('b')(['a', 'b', 'c'])).toBe(1);
	expect(indexOf('d')(['a', 'b', 'c'])).toBe(-1);
});

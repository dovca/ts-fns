import type {Fn, Predicate} from '../types';

export function endsWith(str: string): Predicate<string> {
	return (input) => input.endsWith(str);
}

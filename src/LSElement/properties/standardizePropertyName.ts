import { formatToLowerCase } from '../utils/formatToLowerCase';

export function standardizePropertyName(propertyName: string) {
	return formatToLowerCase(propertyName);
}
export const toSlug = (string: string) => string.toLowerCase().replaceAll(' ', '-');

export const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}, ${date.getFullYear()}`;
}
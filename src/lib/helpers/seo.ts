export function computeSeoDescription(metadata: { category: string; artist: any; title: any; date: any; description: string; }) {
	let seoDescription = '';
	if (metadata.category === 'music') {
		if (metadata.artist === 'Jonathan Piper') {
			seoDescription = `Music by Jonathan Piper${metadata.title ? `, titled ${metadata.title}` : ''} — experimental tuba and electronics, performed ${metadata.date}.`;
		} else {
			seoDescription = `Music by ${metadata.artist}${metadata.title ? `, titled ${metadata.title}` : ''}, featuring Jonathan Piper on tuba. Performed ${metadata.date}.`;
		}
	} else if (metadata.category === 'writing') {
		seoDescription = `Writing by Jonathan Piper, titled ${metadata.title}, published on ${metadata.date}.`;
	} else if (metadata.category === 'exhibitions') {
		seoDescription = `Museum exhibition titled ${metadata.title}, held on ${metadata.date} at the NAMM Museum of Making Music.`;
	} else {
		seoDescription = metadata.description
			? metadata.description
			: `Page about ${metadata.category} from Jonathan Piper, San Diego-based tubist specializing in experimental and improvisational music.`;
	}
	return seoDescription;
}

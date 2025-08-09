export type Artist = {
	name: string;
	slug: string;
	location: string[];
	dateAdded: string;
	members?: Artist[];
	instrumentation: string[];
	bio?: string;
	image: MediaObject;
	links?: string[];
	socialHandles?: SocialHandle[];
};

export type Event = {
	title: string;
	slug: string;
	location: string;
	date: string;
	description?: string;
	artists: string[] | string[][] | SimpleArtist[] | SimpleArtist[][];
	poster: string;
	audio?: MediaObject[];
	video?: MediaObject[];
	image?: MediaObject[];
};

type SocialHandle = {
	platform: string;
	username: string;
	url: string;
};

type MediaObject = {
	url: string;
	altText: string;
	caption?: string;
	credit?: string;
};

export type SimpleArtist = {
	name: string;
	slug: string;
};

export type Page = {
	images?: {
		header?: MediaObject;
	};
};

export type Home = {
	highlights?: [
		{
			embed: string;
			title?: string;
			caption: string;
		}
	];
};

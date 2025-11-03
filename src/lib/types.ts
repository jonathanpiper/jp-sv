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

// export type Post = {
// 	title: string;
// 	slug: string;
// 	category: string;
// 	default?: string;
// 	date: string;
// 	metadata?: Record<string, any>;
// 	content?: string;
// 	images?: MediaObject[];
// 	audio?: MediaObject[];
// 	video?: MediaObject[];
// };

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

export type Post = {
	default?: string;
	metadata: {
		highlights: Highlight[];
		slug?: string;
	};
};

export type Highlight = {
	post?: string;
	isPost?: boolean;
	slug?: string;
	embed?: string;
	title?: string;
	caption?: string;
	link?: string;
	artist?: string;
	artist_link?: string;
	embed_code?: string;
	source?: string;
};

export type MenuItem = {
	title: string;
	order: number;
	slug: string;
};

export type Excerpt = {
	title: string;
	category: string;
	date: string;
	caption: string;
};

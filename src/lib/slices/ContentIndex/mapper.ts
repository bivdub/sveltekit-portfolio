import type { Client, Content, SliceMapper } from '@prismicio/client';

type Context = { client: Client<Content.AllDocumentTypes> };

const mapper: SliceMapper<
	Content.ContentIndexSlice,
	{
		slice: Content.ContentIndexSlice;
		items: Content.BlogPostDocument<string>[] | Content.ProjectDocument<string>[];
	},
	Context
> = async ({ slice, context }) => {
	const { client } = context;

	const items =
		slice.primary.content_type === 'blog'
			? await client.getAllByType('blog_post')
			: await client.getAllByType('project');

	return { slice, items };
};

export default mapper;

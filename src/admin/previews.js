const env = nunjucks.configure();

const Preview = ({entry, path, context}) => {
	const data = context(entry.get('data').toJS());
	const html = env.render(path, data);
	return <div dangerouslySetInnerHTML={{__html: html}}/>;
};

const Page = ({entry}) => (
	<Preview
		entry={entry}
		path="layouts/page.njk"
	/>
);

CMS.registerPreviewTemplate('home', Page);
CMS.registerPreviewTemplate('pages', Page);

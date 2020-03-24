const env = nunjucks.configure();

const Preview = ({entry, path, context}) => {
	const data = context(entry.get('data').toJS());
	// const html = env.render(path, data);
	const html = data.title;
	return <div dangerouslySetInnerHTML={{__html: html}}/>;
};

const Page = ({entry}) => (
	<Preview
		entry={entry}
		path="layouts/page.njk"
		context={({title, intro, sections, headerbordercolor, headerbgcolor, headertextcolor}) => ({
            title,
            intro,
            sections,
            headerbordercolor,
            headerbgcolor,
            headertextcolor
		})}
	/>
);

CMS.registerPreviewTemplate('home', Page);
CMS.registerPreviewTemplate('pages', Page);

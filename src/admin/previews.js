const {
	w3DateFilter,
	markdownFilter,
	dateFilter,
	slugFilter,
	site
} = previewUtil;


const env = nunjucks.configure();

env.addFilter('w3DateFilter', w3DateFilter);
env.addFilter('markdownFilter', markdownFilter);
env.addFilter('dateFilter', dateFilter);
env.addFilter('slug', slugFilter)

const Preview = ({entry, path, context}) => {
	const data = context(entry.get('data').toJS());
	const html = env.render(path, {...data, site});
	return <div dangerouslySetInnerHTML={{__html: html}}/>;
};

const Page = ({entry}) => (
	<Preview
		entry={entry}
		path="layouts/page.njk"
		context={({ title, intro, sections, headerbgcolor, headertextcolor, headerbordercolor }) => ({
			header: false,
			footer: false,
			title,
			intro,
			sections,
			headerbgcolor,
			headertextcolor,
			headerbordercolor
		})}
	/>
);

const ProjectsAndTools = ({entry}) => (
	<Preview
		entry={entry}
		path="layouts/projects.njk"
		context={({ title, intro, projects, tools, headerbgcolor, headertextcolor, headerbordercolor }) => ({
			header: false,
			footer: false,
			title,
			intro,
			projects,
			tools,
			headerbgcolor,
			headertextcolor,
			headerbordercolor
		})}
	/>
);

const Post = ({entry}) => (
	<Preview
		entry={entry}
		path="layouts/post.njk"
		context={({ title, date, author, body }) => ({
			header: false,
			footer: false,
			title,
			date,
			author,
			headerbgcolor: 'white',
			content: markdownFilter(body || '')
		})}
	/>
);

CMS.registerPreviewTemplate('home', Page);
CMS.registerPreviewTemplate('projects-and-tools', ProjectsAndTools);
CMS.registerPreviewTemplate('pages', Page);
CMS.registerPreviewTemplate('posts', Post);

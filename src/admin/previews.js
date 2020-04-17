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
		context={({ title, intro, sections, headerbgcolor, headertextcolor, headerbordercolor }) => ({
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
		context={({ title, intro, headerbgcolor, headertextcolor, headerbordercolor }) => ({
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

CMS.registerPreviewTemplate('home', Page);
CMS.registerPreviewTemplate('projects-and-tools', ProjectsAndTools);
CMS.registerPreviewTemplate('pages', Page);

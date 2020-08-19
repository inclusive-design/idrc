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
		context={({ site, title, intro, sections, headerBgColor, headerTextColor, headerBorderColor }) => ({
			previewMode: true,
			site,
			title,
			intro,
			sections,
			headerBgColor,
			headerTextColor,
			headerBorderColor
		})}
	/>
);

const ProjectsAndTools = ({entry}) => (
	<Preview
		entry={entry}
		path="layouts/projects.njk"
		context={({ site, title, intro, projects, tools, headerBgColor, headerTextColor, headerBorderColor }) => ({
			previewMode: true,
			site,
			title,
			intro,
			projects,
			tools,
			headerBgColor,
			headerTextColor,
			headerBorderColor
		})}
	/>
);

const Post = ({entry}) => (
	<Preview
		entry={entry}
		path="layouts/post.njk"
		context={({ site, title, date, author, body }) => ({
			previewMode: true,
			site,
			title,
			date,
			author,
			headerBgColor: 'white',
			content: markdownFilter(body || '')
		})}
	/>
);

const Idea = ({entry}) => (
	<Preview
		entry={entry}
		path="layouts/idea.njk"
		context={({ site, title, date, author, body }) => ({
			previewMode: true,
			site,
			title,
			date,
			author,
			headerBgColor: 'white',
			content: markdownFilter(body || '')
		})}
	/>
);

const SiteData = ({entry}) => (
	<Preview
		entry={entry}
		path="partials/global/footer.njk"
		context={({ name, description, url, email, phone, fax, address, twitter, medium, youtube }) => ({
			site: {
				name,
				description,
				url,
				email,
				phone,
				fax,
				address,
				twitter,
				medium,
				youtube
			}
		})}
	/>
);

CMS.registerPreviewTemplate('home', Page);
CMS.registerPreviewTemplate('projects-and-tools', ProjectsAndTools);
CMS.registerPreviewTemplate('pages', Page);
CMS.registerPreviewTemplate('posts', Post);
CMS.registerPreviewTemplate('ideas', Idea);
CMS.registerPreviewTemplate('site_data', SiteData);

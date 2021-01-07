/* global CMS, nunjucks, previewUtil, PropTypes, React */

const {
	formatDateFilter,
	isoDateFilter,
	limitFilter,
	markdownFilter,
	slugFilter,
	splitFilter,
	site
} = previewUtil;

const env = nunjucks.configure();

env.addFilter('formatDate', formatDateFilter);
env.addFilter('isoDate', isoDateFilter);
env.addFilter('limit', limitFilter);
env.addFilter('markdown', markdownFilter);
env.addFilter('slug', slugFilter);
env.addFilter('split', splitFilter);

const Preview = ({entry, path, context}) => {
	const data = context(entry.get('data').toJS());
	const html = env.render(path, {...data, site});
	return <div dangerouslySetInnerHTML={{__html: html}}/>;
};

Preview.propTypes = {
	entry: PropTypes.object.isRequired,
	path: PropTypes.string.isRequired,
	context: PropTypes.func.isRequired
};

const Page = ({entry}) => (
	<Preview
		entry={entry}
		path="layouts/page.njk"
		context={({site, title, intro, sections, headerBgColor, headerTextColor, headerBorderColor}) => ({
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

Page.propTypes = {
	entry: PropTypes.object.isRequired
};

const History = ({entry}) => (
	<Preview
		entry={entry}
		path="layouts/history.njk"
		context={({site, title, intro, milestones, body, headerBgColor, headerTextColor, headerBorderColor}) => ({
			previewMode: true,
			site,
			title,
			intro,
			content: markdownFilter(body || ''),
			headerBgColor,
			headerTextColor,
			headerBorderColor,
			milestones
		})}
	/>
);

History.propTypes = {
	entry: PropTypes.object.isRequired
};

const ProjectsAndTools = ({entry}) => (
	<Preview
		entry={entry}
		path="layouts/projects.njk"
		context={({site, title, intro, projects, tools, headerBgColor, headerTextColor, headerBorderColor}) => ({
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

ProjectsAndTools.propTypes = {
	entry: PropTypes.object.isRequired
};

const Person = ({entry}) => (
	<Preview
		entry={entry}
		path="layouts/single--person.njk"
		context={({title, intro, pronouns, job, projects, interests, body, email, website, twitter, linkedin, github}) => ({
			previewMode: true,
			title,
			intro,
			pronouns,
			job,
			projects,
			interests,
			content: markdownFilter(body || ''),
			email,
			website,
			twitter,
			linkedin,
			github
		})}
	/>
);

Person.propTypes = {
	entry: PropTypes.object.isRequired
};

const News = ({entry}) => (
	<Preview
		entry={entry}
		path="layouts/single--news.njk"
		context={({site, title, date, author, body}) => ({
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

News.propTypes = {
	entry: PropTypes.object.isRequired
};

const Idea = ({entry}) => (
	<Preview
		entry={entry}
		path="layouts/single--idea.njk"
		context={({site, title, date, author, body}) => ({
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

Idea.propTypes = {
	entry: PropTypes.object.isRequired
};

const SiteData = ({entry}) => (
	<Preview
		entry={entry}
		path="partials/global/footer.njk"
		context={({name, description, url, email, phone, fax, address, twitter, medium, youtube}) => ({
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

SiteData.propTypes = {
	entry: PropTypes.object.isRequired
};

CMS.registerPreviewTemplate('home', Page);
CMS.registerPreviewTemplate('history', History);
CMS.registerPreviewTemplate('projects-and-tools', ProjectsAndTools);
CMS.registerPreviewTemplate('people', Person);
CMS.registerPreviewTemplate('pages', Page);
CMS.registerPreviewTemplate('news', News);
CMS.registerPreviewTemplate('ideas', Idea);
CMS.registerPreviewTemplate('site_data', SiteData);

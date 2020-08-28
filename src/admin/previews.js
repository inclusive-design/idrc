const {
	w3DateFilter,
	markdownFilter,
	dateFilter,
	slugFilter,
	site
} = previewUtil;

const env = nunjucks.configure();

env.addFilter('w3DateFilter', w3DateFilter);
env.addFilter('markdown', markdownFilter);
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

const Person = ({entry}) => (
	<Preview
		entry={entry}
		path="layouts/single--person.njk"
		context={({ site, title, job, pronouns, email, website, twitter, github, linkedin, projects, interests, body, headerBgColor, headerTextColor, headerBorderColor }) => ({
			previewMode: true,
			site,
			title,
			job,
			pronouns,
			email,
			website,
			twitter,
			github,
			linkedin,
			projects,
			interests,
			content: markdownFilter(body || ''),
			headerBgColor,
			headerTextColor,
			headerBorderColor
		})}
	/>
);

const News = createClass({
	render: function() {
		const entry = this.props.entry;
		const author = entry.getIn(['data', 'author']) ?? 'IDRC Team';
		return h(
			'div',
			{className: 'single single--news'},
			h(
				'main',
				{},
				h(
					'article',
					{className: 'container'},
					h(
						'header',
						{},
						h(
							'div',
							{className: 'container inner'},
							h(
								'p',
								{className: 'post-type'},
								'News'
							),
							h(
								'h1',
								{},
								entry.getIn(['data', 'title'])
							),
							h(
								'p',
								{className: 'metadata'},
								`By ${author}`
							),
							// TODO: Date
						)
					),
					h(
						'div',
						{className: 'content'},
						h(
							'div',
							{className: 'inner'},
							this.props.widgetFor('body'))
						)
					)
				)	
		);
	  }
});

const Idea = createClass({
	render: function() {
		const entry = this.props.entry;
		console.log(entry);
		const author = entry.getIn(['data', 'author']) ?? 'IDRC Team';
		return h(
			'div',
			{className: 'single single--idea'},
			h(
				'main',
				{},
				h(
					'article',
					{className: 'container'},
					h(
						'header',
						{},
						h(
							'div',
							{className: 'container inner'},
							h(
								'p',
								{className: 'post-type'},
								'News'
							),
							h(
								'h1',
								{},
								entry.getIn(['data', 'title'])
							),
							h(
								'p',
								{className: 'metadata'},
								`By ${author}`
							),
							// TODO: Date
						)
					),
					h(
						'div',
						{className: 'content'},
						h(
							'div',
							{className: 'inner'},
							this.props.widgetFor('body')
						)
					)
				)
			)	
		);
	  }
});

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
CMS.registerPreviewTemplate('people', Person);
CMS.registerPreviewTemplate('pages', Page);
CMS.registerPreviewTemplate('news', News);
CMS.registerPreviewTemplate('ideas', Idea);
CMS.registerPreviewTemplate('site_data', SiteData);

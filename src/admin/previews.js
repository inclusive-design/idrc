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

<<<<<<< HEAD
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
=======
const Post = ({entry}) => (
	<Preview
		entry={entry}
		path="layouts/single--news.njk"
		context={({ site, title, date, author, body }) => ({
			previewMode: true,
			site,
			title,
			date,
			author,
			headerBgColor: 'white',
			content: markdown(body || '')
		})}
	/>
);

const Idea = ({entry}) => (
	<Preview
		entry={entry}
		path="layouts/single--idea.njk"
		context={({ site, title, date, author, body }) => ({
			previewMode: true,
			site,
			title,
			date,
			author,
			headerBgColor: 'white',
			content: markdown(body || '')
		})}
	/>
);
>>>>>>> dev

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
CMS.registerPreviewTemplate('news', News);
CMS.registerPreviewTemplate('ideas', Idea);
CMS.registerPreviewTemplate('site_data', SiteData);

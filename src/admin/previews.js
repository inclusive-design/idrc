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

class Person extends React.Component {
	render() {
		const entry = this.props.entry;
		let projects = {};
		if (entry.getIn(['data', 'projects'])) {
			projects.__html = entry.getIn(['data', 'projects']).join('<br />');
		}
		return <div className="single single--person">
			<main>
				<article className="container">
					<header>
						<div className="container inner">
							<p className="breadcrumbs">Team</p>
							<h1>{ entry.getIn(['data', 'title']) }</h1>
							<div className="metadata">
								<p className="h3">{ entry.getIn(['data', 'job']) }</p>
								<p>{ entry.getIn(['data', 'pronouns']) }</p>
							</div>
						</div>
					</header>
					<div className="content">
						<div className="inner">
							{entry.getIn(['data', 'projects']) &&
							<>
								<h2 className="h3">Projects</h2>
								<p dangerouslySetInnerHTML={projects} />
							</>
							}
							{entry.getIn(['data', 'interests']) &&
							<>
								<h2 className="h3">Interests</h2>
								<ReactMarkdown source={entry.getIn(['data', 'interests'])} />
							</>
							}
							{entry.getIn(['data', 'body']) &&
							<>
								<h2 className="h3">Bio</h2>
								<ReactMarkdown source={entry.getIn(['data', 'body'])} />
							</>
							}
							{entry.getIn(['data', 'email']) &&
							<>
								<h2 className="h3">Connect</h2>
								<table>
									<tr>
										<th>Email</th>
										<td><a href={ 'mailto:' + entry.getIn(['data', 'email']) }>{ entry.getIn(['data', 'email']) }</a></td>
									</tr>
									{entry.getIn(['data', 'website']) &&
									<tr>
										<th>Website</th>
										<td><a href={ entry.getIn(['data', 'website']) }>{ entry.getIn(['data', 'website']).replace('https://', '').replace('http://', '') }</a></td>
									</tr>
									}
									{entry.getIn(['data', 'twitter']) &&
									<tr>
										<th>Twitter</th>
										<td><a href={ 'https://twitter/com/' + entry.getIn(['data', 'twitter']).replace('@', '') }>{ entry.getIn(['data', 'twitter']) }</a></td>
									</tr>
									}
									{entry.getIn(['data', 'linkedin']) &&
									<tr>
										<th>LinkedIn</th>
										<td><a href={ entry.getIn(['data', 'linkedin']) }>{ entry.getIn(['data', 'title']) }</a></td>
									</tr>
									}	
									{entry.getIn(['data', 'github']) &&
									<tr>
										<th>GitHub</th>
										<td><a href={ entry.getIn(['data', 'github']) }>{ entry.getIn(['data', 'github']).replace('https://github.com/', '') }</a></td>
									</tr>
									}
								</table>
							</>
							}
						</div>
					</div>
				</article>
			</main>
		</div>;
	}
}

class News extends React.Component {
	render() {
		const entry = this.props.entry;
		const author = entry.getIn(['data', 'author']) ?? 'IDRC Team';
		const datePublished = dateFilter(entry.getIn(['data', 'date']));

		return <div className="single single--news">
			<main>
				<article className="container">
					<header>
						<div className="container inner">
							<p className="breadcrumbs">News</p>
							<h1>{ entry.getIn(['data', 'title']) }</h1>
							<p className="metadata">
								By { author }
								<span className="separator" ariaHidden="true">·</span>
								<time>{ datePublished }</time>
							</p>
						</div>
					</header>
					<div className="content">
						<div className="inner">
							{ this.props.widgetFor('body') }
						</div>
					</div>
				</article>
			</main>
		</div>;
	}
}

class Idea extends React.Component {
	render() {
		const entry = this.props.entry;
		const author = entry.getIn(['data', 'author']) ?? 'IDRC Team';
		const datePublished = dateFilter(entry.getIn(['data', 'date']));

		return <div className="single single--idea">
			<main>
				<article className="container">
					<header>
						<div className="container inner">
							<p className="breadcrumbs">News</p>
							<h1>{ entry.getIn(['data', 'title']) }</h1>
							<p className="metadata">
								By { author }
								<span className="separator" ariaHidden="true">·</span>
								<time>{ datePublished }</time>
							</p>
						</div>
					</header>
					<div className="content">
						<div className="inner">
							{ this.props.widgetFor('body') }
						</div>
					</div>
				</article>
			</main>
		</div>;
	}
}

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

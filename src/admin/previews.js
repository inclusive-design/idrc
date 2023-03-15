/* eslint-disable react/display-name */
/* global CMS, nunjucks, PropTypes, React */

import formatDateFilter from 'eleventy-plugin-fluid/src/filters/format-date-filter.js';
import isoDateFilter from 'eleventy-plugin-fluid/src/filters/iso-date-filter.js';
import limitFilter from 'eleventy-plugin-fluid/src/filters/limit-filter.js';
import splitFilter from '../filters/split-filter.js';
import site from '../_data/site.json';
import slugifyFilter from '@sindresorhus/slugify';
import markdownFilter from '../filters/markdown';
import imagePositionWithTextShortcode from '../shortcodes/image-position-with-text.js';
import getId from '../utils/extract-youtube-id.js';

const env = nunjucks.configure();

env.addFilter('formatDate', formatDateFilter);
env.addFilter('isoDate', isoDateFilter);
env.addFilter('limit', limitFilter);
env.addFilter('markdown', markdownFilter);
env.addFilter('slugify', slugifyFilter);
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

CMS.registerPreviewStyle('/assets/styles/app.css');

const Page = ({entry}) => (
	<Preview
		entry={entry}
		path="layouts/page.njk"
		context={({site, title, intro, body, sections, headerBgColor, headerTextColor, headerBorderColor}) => ({
			previewMode: true,
			site,
			title,
			intro,
			content: markdownFilter(body || ''),
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

const Project = ({entry}) => (
	<Preview
		entry={entry}
		path="layouts/project.njk"
		context={({projectName, title, body}) => ({
			previewMode: true,
			projectName,
			title,
			headerBgColor: 'coral-500',
			headerBorderColor: 'coral-800',
			headerTextColor: 'black',
			content: markdownFilter(body || '')
		})}
	/>
);

Project.propTypes = {
	entry: PropTypes.object.isRequired
};

const Resource = ({entry}) => (
	<Preview
		entry={entry}
		path="layouts/single--resource.njk"
		context={({title, description, topics, types }) => ({
			previewMode: true,
			title,
			description,
			topics,
			types
		})}
	/>
);

Resource.propTypes = {
	entry: PropTypes.object.isRequired
};

const Tool = ({entry}) => (
	<Preview
		entry={entry}
		path="layouts/single--tool.njk"
		context={({title, shortName, description, tags, link}) => ({
			previewMode: true,
			title,
			shortName,
			description,
			tags,
			link
		})}
	/>
);

Tool.propTypes = {
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
CMS.registerPreviewTemplate('pages', Page);
CMS.registerPreviewTemplate('news', News);
CMS.registerPreviewTemplate('ideas', Idea);
CMS.registerPreviewTemplate('people', Person);
CMS.registerPreviewTemplate('projects', Project);
CMS.registerPreviewTemplate('resources', Resource);
CMS.registerPreviewTemplate('tools', Tool);
CMS.registerPreviewTemplate('site_data', SiteData);

// Custom widgets
CMS.registerEditorComponent({
	id: 'image-position-with-text',
	label: 'Image Position with Text',
	fields: [
		{
			name: 'image',
			label: 'Image',
			widget: 'image',
			required: true
		},
		{
			name: 'alt',
			label: 'Alternative Text',
			default: '',
			widget: 'string'
		},
		{
			name: 'imagePosition',
			label: 'Image Position',
			hint: 'The "center" choice applies to the image only case when the content is not provided. If the "center" is selected when the content is provided, the image position will be reset to "left"',
			widget: 'select',
			options: [{value:'left', label: 'Left'}, {value:'center', label: 'Center'}, {value:'right', label: 'Right'}]
		},
		{
			name: 'scale',
			label: 'Scale',
			widget: 'select',
			default: '100%',
			options: [{value:'25%', label: '25%'}, {value:'50%', label: '50%'}, {value:'75%', label: '75%'}, {value:'100%', label: '100%'}]
		},
		{
			name: 'maxHeight',
			label: 'Max Height in Pixel',
			widget: 'string',
			default: 'auto',
			hint: 'Enter a number. For example 100.'
		},
		{
			name: 'content',
			label: 'Content',
			widget: 'markdown',
			default: '',
			editor_components: [],
			required: false
		},
		{
			name: 'verticalAlignment',
			label: 'Vertical Alignment of Content',
			hint: 'Only select when the content is provided.',
			required: false,
			widget: 'select',
			options: [{value:'top', label: 'Top'}, {value:'center', label: 'Center'}, {value:'bottom', label: 'Bottom'}]
		}
	],
	pattern: /^{% imagePositionWithText "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)" %}([\s\S]*?){% endimagePositionWithText %}/,
	fromBlock: function (match) {
		return {
			image: match[1],
			alt: match[2],
			imagePosition: match[3],
			scale: match[4],
			maxHeight: match[5],
			verticalAlignment: match[6],
			content: match[7]
		};
	},
	toBlock: function (obj) {
		return `{% imagePositionWithText "${obj.image}", "${obj.alt}", "${obj.imagePosition}", "${obj.scale}", "${obj.maxHeight}", "${obj.verticalAlignment}" %}\n${obj.content}\n{% endimagePositionWithText %}`;
	},
	toPreview: function (obj, getAsset, fields) {
		const {content, image, alt, imagePosition, scale, maxHeight, verticalAlignment} = obj;
		const imageField = fields.find(f => f.get('widget') === 'image');
		const src = getAsset(image, imageField);
		return imagePositionWithTextShortcode(content, src, alt, imagePosition, scale, maxHeight, verticalAlignment);
	}
});

CMS.registerEditorComponent({
	id: 'youtube',
	label: 'YouTube Embed',
	fields: [
		{name: 'url', label: 'YouTube Video URL', widget: 'string'}
	],
	pattern: /^{% youtube "(\S+)" %}$/,
	fromBlock: function (match) {
		return {
			url: match[1]
		};
	},
	toBlock: function (obj) {
		return `{% youtube "${obj.url}" %}`;
	},
	toPreview: function (obj) {
		return (
			`<figure class="embed--youtube"><iframe class="video" src="https://youtube.com/embed/${getId(obj.url)}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></figure>`
		);
	}
});

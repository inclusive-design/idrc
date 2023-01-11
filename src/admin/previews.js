/* eslint-disable react/display-name */
/* global CMS, nunjucks, PropTypes, React */

import formatDateFilter from 'eleventy-plugin-fluid/src/filters/format-date-filter.js';
import isoDateFilter from 'eleventy-plugin-fluid/src/filters/iso-date-filter.js';
import limitFilter from 'eleventy-plugin-fluid/src/filters/limit-filter.js';
import splitFilter from '../filters/split-filter.js';
import site from '../_data/site.json';
import slugifyFilter from '@sindresorhus/slugify';
import markdownFilter from '../filters/markdown';
import imageAndTextShortcode from '../shortcodes/image-and-text.js';
import imagePositionShortcode from '../shortcodes/image-position.js';
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
		path="layouts/single--project.njk"
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

Project.propTypes = {
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
CMS.registerPreviewTemplate('tools', Tool);
CMS.registerPreviewTemplate('site_data', SiteData);

// Custom widgets
CMS.registerEditorComponent({
	id: 'image-and-text',
	label: 'Image and Text',
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
			widget: 'string'
		},
		{
			name: 'imagePosition',
			label: 'Image Position',
			widget: 'select',
			options: [{value:'left', label: 'Left'}, {value:'right', label: 'Right'}]
		},
		{
			name: 'verticalAlignment',
			label: 'Vertical Alignment',
			widget: 'select',
			options: [{value:'top', label: 'Top'}, {value:'center', label: 'Center'}, {value:'bottom', label: 'Bottom'}]
		},
		{
			name: 'content',
			label: 'Content',
			widget: 'markdown',
			required: true
		}
	],
	pattern: /^{% imageAndText "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)" %}([\s\S]*?){% endimageAndText %}/,
	fromBlock: function (match) {
		return {
			image: match[1],
			alt: match[2],
			imagePosition: match[3],
			verticalAlignment: match[4],
			content: match[5]
		};
	},
	toBlock: function (obj) {
		return `{% imageAndText "${obj.image}", "${obj.alt}", "${obj.imagePosition}", "${obj.verticalAlignment}" %}\n${obj.content}\n{% endimageAndText %}`;
	},
	toPreview: function (obj, getAsset, fields) {
		const {content, image, alt, imagePosition, verticalAlignment} = obj;
		const imageField = fields.find(f => f.get('widget') === 'image');
		const src = getAsset(image, imageField);
		return imageAndTextShortcode(content, src, alt, imagePosition, verticalAlignment);
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

CMS.registerEditorComponent({
	id: 'image-position',
	label: 'Image Position',
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
			widget: 'string'
		},
		{
			name: 'imagePosition',
			label: 'Image Position',
			widget: 'select',
			default: 'center',
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
		}
	],
	pattern: /^{% imagePosition "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)" %}/,
	fromBlock: function (match) {
		return {
			image: match[1],
			alt: match[2],
			imagePosition: match[3],
			scale: match[4],
			maxHeight: match[5]
		};
	},
	toBlock: function (obj) {
		return `{% imagePosition "${obj.image}", "${obj.alt}", "${obj.imagePosition}", "${obj.scale}", "${obj.maxHeight}" %}`;
	},
	toPreview: function (obj, getAsset, fields) {
		const {image, alt, imagePosition, scale, maxHeight} = obj;
		const imageField = fields.find(f => f.get('widget') === 'image');
		const src = getAsset(image, imageField);
		return imagePositionShortcode(src, alt, imagePosition, scale, maxHeight);
	}
});

// Utility functions used by resources-dynamic-handler.js for rendering the Resources page.

/* exported filterResources, createPagination */

/*
 * Filter the data set for records that satisfy one or more of the following criteria,
 * - at least one topic in the selected topics
 * - at least one type in the selected types
 *
 * If multiple criteria are selected, the intersections of the result sets for each
 * criterion will be returned.
 *
 * @param {Array<Object>} resources - The data set that the filter is performed upon.
 * @param {Object} filterSettings - A collection of data and settings representing the filter selections
 * @param {Array<String>} filterSettings.selectedTopics - An array of topic values to match.
 * @param {Array<String>} filterSettings.selectedTypes - An array of media types to match.
 *
 * @return A subset of the input `dataSet` that satisfy the matching criteria outlined above
 */
function filterResources(resources, filterSettings) { // eslint-disable-line no-unused-vars
	let results = resources;

	if (filterSettings.selectedTopics.length > 0) {
		results = results.filter(oneRecord => oneRecord.topics.some(topic => filterSettings.selectedTopics.indexOf(topic) >= 0));
	}

	if (filterSettings.selectedTypes.length > 0) {
		results = results.filter(oneRecord => oneRecord.types.some(type => filterSettings.selectedTypes.indexOf(type) >= 0));
	}

	return results;
}

/*
 * Chunk (split) the array into smaller arrays with the given chunk size at its most.
 * @param {Array<Anything>} inputArray - The input array to chunk.
 * @param {Number} chunkSize - The size of smaller arrays to chunk to.
 * @return An array of smaller arrays with the given chunk size at its most.
 */
function chunkArray(inputArray, chunkSize) {
	return Array(Math.ceil(inputArray.length / chunkSize)).fill().map((_, index) => index * chunkSize).map(begin => inputArray.slice(begin, begin + chunkSize));
}

/*
 * Create the pagination object for the input data set.
 * @param {Array<Object>} dataArray - The data set to create the pagination object for.
 * @param {Number} pageSize - The number of records on a page.
 * @param {Number} pageInQuery - The current page number.
 * @param {String} hrefTemplate - The href to redirect to when a page number is clicked.
 * @return Generate a pagination object in this data structure: https://www.11ty.dev/docs/pagination/#paging-an-array.
 */
function createPagination(dataArray, pageSize, pageInQuery, hrefTemplate) { // eslint-disable-line no-unused-vars
	const dataInChunk = chunkArray(dataArray, pageSize);
	pageInQuery = pageInQuery ? (parseInt(pageInQuery) > 1 ? parseInt(pageInQuery) : 1) : 1;
	let hrefs = [];
	for (let i = 0; i < dataInChunk.length; i++) {
		hrefs.push(hrefTemplate.replace(':page', i + 1));
	}

	// The pagination data structure follows the Eleventy pagination data structure to make it easier to integrate
	// pagination templates written in nunjucks and vue: https://www.11ty.dev/docs/pagination/#paging-an-array
	const pagination = {
		items: dataInChunk[pageInQuery - 1],
		pageNumber: pageInQuery - 1,
		hrefs: hrefs,
		href: {
			next: hrefs[pageInQuery] ? hrefs[pageInQuery] : null,
			previous: hrefs[pageInQuery - 2] ? hrefs[pageInQuery - 2] : null,
			first: hrefs[0],
			last: hrefs[hrefs.length - 1]
		},
		pages: dataInChunk,
		page: {
			next: dataInChunk[pageInQuery] ? dataInChunk[pageInQuery] : null,
			previous: dataInChunk[pageInQuery - 2] ? dataInChunk[pageInQuery - 2] : null,
			first: dataInChunk[0],
			last: dataInChunk[dataInChunk.length - 1]
		},
		hideProceedingPageButton: pageInQuery !== 2 && pageInQuery !== 3,
		hideFollowingPageButton: pageInQuery !== dataInChunk.length - 1 && pageInQuery !== dataInChunk.length - 2
	};
	return pagination;
}

/*
 * Set the given list of checkbox values to 'checked' state.
 *
 * @param {Object} container - The container that has all checkbox elements
 * @param {String} checkboxPrefix - The prefix of the checkbox name
 * @param {Array} checkedValue - An array of the suffix of the checkbox name that are checked
 */
function renderCheckboxStats(container, checkboxPrefix, checkedValue) { // eslint-disable-line no-unused-vars
	checkedValue.forEach(value => {
		container.querySelector('input[type="checkbox"][name="' + checkboxPrefix + value + '"]').checked = true;
	});
}

/*
 * Set number of applied filters next to the filter header
 *
 *  @param {Object} container - The container within a filter header, where the number should be rendered
 *  @param {String} checkboxPrefix - The prefix of the checkbox name
 */
function renderNumberOfAppliedFilters(container, checkboxPrefix) { // eslint-disable-line no-unused-vars
	const appliedFilter = document.querySelectorAll('.filter-checkbox[name^="' + checkboxPrefix + '"]:checked');
	if (appliedFilter.length > 0) {
		container.innerHTML = '(' + appliedFilter.length + ')';
	} else {
		container.innerHTML = '';
	}
}

/*
 * Remove html tags from the input string.
 * @param {String} inputString - The string to remove html tags.
 * @return The string with html tags removed.
 */
// eslint-disable-next-line
function stripHtmlTags(inputString) {
	return inputString.replace(/<\/?[^>]+(>|$)/g, '');
}

/*
 * Extract text from a html string.
 * @param {String} input - The string to extract text from.
 * @return The extracted text.
 */
function htmlDecode(input) {
	let el = document.createElement('div');
	el.innerHTML = input;
	return el.innerText;
}

/*
 * Process each object in the data set to convert some field value to formats for display.
 * @param {Array<Object>} dataSet - The data set to process.
 * @return The same set of the data set with fields converted.
 */
function processResourcesDisplayResults(inArray) { // eslint-disable-line no-unused-vars
	return inArray.map((oneRecord) => {
		oneRecord.title = htmlDecode(oneRecord.title);
		oneRecord.description = stripHtmlTags(oneRecord.description);
		return oneRecord;
	});
}

/*
 * Render the resources result
 * @param {Array} resources - An array of resources to be rendered.
 * @return directly add the resources html to the content selector.
 */
function renderResources(resources, resourceTopics, resourceTypes) { // eslint-disable-line no-unused-vars
	let resourcesHtml = '';

	resources.forEach(resource => {
		resourcesHtml += `    	<div class='card'>
			<div class='card-detail'>
			<h3 class='card-title'>${resource.title}</h3>
			<div class='card-tags'>
		`;
		if (resource.topics) {
			resource.topics.forEach(topicValue => {
				let found = resourceTopics.find(topicObj => topicObj.value === topicValue);
				resourcesHtml += `    <div class='card-tag'>
					<svg role="presentation"><use xlink:href="#topic" /></svg>
					<p>${found.label}</p>
				</div>`;
			});
		}
		if (resource.types) {
			resource.types.forEach(typeValue => {
				let found = resourceTypes.find(typeObj => typeObj.value === typeValue);
				resourcesHtml += `    <div class='card-tag'>
					<svg role="presentation"><use xlink:href="#type" /></svg>	
					<p>${found.label}</p>
				</div>`;
			});
		}
		resourcesHtml += `
				</div>
				<div class='card-description'>
					<p>${resource.description}</p>
				</div>
				<div class='card-link'><a rel='external'>Visit resource</a></div>
			</div>
			<div class='card-image'></div>
		</div>`;
	});

	document.querySelector('.resources-result').innerHTML = resourcesHtml;
}

/*
 * Render the pagination.
 * @param {Object} pagination - A pagination object to be rendered.
* @return directly add the pagiination html to the pagination selector.
  */
function renderPagination(pagination) { // eslint-disable-line no-unused-vars
	let paginationHtml = `
	<h2 id='pagination' class='visually-hidden'>resources page navigation</h2>
		<ul class='container'>`;

	if (pagination.href.previous) {
		paginationHtml += `
			<li><a href='${ pagination.href.previous }'><svg><use xlink:href='#previous' /></svg><span class='visually-hidden'>previous</span></a></li>`;
	}
	pagination.pages.forEach((page, pageNumber) => {
		paginationHtml += `
			<li><a href='${ pagination.hrefs[pageNumber] }'`;
		if (pagination.pageNumber === pageNumber) {
			paginationHtml += ' aria-current="page"';
		}
		paginationHtml += `>${ pageNumber + 1 }</a></li>`;
	});
	if (pagination.href.next) {
		paginationHtml += `
			<li><a href='${ pagination.href.next }'><svg><use xlink:href='#next' /></svg><span class='visually-hidden'>next</span></a></li>`;
	}
	paginationHtml += `
		</ul>`;
	document.querySelector('.pagination').innerHTML = paginationHtml;
}

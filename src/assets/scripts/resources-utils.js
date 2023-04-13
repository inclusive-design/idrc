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
 * Render filters section with states
 *
 * @param {Array} selectedTopics - An array of the suffix of the topic checkbox name that are checked
 * @param {Array} selectedTypes - An array of the suffix of the type checkbox name that are checked
*/
function renderFilters(selectedTopics, selectedTypes) { // eslint-disable-line no-unused-vars
	const sections = ['topics', 'types'];
	for (const section of sections) {
		// When the page is not initially rendered like page is refreshed or search is done
		// make sure that filter sections are expanded/collapsed as it was before
		const expandButton = document.querySelector(`#filterHeader-${section}`);
		if (expandButton) {
			expandButton.setAttribute('aria-expanded', localStorage.getItem(section));
		}
		const filterBodySelector = `#filterBody-${section}`;
		const filter = $(expandButton).siblings(filterBodySelector);
		filter[localStorage.getItem(section) === 'false' ? 'hide' : 'show']();
		// add checked states for resourceTopics and media types
		if (section === 'topics') {
			renderCheckboxStats(document.querySelector('#filterBody-topics'), 'to_', selectedTopics);
			renderNumberOfAppliedFilters(document.querySelector('#filter-topics'), 'to_');
		} else {
			renderCheckboxStats(document.querySelector('#filterBody-types'), 'ty_', selectedTypes);
			renderNumberOfAppliedFilters(document.querySelector('#filter-types'), 'ty_');
		}
	}
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
	container.innerHTML = appliedFilter.length > 0 ? '(' + appliedFilter.length + ')' : '';
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
 * Process each resource in the resources to convert some field value to be formated for display.
 * By default, the resources to be displayed are sorted by publishedYear.
 * @param {Array<Object>} resources - An array of resources to be processed.
 * @return sorted resources with fields converted.
 */
function processResourcesDisplayResults(resources) { // eslint-disable-line no-unused-vars
	const sortedArray = [];
	const resultsWithPublishedYear = resources.filter(result => result.publishedYear);
	const resultsWithoutPublishedYear = resources.filter(result => !result.publishedYear);
	resultsWithPublishedYear.sort((a, b) => {
		let compare = b.publishedYear.localeCompare(a.publishedYear);
		if (compare === 0) {
			compare = a.title.localeCompare(b.title);
		}
		return compare;
	});
	resultsWithoutPublishedYear.sort((a, b) => (a.title.localeCompare(b.title)));

	sortedArray.push(...resultsWithPublishedYear, ...resultsWithoutPublishedYear);

	return sortedArray.map((oneRecord) => {
		oneRecord.title = htmlDecode(oneRecord.title);
		oneRecord.description = stripHtmlTags(oneRecord.description);
		return oneRecord;
	});
}

/*
 * Render the applied filters
 * @param {Integer} numberOfResources - number of resources to be rendered.
 * @return directly add the applied filter html to the content selector.
 */
function renderSearchResults(numberOfResources, resourceTopics, resourceTypes) { // eslint-disable-line no-unused-vars
	const appliedFilters = document.querySelectorAll('.filter-checkbox:checked');
	let appliedFilterHtml = '<h2>Search results</h2><div class=\'resources-applied-filters\'>';

	if (numberOfResources === 0) {
		appliedFilterHtml += '<div class=\'resources-no-results\'><p>Sorry, no results were found based on your applied filters.</p></div>';
	} else {
		appliedFilterHtml += `<div class='resources-filtered-number' role='alert'><p>Showing ${numberOfResources} ${numberOfResources === 1 ? 'result' : 'results'}</p></div>`;
	}

	appliedFilterHtml += '<h3>Applied filters</h3><div class=\'filter-tags\'>';

	for (const appliedFilter of appliedFilters) {
		const tagType = resourceTopics.find(topicObj => topicObj.value === appliedFilter.id) ? 'topic' : 'type';
		let filterLabel = '';
		if (tagType === 'topic') {
			filterLabel = resourceTopics.find(topicObj => topicObj.value === appliedFilter.id).label;
		} else if (tagType === 'type') {
			filterLabel = resourceTypes.find(typeObj => typeObj.value === appliedFilter.id).label;
		}

		const params = new URLSearchParams(window.location.search);
		params.delete(appliedFilter.name);

		appliedFilterHtml += `<button aria-label='Remove the filtering on a resource ${tagType} ${filterLabel}' id='filterTag-${appliedFilter.id}' class='filter-tag' onClick="window.location.href='${window.location.href.split('?')[0]}?${params.toString()}'">
			<svg role='presentation'><use xlink:href='#${tagType}' /></svg>
			<p>${filterLabel}</p>
			<svg role='presentation'><use xlink:href='#close' /></svg>
		</button>`;
	}

	appliedFilterHtml += `
			<div class='filter-clear-all'>
				<button class='reset-button'>Clear all filters</button>
			</div>
		</div>
	</div>`;

	document.querySelector('.content').innerHTML = appliedFilterHtml;
}

/*
 * Render the resources result
 * @param {Array} resources - An array of resources to be rendered.
 * @return directly add the resources html to the content selector.
 */
function renderResources(resources, resourceTopics, resourceTypes) { // eslint-disable-line no-unused-vars
	const hostURL = window.location.host;
	let resourcesHtml = '<div class="resources-result">';

	resources.forEach(resource => {
		const resourceLink = document.createElement('a');
		resourceLink.href = resource.link;
		resourcesHtml += `    	<div class='card'>
			<div class='card-detail'>
			<h3 class='card-title'>${escapeSpecialCharactersForHTML(resource.title)}</h3>
			<div class='card-tags'>
		`;
		if (resource.topics) {
			resource.topics.forEach(topicValue => {
				let found = resourceTopics.find(topicObj => topicObj.value === topicValue);
				resourcesHtml += `    <div class='card-tag'>
					<svg role='presentation'><use xlink:href='#topic' /></svg>
					<p>${found.label}</p>
				</div>`;
			});
		}
		if (resource.types) {
			resource.types.forEach(typeValue => {
				let found = resourceTypes.find(typeObj => typeObj.value === typeValue);
				resourcesHtml += `    <div class='card-tag'>
					<svg role='presentation'><use xlink:href='#type' /></svg>	
					<p>${found.label}</p>
				</div>`;
			});
		}
		const altText = resource.thumbnailAltText ? escapeSpecialCharactersForHTML(resource.thumbnailAltText) : `Thumbnail image for ${escapeSpecialCharactersForHTML(resource.title)}`;
		resourcesHtml += `
				</div>
				<div class='card-description'>
					<p>${escapeSpecialCharactersForHTML(resource.description)}</p>
				</div>
				${resource.publishedYear ? `<div class="card-publishedYear"><p>Published in ${escapeSpecialCharactersForHTML(resource.publishedYear)}</p></div>` : ''}
				<div class='card-link'><a rel='external' href='${resource.link}'>Visit ${escapeSpecialCharactersForHTML(resource.title)}${resourceLink.host === hostURL ? '' : '<svg role=\'presentation\'><use xlink:href=\'#external\' /></svg>'}</a></div>
				</div>
				${resource.thumbnailImage ? `<div class='card-image'><img src=${resource.thumbnailImage} alt='${replaceSingleQuote(altText)}'></div>` : ''}
			</div>`;
	});

	resourcesHtml += '</div>';

	document.querySelector('.content').innerHTML += resourcesHtml;
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

/*
* Set bind event listeners to the filter components
*/
function bindEventListeners() { // eslint-disable-line no-unused-vars
	// Clicking the expand button on the filter header opens/closes the filter
	const expandButtons = document.querySelectorAll('.filter-expand-button');

	for (let i = 0; i < expandButtons.length; i++) {
		// Add event listener for expand buttons
		expandButtons[i].addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			const currentExpandedValue = expandButtons[i].getAttribute('aria-expanded');
			const expandedState = currentExpandedValue === 'true' ? 'false' : 'true';
			const filterType = expandButtons[i].getAttribute('id').split('-')[1];
			expandButtons[i].setAttribute('aria-expanded', expandedState);
			expandButtons[i].setAttribute('aria-label', `${expandedState === 'true' ? 'collapse' : 'expand'} the ${filterType} filter`);

			// Store expanded status into local storage, so that expanded status for specific filter section is remembered.
			localStorage.setItem(filterType, expandedState);

			// Open/close the appropriate filter
			// Find the filter body by using its position relative to the button as well as the css selector
			// since there are two elements that match the selector (one each for static the and dynamic views).
			// Clicking on one of expand buttons only opens the form that this button corresponds to.
			const filterBodySelector = `#filterBody-${filterType}`;
			const filter = $(expandButtons[i]).siblings(filterBodySelector);
			filter[expandedState === 'false' ? 'hide' : 'show']();
		});
	}


	// Clicking 'reset filter' button redirects the page to the initial state without search term and filtering conditions
	if (document.querySelector('.reset-button') != null) {
		document.querySelector('.reset-button').addEventListener('click', () => {
			localStorage.setItem('setFocusOn', '.apply-button');
			window.location = '/resources';
		});
	}

	// Clicking 'apply filter' button redirects the page with applied filter options
	 document.querySelector('.apply-button').addEventListener('click', () => {
		localStorage.setItem('setFocusOn', '.apply-button');
	});

	// Save element to focus after a filer option is removed by clicking on applied filter options
	for (const filterTag of document.querySelectorAll('.filter-tag')) {
		filterTag.addEventListener('click', () => {
			const filter = $(filterTag);
			if (filter.prev().length > 0) {
				localStorage.setItem('setFocusOn', `#${filter.prev()[0].getAttribute('id')}`);
			} else {
				localStorage.setItem('setFocusOn', `#${filter.next()[0].getAttribute('id')}`);
			}
		});
	}
}

/*
 * Set focus back on items before the refresh by filter changes
*/
function restoreFocus() { // eslint-disable-line no-unused-vars
	if (localStorage.getItem('setFocusOn')) {
		const focusElement = document.querySelector(localStorage.getItem('setFocusOn'));
		if (focusElement && focusElement.focus) {
			focusElement.focus();
		}
		localStorage.removeItem('setFocusOn');
	}
}

/*
 * Replace special characters with their entity name
*/
function escapeSpecialCharactersForHTML(htmlStr) {
	htmlStr.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
	return htmlStr;
}

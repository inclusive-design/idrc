// The main process that dynamically renders the Resources page.

/* global createPagination, processResourcesDisplayResults, filterResources, renderCheckboxStats, renderNumberOfAppliedFilters, renderResources, renderPagination */

const pageSize = 10;
const params = new URLSearchParams(window.location.search);
let pageInQuery = params.get('page');

// Get selected resource topics and types to filter
let selectedTopics = [];
let selectedTypes = [];

for (let p of params) {
	let queryKeyPrefix = p[0].substr(0, 3); // only need to check the first two characters
	let queryKeyWithoutPrefix = p[0].substr(3);

	if (queryKeyPrefix !== 'pag') { // if it's not page number...
		switch (queryKeyPrefix) {
		case 'to_': // topics
			selectedTopics.push(queryKeyWithoutPrefix);
			break;
		case 'ty_': // types
			selectedTypes.push(queryKeyWithoutPrefix);
			break;
		}
	}
}

// The main search process
fetch(window.location.origin + '/resourceData.json').then(function (response) {
	response.json().then(function (resourcesData) {
		let results = resourcesData.resources,
			isInitialRender = true,
			pagination, resultsToDisplay;
		if (selectedTopics.length > 0 || selectedTypes.length > 0) {
			// Perform search and filter
			isInitialRender = false;

			// Filter by selected resource topics or types
			let filterSettings = {
				selectedTopics: selectedTopics || [],
				selectedTypes: selectedTypes || []
			};

			results = filterResources(results, filterSettings);
		}

		// Convert some values to formats that can be displayed
		if (results.length > 0) {
			results = processResourcesDisplayResults(results);
		}

		// the 'filter' call is to ignore empty query strings
		let filterQuery = [
			selectedTopics.map(tag => 'to_' + tag + '=on').join('&'),
			selectedTypes.map(type => 'ty_' + type + '=on').join('&')
		].filter(query => query).join('&');

		// Paginate search results
		if (results.length > pageSize) {
			pagination = createPagination(results, pageSize, pageInQuery, '/resources/?' + filterQuery + '&page=:page');
		}

		// selectedTopics = resourcesData.resourceTopics.filter(tag => selectedTopics.includes(tag.value));
		resultsToDisplay = pagination ? pagination.items : results;
		if (!isInitialRender) {
			// When the page is not initially rendered like page is refreshed or search is done
			// make sure that filter sections are expanded/collapsed as it was before
			for (const expandButton of document.querySelectorAll('.filter-expand-button')) {
				const section = expandButton.dataset.section;
				if (section != null) {
					expandButton.setAttribute('aria-expanded', localStorage.getItem(section));
				}
				const filterBodySelector = '.filter-section[data-section=\'' + section + '\']';
				const filter = $(expandButton).parent().siblings(filterBodySelector);
				filter[localStorage.getItem(section) === 'false' ? 'hide' : 'show']();
			}
			// add checked states for resourceTopics and media types
			renderCheckboxStats(document.querySelector('.filter-section[data-section="topics"]'), 'to_', selectedTopics);
			renderNumberOfAppliedFilters(document.querySelector('#filter-topics'), 'to_');
			renderCheckboxStats(document.querySelector('.filter-section[data-section="types"]'), 'ty_', selectedTypes);
			renderNumberOfAppliedFilters(document.querySelector('#filter-types'), 'ty_');
		}
		renderResources(resultsToDisplay, resourcesData.resourceTopics, resourcesData.resourceTypes);
		if (pagination) {
			renderPagination(pagination);
		}
	});
});

// Clicking the expand button on the filter header opens/closes the filter
const expandButtons = document.querySelectorAll('.filter .filter-expand-button');

for (let i = 0; i < expandButtons.length; i++) {
	// Add event listener for expand buttons
	expandButtons[i].addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		const currentExpandedValue = expandButtons[i].getAttribute('aria-expanded');
		const expandedState = currentExpandedValue === 'true' ? 'false' : 'true';
		expandButtons[i].setAttribute('aria-expanded', expandedState);
		// Store expanded status into local storage, so that expanded status for specific
		// filter section is remembered.
		if (e.target.dataset.section) {
			localStorage.setItem(e.target.dataset.section, expandedState);
		}

		// Open/close the appropriate filter
		// Find the filter body by using its position relative to the button as well as the css selector
		// since there are two elements that match the selector (one each for static the and dynamic views).
		// Clicking on one of expand buttons only opens the form that this button corresponds to.
		const filterBodySelector = '.filter-section[data-section=\'' + expandButtons[i].dataset.section + '\']';
		const filter = $(expandButtons[i]).parent().siblings(filterBodySelector);
		filter[expandedState === 'false' ? 'hide' : 'show']();
	});
}

// clicking a filter header opens/closes the corresponding filter. It behaves the same as clicking the corresponding
// expand/collapse button.
const filterHeaders = document.querySelectorAll('.filter .filter-header');

for (let i = 0; i < filterHeaders.length; i++) {
	filterHeaders[i].addEventListener('click', () => {
		$(filterHeaders[i]).find('.filter-expand-button').click();
	});
}

// Clicking 'reset filter' buttons redirects the page to the initial state without search term and filtering conditions
// document.querySelector('.reset-button').addEventListener('click', () => {
// 	window.location = '/resources';
// });


// Add change event listener to each checkbox, so that can trigger update to
// number of applied filters to the filter header
const filterCheckboxes = document.querySelectorAll('.filter-checkbox');

for (const checkbox of filterCheckboxes) {
	checkbox.addEventListener('change', () => {
		const checkboxPrefix = checkbox.name.split('_')[0] + '_';
		if (checkboxPrefix && checkbox.dataset.filter) {
			renderNumberOfAppliedFilters(document.querySelector('#filter-' + checkbox.dataset.filter), checkboxPrefix);
		}
	});
}

// The main process that dynamically renders the Resources page.

import { createPagination, processResourcesDisplayResults, filterResources, renderFilters, renderNumberOfAppliedFilters, renderSearchResults, renderResources, renderPagination, bindEventListeners, restoreFocus } from './_resources-utils.js';

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

		resultsToDisplay = pagination ? pagination.items : results;
		if (!isInitialRender) {
			renderFilters(selectedTopics, selectedTypes);
		}
		if (filterQuery) {
			renderSearchResults(resultsToDisplay.length, resourcesData.resourceTopics, resourcesData.resourceTypes);
		}
		renderResources(resultsToDisplay, resourcesData.resourceTopics, resourcesData.resourceTypes);
		if (pagination) {
			renderPagination(pagination);
		}

		restoreFocus();
		bindEventListeners();
	});
});

// Add change event listener to each checkbox, so that can trigger update to number of applied filters to the filter header.
// Note that this bind listeners are outside of the fetch function, because rendering of filters are not dynamic and
// doesn't rely on the fetch of resources data to complete.
for (const checkbox of document.querySelectorAll('.filter-checkbox')) {
	checkbox.addEventListener('change', () => {
		const checkboxPrefix = checkbox.name.split('_')[0] + '_';
		if (checkboxPrefix && checkbox.dataset.filter) {
			renderNumberOfAppliedFilters(document.querySelector('#filter-' + checkbox.dataset.filter), checkboxPrefix);
		}
	});
}

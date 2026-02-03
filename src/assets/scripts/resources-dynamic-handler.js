// The main process that dynamically renders the Resources page.

import {
	createPagination,
	processResourcesDisplayResults,
	filterResources,
	renderFilters,
	renderNumberOfAppliedFilters,
	renderSearchResults,
	renderSortUI,
	renderResources,
	renderPagination,
	bindEventListeners,
	restoreFocus,
} from './_resources-utilities.js';

const pageSize = 10;
const parameters = new URLSearchParams(globalThis.location.search);
const pageInQuery = parameters.get('page');

// Get selected resource topics and types to filter
const selectedTopics = [];
const selectedTypes = [];

for (const p of parameters) {
	const queryKeyPrefix = p[0].slice(0, 3); // Only need to check the first two characters
	const queryKeyWithoutPrefix = p[0].slice(3);

	if (queryKeyPrefix !== 'pag') { // If it's not page number...
		if (queryKeyPrefix === 'to_') { // Topics
			selectedTopics.push(queryKeyWithoutPrefix);
		}

		if (queryKeyPrefix === 'ty_') { // Types
			selectedTypes.push(queryKeyWithoutPrefix);
		}
	}
}

// The main search process
fetch(globalThis.location.origin + '/resourceData.json').then(response => {
	response.json().then(resourcesData => {
		let results = resourcesData.resources;
		let isInitialRender = true;
		let pagination;
		if (selectedTopics.length > 0 || selectedTypes.length > 0) {
			// Perform search and filter
			isInitialRender = false;

			// Filter by selected resource topics or types
			const filterSettings = {
				selectedTopics: selectedTopics || [],
				selectedTypes: selectedTypes || [],
			};

			results = filterResources(results, filterSettings);
		}

		// Convert some values to formats that can be displayed
		if (results.length > 0) {
			results = processResourcesDisplayResults(results);
		}

		// The 'filter' call is to ignore empty query strings
		const filterQuery = [
			selectedTopics.map(tag => `to_${tag}=on`).join('&'),
			selectedTypes.map(type => `ty_${type}=on`).join('&'),
		].filter(Boolean).join('&');

		// Paginate search results
		if (results.length > pageSize) {
			pagination = createPagination(results, pageSize, pageInQuery, '/resources/?' + filterQuery + '&page=:page');
		}

		const resultsToDisplay = pagination ? pagination.items : results;
		if (!isInitialRender) {
			renderFilters(selectedTopics, selectedTypes);
		}

		if (filterQuery) {
			renderSearchResults(resultsToDisplay.length, resourcesData.resourceTopics, resourcesData.resourceTypes);
		}

		renderSortUI();
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
		const checkboxPrefix = `${checkbox.name.split('_')[0]}_`;
		if (checkboxPrefix && checkbox.dataset.filter) {
			renderNumberOfAppliedFilters(document.querySelector('#filter-' + checkbox.dataset.filter), checkboxPrefix);
		}
	});
}

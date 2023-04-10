// The main process that dynamically renders the Resources page.

/* global createPagination, processResourcesDisplayResults, filterResources, renderFilters, renderSearchResults, renderResources, renderPagination, restoreFocus*/

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
				expandButtons[i].setAttribute('aria-label', `${expandedState === 'true' ? "collapse" : "expand"} the ${filterType} filter`);
				
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
		if (filterQuery) {
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
			filterTag.addEventListener('click', (e) => {
				const filter = $(filterTag);
				if (filter.prev().length > 0) {
					localStorage.setItem('setFocusOn', `#${filter.prev()[0].getAttribute('id')}`);
				} else {
					localStorage.setItem('setFocusOn', `#${filter.next()[0].getAttribute('id')}`);
				}
			});
		}

		restoreFocus();
		
	});
});

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

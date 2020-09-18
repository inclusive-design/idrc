/* eslint camelcase: ["error", {properties: "never"}] */

const backstop = require('backstopjs');

const config = require('../fixtures/backstop.config.js');

/**
 * Run BackstopJS as code
 * Scenarios and Report folder name can be set via params
*/
function backstopExec(payload, refreshReferences = true) {
	payload = {
		scenarios: [],
		folder: 'default',
		...payload
	};

	return new Promise(resolve => {
		const configuration = config;
		// Config.scenarios = payload.scenarios
		config.paths.html_report = `cypress/reports/backstop/${payload.folder}/html_report`;
		config.paths.json_report = `cypress/reports/backstop/${payload.folder}/json_report`;

		if (refreshReferences) {
			backstop('reference', {config: configuration, docker: true}).then(() => {
				resolve(null);
			}).catch(() => {
				resolve(null);
			});
		} else {
			backstop('test', {config: configuration, docker: true}).then(() => {
				resolve(null);
			}).catch(() => {
				resolve(null);
			});
		}
	});
}

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => { // eslint-disable-line no-unused-vars
	backstop('init');
	on('task', {
		log(message) { // eslint-disable-line react/function-component-definition
			console.log(message);
			return null;
		},
		backstopRefreshReferences(config) {
			return backstopExec(config);
		},
		backstopTest(config) {
			return backstopExec(config, false);
		}
	});
};

import {env} from 'node:process';

const segment = () => (Math.trunc(((1 + Math.random()) * 0x1_00_00))).toString(16).slice(1);

export default {
	random() {
		return `${segment()}-${segment()}-${segment()}`;
	},
	baseUrl: env.CONTEXT === 'production' ? 'https://idrc.ocadu.ca' : env.DEPLOY_PRIME_URL || 'http://localhost:3000',
	context: env.CONTEXT === 'production' ? 'production' : 'development',
	environment: env.NODE_ENV,
};

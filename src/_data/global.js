module.exports = {
	random() {
		const segment = () => {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).slice(1);
		};

		return `${segment()}-${segment()}-${segment()}`;
	},
	baseUrl: process.env.CONTEXT === 'production' ? 'https://idrc.ocadu.ca' : process.env.DEPLOY_PRIME_URL || 'http://localhost:3000',
	context: process.env.CONTEXT === 'production' ? 'production' : 'development',
	environment: process.env.ELEVENTY_ENV
};

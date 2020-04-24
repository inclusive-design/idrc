module.exports = {
	random() {
		const segment = () => {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).slice(1);
		};

		return `${segment()}-${segment()}-${segment()}`;
	},
	baseUrl: process.env.DEPLOY_PRIME_URL || 'http://localhost:3000',
	environment: process.env.ELEVENTY_ENV
};

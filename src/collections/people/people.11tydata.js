
export default {
	eleventyComputed: {
		permalink(data) {
			if (!data.sections || data.sections.length === 0) {
				return false;
			}

			return `/about/team/${data.page.fileSlug}/`;
		},
	},
};

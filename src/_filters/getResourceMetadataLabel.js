import resourceTopics from "../_data/resourceTopics.json";
import resourceTypes from "../_data/resourceTypes.json";

/**
 * Gets the resource metadata label for a given tag value
 *
 * -@param {String} metadataValue The value of the metadata to search for
 * -@param {String} metadataType The metadata type
 * -@returns {String} The metadata's label
 */

module.exports = (metadataValue, metadataType) => {
    let metadataLabel = "";
    let metadata = [];

    switch (metadataType) {
    case ("topics"): metadata = resourceTopics.resourceTopics;
        break;
    case ("types"): metadata = resourceTypes.resourceTypes;
        break;
    default:
        break;
    }

    metadata.forEach(data => {
        const found = metadata.find(() => data.value === metadataValue);

        if (found) {
            metadataLabel = data.label;
            return;
        }
    });

    return metadataLabel;
};

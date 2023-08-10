/* eslint-disable no-unused-vars, no-console */

module.exports = async (page, scenario, vp) => {
    console.log("SCENARIO > " + scenario.label);
    await require("./clickAndHoverHelper")(page, scenario);

    // Eagerly load images which would normally be lazy-loaded.
    page.evaluate(async () => {
        document.querySelectorAll("[loading=\"lazy\"]").forEach((elem) => {
            elem.loading = "eager";
        });
    });
};

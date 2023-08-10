/* eslint-disable no-unused-vars */

module.exports = async (page, scenario, vp) => {
    await require("./loadCookies")(page, scenario);
};

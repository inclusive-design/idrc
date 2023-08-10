

module.exports = {
    extends: [
        "fluid",
        "plugin:yml/standard",
        "plugin:react/recommended"
    ],
    ignorePatterns: ["_site/", "src/_locales/messages.js", "!.*.cjs", "!.*.js"],
    env: {
        amd: true,
        browser: true,
        node: true,
        es6: true
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module"
    },
    settings: {
        react: {
            version: "16"
        }
    }
};



module.exports = {
    extends: [
        "fluid",
        "plugin:yml/standard",
        "plugin:react/recommended",
        "plugin:markdown/recommended"
    ],
    ignorePatterns: ["_site/", "src/_locales/messages.js", "!.*.cjs", "!.*.js", "!.github/"],
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
    overrides: [
        {
            files: ["**/*.md"],
            processor: "markdown/markdown"
        }
    ],
    settings: {
        react: {
            version: "16"
        }
    }
};

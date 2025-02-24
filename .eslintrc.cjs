

module.exports = {
    extends: [
        "fluid",
        "plugin:markdown/recommended-legacy",
        "plugin:yml/standard"
    ],
    ignorePatterns: ["backstop_data", "_site/", "src/_locales/messages.js", "!.*.cjs", "!.*.js", "!.github/"],
    env: {
        amd: true,
        browser: true,
        node: true,
        es6: true
    },
    parser: "@babel/eslint-parser",
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        requireConfigFile: false,
        "babelOptions": {
            "plugins": [
                "@babel/plugin-syntax-import-assertions"
            ]
        }
    },
    overrides: [
        {
            files: ["**/*.md"],
            processor: "markdown/markdown"
        },
        {
            files: ["*.yaml", "*.yml"],
            parser: "yaml-eslint-parser"
        }
    ]
};

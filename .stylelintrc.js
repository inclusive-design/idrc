

module.exports = {
    extends: ["stylelint-config-fluid", "stylelint-config-standard-scss"],
    customSyntax: "postcss-scss",
    plugins: ["stylelint-use-logical-spec"],
    ignoreFiles: ["_site/**/*.{css,scss}"],
    rules: {
        "no-descending-specificity": null,
        "custom-property-pattern": null,
        "import-notation": "string",
        "selector-class-pattern": null,
        "liberty/use-logical-spec": [
            "always",
            { except: ["float", "top", "left", "right", "bottom"] }
        ]
    }
};

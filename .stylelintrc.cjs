

module.exports = {
    extends: ["stylelint-config-fluid"],
    plugins: ["stylelint-use-logical-spec"],
    ignoreFiles: ["_site/**/*.css"],
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

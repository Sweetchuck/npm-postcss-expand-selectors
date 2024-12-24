import globals from "globals";

export default [
    {
        languageOptions: {
            globals: {
                ...globals.jest,
            },
        },

        rules: {
            indent: ["error", 4],
            "max-len": ["error", 120],

            "prefer-const": [
                "error",
                {
                    destructuring: "any",
                    ignoreReadBeforeAssign: false,
                },
            ],

            "perfectionist/sort-objects": 0,
            "prefer-let/prefer-let": 0,
            "es5/no-block-scoping": 0,
            "func-style": 0,

            "space-before-function-paren": [
                "error",
                {
                    anonymous: "always",
                    named: "never",
                    asyncArrow: "never",
                },
            ],

            semi: ["error", "always"],
        },
    },
];

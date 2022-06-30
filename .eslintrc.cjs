module.exports = {
    "env": {
        "es6": true,
        "browser": true,
    },
    "extends": [
        "eslint:recommended",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module",
        "tsconfigRootDir": __dirname,
        "project": ["./tsconfig.json"],
        "extraFileExtensions": [".svelte"],
    },
    "overrides": [
        {
            "files": ["*.svelte"],
            "processor": "svelte3/svelte3",
        },
    ],
    "settings": {
        "svelte3/typescript": require("typescript"),
        "svelte3/ignore-styles": () => true,
    },
    "plugins": ["svelte3", "@typescript-eslint"],
    "ignorePatterns": ["node_modules"],
    "rules": {
        "no-extra-semi": [
            "off",
        ],
        "@typescript-eslint/no-extra-semi": [
            "off",
        ],
        "no-explicit-any": [
            "off",
        ],
        "no-undef": [
            "off",
        ],
        "no-await-in-loop": [
            "error",
        ],
        "no-constructor-return": [
            "error",
            true,
        ],
        "block-scoped-var": [
            "error",
        ],
        "camelcase": [
            "error",
            {
                "properties": "always",
            },
        ],
        "default-case": [
            "error",
        ],
        "dot-notation": [
            "error",
            {
                "allowKeywords": true,
            },
        ],
        "eqeqeq": [
            "error",
            "always",
        ],
        "func-style": [
            "error",
            "declaration",
            {
                "allowArrowFunctions": true,
            },
        ],
        "no-confusing-arrow": [
            "error",
            {
                "allowParens": true,
            },
        ],
        "no-floating-decimal": [
            "error",
        ],
        "no-lonely-if": [
            "error",
        ],
        "no-param-reassign": [
            "error",
            {
                "props": true,
            },
        ],
        "no-return-await": [
            "error",
        ],
        "no-var": [
            "error",
        ],
        "prefer-arrow-callback": [
            "error",
            {
                "allowNamedFunctions": true,
                "allowUnboundThis": true,
            },
        ],
        "prefer-const": [
            "error",
            {
                "destructuring": "all",
                "ignoreReadBeforeAssign": true,
            },
        ],
        "require-await": [
            "error",
        ],
        "spaced-comment": [
            "error",
            "always",
        ],
        "yoda": [
            "error",
            "never",
        ],
        "array-bracket-spacing": [
            "error",
            "always",
        ],
        "array-element-newline": [
            "error",
            {
                "multiline": true,
                "minItems": 2,
            },
        ],
        "arrow-spacing": [
            "error",
            {
                "before": true,
                "after": true,
            },
        ],
        "brace-style": [
            "error",
            "1tbs",
            {
                "allowSingleLine": true,
            },
        ],
        "comma-dangle": [
            "error",
            "always-multiline",
        ],
        "comma-spacing": [
            "error",
            {
                "before": false,
                "after": true,
            },
        ],
        "eol-last": [
            "error",
            "never",
        ],
        "func-call-spacing": [
            "error",
            "never",
        ],
        "implicit-arrow-linebreak": [
            "error",
            "beside",
        ],
        "indent": [
            "error",
            4,
        ],
        "jsx-quotes": [
            "error",
            "prefer-double",
        ],
        "key-spacing": [
            "error",
            {
                "beforeColon": false,
                "afterColon": true,
                "mode": "strict",
            },
        ],
        "keyword-spacing": [
            "error",
            {
                "before": true,
                "after": true,
            },
        ],
        "line-comment-position": [
            "error",
            {
                "position": "above",
            },
        ],
        "lines-between-class-members": [
            "error",
            "always",
        ],
        "newline-per-chained-call": [
            "error",
            {
                "ignoreChainWithDepth": 2,
            },
        ],
        "no-extra-parens": [
            "error",
            "all",
        ],
        "no-mixed-spaces-and-tabs": [
            "error",
            "smart-tabs",
        ],
        "no-multi-spaces": [
            "error",
            {
                "ignoreEOLComments": true,
            },
        ],
        "no-trailing-spaces": [
            "error",
            {
                "skipBlankLines": true,
            },
        ],
        "no-whitespace-before-property": [
            "error",
        ],
        "object-curly-spacing": [
            "error",
            "always",
        ],
        "object-property-newline": [
            "error",
            {
                "allowMultiplePropertiesPerLine": false,
            },
        ],
        "quotes": [
            "error",
            "double",
        ],
        "semi": [
            "error",
            "always",
        ],
        "semi-spacing": [
            "error",
            {
                "before": false,
                "after": true,
            },
        ],
    },
};
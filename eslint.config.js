const babelParser = require("@babel/eslint-parser");
const globals = require("globals");
const js = require("@eslint/js");
const reactPlugin = require("eslint-plugin-react");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const jsxA11yPlugin = require("eslint-plugin-jsx-a11y");
const importPlugin = require("eslint-plugin-import");

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      parser: babelParser,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        global: "readonly",
        h: "readonly",
        Fragment: "readonly"
      },
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        requireConfigFile: false,
        babelOptions: {
          presets: [
            ["@babel/preset-env", { targets: { node: "current" } }],
            ["@babel/preset-react", { 
              pragma: "h", 
              pragmaFrag: "Fragment",
              development: false,
              useBuiltIns: true
            }]
          ],
          plugins: [
            ["@babel/plugin-transform-react-jsx", { 
              pragma: "h", 
              pragmaFrag: "Fragment" 
            }]
          ]
        },
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      import: importPlugin,
    },
    rules: {
      // React/JSX rules - kluczowe dla wykrywania użycia komponentów
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/display-name": "off",
      "react/jsx-key": "off",
      "react/no-unknown-property": ["error", { "ignore": ["class"] }],
      
      // Import rules
      "import/no-unused-modules": "off",
      "import/no-unresolved": "off",
      "import/extensions": "off",
      
      // Podstawowe rules
      "no-unused-vars": [
        "error",
        {
          "vars": "all",
          "args": "after-used",
          "ignoreRestSiblings": true,
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ],
      
      // Style rules
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "comma-spacing": ["error", { "before": false, "after": true }],
      "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
      "indent": ["error", 2, { "SwitchCase": 1 }],
      "max-len": ["error", { 
        "code": 120,
        "tabWidth": 2,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true
      }],
      
      // Relaxed rules
      "no-console": "warn",
      "no-debugger": "error",
      "no-undef": "error",
      "prefer-const": "error",
      "no-var": "error",
      "arrow-spacing": "error",
      "comma-dangle": ["error", "never"],
      "no-trailing-spaces": "error",
      "eol-last": "error",
      "no-multiple-empty-lines": ["error", { "max": 2 }],
      
      // Wyłącz problematyczne rules
      "no-use-before-define": "off",
      "no-underscore-dangle": "off",
      "arrow-body-style": "off",
      "prefer-arrow-callback": "off"
    },
    settings: {
      react: {
        version: "detect",
        pragma: "h",
        fragment: "Fragment",
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx"]
        }
      }
    },
  },
  {
    files: ["**/*.test.js", "**/*.spec.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        jest: "readonly"
      },
    },
    rules: {
      "no-console": "off",
      "max-len": "off"
    },
  },
];
# EOSC Portal common

[![Stable library documentation](https://github.com/cyfronet-fid/eosc-portal-common/actions/workflows/deploy-stable.yaml/badge.svg?branch=master)](https://s3.cloud.cyfronet.pl/eosc-portal-common/docs/index.html)
[![Latest library documentation](https://github.com/cyfronet-fid/eosc-portal-common/actions/workflows/deploy-latest.yaml/badge.svg?branch=develop)](https://s3.cloud.cyfronet.pl/eosc-portal-common/latest/docs/index.html)

### Description

Library contains the custom UI components of the EOSC Portal services. Uses the JS scripts, and the SCSS styles for
consistent visualization and events triggering through many services.

### Table of contents

- [Requirements](#requirements)
- [Bucket policy update](#bucket-policy-update)
- [Dependencies installation](#dependencies-installation)
- [Development](#development)
- [Building](#building)
- [Prerequisites](#prerequisites)
- [Quickstart](#quickstart)
- [Library instances URLs](#library-instances-urls)
  - [Stable library instance](#stable-library-instance)
  - [Latest library instance](#latest-library-instance)
  - [Pull Request library instance](#pull-request-library-instance)
- [How to contribute](#how-to-contribute)

### Requirements

Only for build purposes

- nodejs >= 20.19.3 LTE

### Bucket policy update
Sometimes reading files may not work. To fix the issue run [Update bucket policy workflow](https://github.com/cyfronet-fid/eosc-portal-common/actions/workflows/update-bucket-policy.yaml)

### Dependencies installation

```bash
yarn install
```

### Development

- [Install dependencies](#dependencies-installation)
- Run site locally with the custom components
  > Browser will be opened at http://localhost:3000/documentation/index.html
  ```bash
  yarn start
  ```
- Provided changes in `.jsx` and `.scss` files will re-render the docs page

### Building

Building process produce `*.min.js`, `*.min.css` files into `dist` folder by default

**Params**

- production
  > Flag. When added library will be:
  >
  > - uglified
  > - optimized with bundle size
  > - source maps (help in debugging for developers) won't be added
- env
  > A relative path to a configuration

Examples

```bash
gulp build --mode development --env env/env.production.js
```

### Prerequisites

You'll need to know a bit of HTML and JS. For refresher see [HTML tutorial](https://www.w3schools.com/html/)
or [JS tutorial](https://www.w3schools.com/js/default.asp).

### Quickstart

Components can be rendered using CSS class, CSS id or HTML tags. HTML tags can be written in snake or camel case.

Simple page with custom components

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  </head>
  <body>
    <eosc-common-main-header
      username="name surname"
      login-url="https://marketplace.sandbox.eosc-beyond.eu/users/auth/checkin"
      logout-url="https://marketplace.sandbox.eosc-beyond.eu/users/logout"
    ></eosc-common-main-header>
    <EoscCommonMainFooter></EoscCommonMainFooter>

    <script src="https://s3.cloud.cyfronet.pl/eosc-portal-common/index.production.min.js"></script>
    <link rel="stylesheet" href="https://s3.cloud.cyfronet.pl/eosc-portal-common/index.production.min.css" />
  </body>
</html>
```

Attaching only specific component from the [list](https://s3.cloud.cyfronet.pl/eosc-portal-common/docs/index.html)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  </head>
  <body>
    <eosc-common-main-header
      username="name surname"
      login-url="https://marketplace.sandbox.eosc-beyond.eu/users/auth/checkin"
      logout-url="https://marketplace.sandbox.eosc-beyond.eu/users/logout"
    ></eosc-common-main-header>

    <script src="https://s3.cloud.cyfronet.pl/eosc-portal-common/main-header.production.min.js"></script>
    <link rel="stylesheet" href="https://s3.cloud.cyfronet.pl/eosc-portal-common/main-header.production.min.css" />
  </body>
</html>
```

Using render toolset to dynamically re-render components

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <script src="https://s3.cloud.cyfronet.pl/eosc-portal-common/index.production.min.js"></script>
    <link rel="stylesheet" href="https://s3.cloud.cyfronet.pl/eosc-portal-common/index.production.min.css" />
  </head>
  <body>
    <eosc-common-main-header
      username="name surname"
      login-url="https://marketplace.sandbox.eosc-beyond.eu/users/auth/checkin"
      logout-url="https://marketplace.sandbox.eosc-beyond.eu/users/logout"
    ></eosc-common-main-header>
    <script>
      window.eosccommon.renderMainHeader("eosc-common-main-header");
    </script>
    <EoscCommonMainFooter></EoscCommonMainFooter>
    <script>
      window.eosccommon.renderMainHeader("EoscCommonMainFooter");
    </script>
  </body>
</html>
```

### Library instances URLs

`index.min.js` and `index.mn.css` contains all library components. Other scripts and styles will be named as components.
See full components [list](https://s3.cloud.cyfronet.pl/eosc-portal-common/docs/index.html).

#### Stable library instance

URL base: https://s3.cloud.cyfronet.pl/eosc-portal-common/

Components documentation: https://s3.cloud.cyfronet.pl/eosc-portal-common/docs/index.html

**Examples**

All components

```text
https://s3.cloud.cyfronet.pl/eosc-portal-common/index.production.css
https://s3.cloud.cyfronet.pl/eosc-portal-common/index.production.js
```

Specific component

```text
https://s3.cloud.cyfronet.pl/eosc-portal-common/main-header.development.css
https://s3.cloud.cyfronet.pl/eosc-portal-common/main-header.production.js
```

#### Latest library instance

URL base: https://s3.cloud.cyfronet.pl/eosc-portal-common/latest/

Components documentation: https://s3.cloud.cyfronet.pl/eosc-portal-common/latest/docs/index.html

**Examples**

All components

```text
https://s3.cloud.cyfronet.pl/eosc-portal-common/latest/index.production.css
https://s3.cloud.cyfronet.pl/eosc-portal-common/latest/index.development.js
```

Specific component

```text
https://s3.cloud.cyfronet.pl/eosc-portal-common/latest/main-header.production.css
https://s3.cloud.cyfronet.pl/eosc-portal-common/latest/main-header.development.js
```

#### Pull Request library instance

URL base: https://s3.cloud.cyfronet.pl/eosc-portal-common/pr-<branch-name>

Components documentation: https://s3.cloud.cyfronet.pl/eosc-portal-common/pr-<branch-name>/docs/index.html

**Examples**

All components

```text
https://s3.cloud.cyfronet.pl/eosc-portal-common/pr-other-feature-branch-name/index.production.css
https://s3.cloud.cyfronet.pl/eosc-portal-common/pr-feature-1/index.development.js
```

Specific component

```text
https://s3.cloud.cyfronet.pl/eosc-portal-common/pr-bugfix-2-replace-urls-in-config/main-header.production.css
https://s3.cloud.cyfronet.pl/eosc-portal-common/pr-bugfix-4-fix-rendering/main-header.development.js
```

### How to contribute

1. Go to file you want to edit (for example https://github.com/cyfronet-fid/eosc-portal-common/blob/develop/configurations/configuration.production.json)
2. Click `pen icon`
   ![config](https://user-images.githubusercontent.com/31220811/138041697-ed2af299-65b5-4c2e-9080-5188c92a8b76.png)
3. Provide changes in edition field
   ![edition](https://user-images.githubusercontent.com/31220811/138041903-534a21e1-973a-4d8b-9f48-5139df12ec63.png)
4. Click `Propose changes`
   ![propose changes](https://user-images.githubusercontent.com/31220811/138042013-65286f41-7f58-4788-9432-439d4e0b8649.png)
5. See provided changes and confirm them by clicking `Create pull request`
   ![Provided changes](https://user-images.githubusercontent.com/31220811/138042232-0be21178-25f0-4eb1-94eb-f181e66e338d.png)

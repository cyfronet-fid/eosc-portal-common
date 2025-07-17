### Description

Common EOSC header at top of the application.

### Component URLs

#### stable

https://s3.cloud.cyfronet.pl/eosc-portal-common/main-header.production.css

https://s3.cloud.cyfronet.pl/eosc-portal-common/main-header.production.js

#### latest

https://s3.cloud.cyfronet.pl/eosc-portal-common/latest/main-header.production.css

https://s3.cloud.cyfronet.pl/eosc-portal-common/latest/main-header.production.js

### Rendering examples

Render using class

```html
<div
  class="eosc-common-main-header"
  username="name surname"
  login-url="https://marketplace.sandbox.eosc-beyond.eu/users/auth/checkin"
  logout-url="https://marketplace.sandbox.eosc-beyond.eu/users/logout"
></div>
```

Render using id

**IMPORTANT!!! Only first element with the id will be rendered!**

```html
<div
  id="eosc-common-main-header"
  username="name surname"
  login-url="https://marketplace.sandbox.eosc-beyond.eu/users/auth/checkin"
  logout-url="https://marketplace.sandbox.eosc-beyond.eu/users/logout"
></div>
```

Render using camel case

```html
<EoscCommonMainHeader
  username="name surname"
  login-url="https://marketplace.sandbox.eosc-beyond.eu/users/auth/checkin"
  logout-url="https://marketplace.sandbox.eosc-beyond.eu/users/logout"
></EoscCommonMainHeader>
```

Render using snake case

```html
<eosc-common-main-header
  username="name surname"
  login-url="https://marketplace.sandbox.eosc-beyond.eu/users/auth/checkin"
  logout-url="https://marketplace.sandbox.eosc-beyond.eu/users/logout"
></eosc-common-main-header>
```

Render using build in tools

**IMPORTANT!!!**

- **Preferred for client side UI frameworks like Angular, AngularJS, ReactJS, VueJS, ...**
- **Attach script and styles in page header instead of the end of page body**

```html
<div
  id="custom-id"
  username="name surname"
  login-url="https://marketplace.sandbox.eosc-beyond.eu/users/auth/checkin"
  logout-url="https://marketplace.sandbox.eosc-beyond.eu/users/logout"
></div>
<script>
  window.eosccommon.renderMainHeader("#custom-id");
</script>

<div
  class="custom-class"
  username="name surname"
  login-url="https://marketplace.sandbox.eosc-beyond.eu/users/auth/checkin"
  logout-url="https://marketplace.sandbox.eosc-beyond.eu/users/logout"
></div>
<script>
  window.eosccommon.renderMainHeader(".custom-class");
</script>

<custom-tag
  username="name surname"
  login-url="https://marketplace.sandbox.eosc-beyond.eu/users/auth/checkin"
  logout-url="https://marketplace.sandbox.eosc-beyond.eu/users/logout"
></custom-tag>
<script>
  window.eosccommon.renderMainHeader("custom-tag");
</script>

<custom-tag></custom-tag>
<script>
  window.eosccommon.renderMainHeader("custom-tag", {
    username: "name username",
    "login-url": "https://marketplace.sandbox.eosc-beyond.eu/users/auth/checkin",
    "logout-url": "https://marketplace.sandbox.eosc-beyond.eu/users/logout",
  });
</script>
```

Render using data attributes

**IMPORTANT!!! Preferred for client side UI frameworks like Angular, AngularJS, ReactJS, VueJS, ...**

```html
<div
  class="eosc-common-main-header"
  data-username="name surname"
  data-login-url="https://marketplace.sandbox.eosc-beyond.eu/users/auth/checkin"
  data-logout-url="https://marketplace.sandbox.eosc-beyond.eu/users/logout"
></div>
```

### Working examples

The user isn't logged in

```js
<EoscCommonMainHeader
  username=""
  login-url="https://marketplace.sandbox.eosc-beyond.eu/users/auth/checkin"
  logout-url="https://marketplace.sandbox.eosc-beyond.eu/users/logout"
></EoscCommonMainHeader>
```

A user is logged

```js
<EoscCommonMainHeader
  username="name surname"
  login-url="https://marketplace.sandbox.eosc-beyond.eu/users/auth/checkin"
  logout-url="https://marketplace.sandbox.eosc-beyond.eu/users/logout"
></EoscCommonMainHeader>
```

Handle onLogin with event argument (substitute of loginUrl)

```js
<EoscCommonMainHeader
  username=""
  on-login="alert($event.type + 'on login btn')"
  logout-url="https://marketplace.sandbox.eosc-beyond.eu/users/logout"
></EoscCommonMainHeader>
```

Handle onLogout with event argument (substitute of logoutUrl)

```js
<EoscCommonMainHeader
  username="name surname"
  on-logout="alert($event.type + ' on logout btn')"
  login-url="https://marketplace.sandbox.eosc-beyond.eu/users/auth/checkin"
></EoscCommonMainHeader>
```

Handle multiple callbacks in onLogout (substitute of logoutUrl)

```js
<EoscCommonMainHeader
  username="name surname"
  on-logout="alert('logout btn'); alert('second call'); alert($event.type)"
  login-url="https://marketplace.sandbox.eosc-beyond.eu/users/auth/checkin"
></EoscCommonMainHeader>
```

Customize profile links

```js
<EoscCommonMainHeader
  username="John Doe"
  on-logout="alert('logout btn');"
  login-url="https://marketplace.sandbox.eosc-beyond.eu/users/auth/checkin"
  profile-links='[{"href": "https://search.marketplace.eosc-portal.eu", "caption": "EOSC Search Service"}, {"href": "#", "caption": "Custom link #2"}]'
></EoscCommonMainHeader>
```

Handle all missing params

```js
<EoscCommonMainHeader></EoscCommonMainHeader>
```

Use default eosc links

```js
<EoscCommonMainHeader
  username="John Doe"
  on-logout="alert('logout btn');"
  login-url="https://marketplace.sandbox.eosc-beyond.eu/users/auth/checkin"
  show-eosc-links="true"
></EoscCommonMainHeader>
```


Use default eosc links with custom links defined via `profile-links`

```js
<EoscCommonMainHeader
  username="John Doe"
  on-logout="alert('logout btn');"
  login-url="https://marketplace.sandbox.eosc-beyond.eu/users/auth/checkin"
  show-eosc-links="true"
  profile-links='[{"href": "https://search.marketplace.eosc-portal.eu", "caption": "EOSC Search Service"}]'
></EoscCommonMainHeader>
```

Use default eosc links with custom tab definded via `custom-tabs`

```js
<EoscCommonMainHeader
  username="John Doe"
  on-logout="alert('logout btn');"
  login-url="https://marketplace.sandbox.eosc-beyond.eu/users/auth/checkin"
  show-eosc-links="true"
  custom-tabs='[{"id": "provider", "name": "Provider", "links": [{"caption": "Some Link", "href": "/backoffice"}, {"caption": "Help", "href": "/help"}]}]'
></EoscCommonMainHeader>
```

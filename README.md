# @khalednobani/request-lib
The `package` for making HTTP / HTTPS request into the endpoint.

[![npm version](./src/svg/npm.svg)](./src/svg/npm.svg) [![build status](./src/svg/build-status.svg)](./src/svg/build-status.svg)

## Docs

Check the [documentation](https://khalednobani.github.io/request-lib/)

## Installation

Install the `module` with `npm`
```bash
$ npm install -D request-lib
```

## Usage

* To make quick **GET | POST | PUT | DELETE** request.

```js
const REQUEST_LIB = require('request-lib');

REQUEST_LIB.get({
    url: '{endpoint}',
    params: {
      "page": 1,
      "limit": 10
    },
    headers: {
      "authorization": "bearer {access_token}"
    }
})
    .then((response) => {
        /* The response as response text (UTF-8) */
        console.log(response.response_text);
    }).catch((error) => {
        /* Logs the error for further debugging */
        console.log(error);
    });
```

## Proejct structure
### The tree structure
```
├── docs
│   └── how-to-use.md
├── examples
│   └── make-local-request.js
├── libs
│   └── Request.js
├── src/
│   └── svg
│       ├── buld-status.svg
│       ├── npm.svg
│   └── Request.js
├── _config.yml
├── .gitignore
├── index.js
├── LICENSE
├── package.json
├── README.md
```

## Dependencies

* http / https module - provides HTTP / HTTPS request
* url-parser - provides utility to parse URL
* querystring - provides utility to parse querystring

## Support & Help

- [Issues](https://github.com/khalednobani/request-lib/issues)

## Privacy

This module does <strong>NOT</strong> collect and send any user data. All the operations on the module are done locally on the execution time.

## License
MIT License

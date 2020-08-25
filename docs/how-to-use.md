# How to use the `module`

## Examples

* To make quick **GET** request.

```js
const RequestLib = require('request-lib');

RequestLib.get({
    url: 'http://localhost',
    params: {
        'params1': "Value1",
        'params2': "Value2"
    },
    headers: {}
})
    .then((Response) => {
        console.log("Response ...");
        console.log(Response.response_text);
    }).catch((Error) => {
        console.log("Error ...");
        console.log(Error);
    });
```

* To make **POST** request.

```js
const RequestLib = require('request-lib');

RequestLib.post({
    url: 'http://localhost',
    params: {
        'params1': "Value1",
        'params2': "Value2"
    },
    body: {
        'body1': "Value1",
        'body2': "Value2"
    },
    headers: {}
})
    .then((Response) => {
        console.log("Response ...");
        console.log(Response.response_text);
    }).catch((Error) => {
        console.log("Error ...");
        console.log(Error);
    });
```

* To make **PUT** request.

```js
const RequestLib = require('request-lib');

RequestLib.put({
    url: 'http://localhost',
    params: {
        'params1': "Value1",
        'params2': "Value2"
    },
    body: {
        'body1': "Value1",
        'body2': "Value2"
    },
    headers: {}
})
    .then((Response) => {
        console.log("Response ...");
        console.log(Response.response_text);
    }).catch((Error) => {
        console.log("Error ...");
        console.log(Error);
    });
```

* To make **DELETE** request.

```js
const RequestLib = require('request-lib');

RequestLib.delete({
    url: 'http://localhost',
    params: {
        'params1': "Value1",
        'params2': "Value2"
    },
    headers: {}
})
    .then((Response) => {
        console.log("Response ...");
        console.log(Response.response_text);
    }).catch((Error) => {
        console.log("Error ...");
        console.log(Error);
    });
```

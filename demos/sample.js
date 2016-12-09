const RequestLib = require('../libs/Request');

RequestLib.get({
    url: 'http://localhost',
    params: {
        'params1': "Value1",
        'params2': "Value2"
    },
    body: {
        'body1': "Value1",
        'body2': "Value2"
    }
})
    .then( (Response) => {
        console.log("Response ...");
        console.log(Response.response_text);
    }).catch( (Error) => {
        console.log("Error ...");
        console.log(Error);
    });

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

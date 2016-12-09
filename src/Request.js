'use strict';

import * as HTTP from 'http';
import * as HTTPS from 'https';
import * as URL from 'url';
import * as QueryString from 'querystring';

/**
  * @class Request
  *
  * Makes GET / POST / PUT / DELETE request.
  */
class Request {

    /**
      * @constrcutor
      */
    constructor() {
        this.version = '1.0.0';
    }

    /**
      * @method get.
      *
      * Makes GET request.
      *
      * @param {Object} Options.
      *
      * @return {Object} promise.
      */
    get ( Options = { url: '', params: {}, body: {}, headers: {}} ) {
        let options = Object.assign({ url: '', params: {}, body: {}, headers: {}}, Options);
        return this.request('GET', options.url, options.params, options.body, options.headers);
    }

    /**
      * @method post.
      *
      * Makes POST request.
      *
      * @param {Object} Options.
      *
      * @return {Object} promise.
      */
    post ( Options = { url: '', params: {}, body: {}, headers: {}} ) {
        let options = Object.assign({ url: '', params: {}, body: {}, headers: {}}, Options);
        return this.request('POST', options.url, options.params, options.body, options.headers);
    }

    /**
      * @method put.
      *
      * Makes PUT request.
      *
      * @param {Object} Options.
      *
      * @return {Object} promise.
      */
    put ( Options = { url: '', params: {}, body: {}, headers: {}} ) {
        let options = Object.assign({ url: '', params: {}, body: {}, headers: {}}, Options);
        return this.request('PUT', options.url, options.params, options.body, options.headers);
    }

    /**
      * @method delete.
      *
      * Makes DELETE request.
      *
      * @param {Object} Options.
      *
      * @return {Object} promise.
      */
    delete ( Options = { url: '', params: {}, body: {}, headers: {}} ) {
        let options = Object.assign({ url: '', params: {}, body: {}, headers: {}}, Options);
        return this.request('DELETE', options.url, options.params, options.body, options.headers);
    }

    request(method = 'GET', url = '', params = {}, body = {}, headers = {}) {

        let segmented_url = (typeof url == 'string') ? URL.parse(url) : URL.parse('');

        return new Promise( (Resolve, Reject) => {
            this.Resolve = Resolve;
            this.Reject = Reject;

            if (segmented_url.protocol == null) {
                this.Reject(new Error('You trying to make the request using IP address'));
            }

            let request,
                is_https = ( segmented_url.protocol.indexOf('https') === 0 ),
                is_post_or_put_request = ( method.indexOf('POST') === 0 || method.indexOf('PUT') === 0 ),
                body_data = (is_post_or_put_request) ? QueryString.stringify(body) : QueryString.stringify({}),
                params_data = QueryString.stringify(params),
                path = (params_data) ? `${segmented_url.path}?${params_data}${ (segmented_url.hash) ? segmented_url.hash : '' }` : ( `${segmented_url.path}${ (segmented_url.hash) ? segmented_url.hash : '' }` ),
                request_options = {
                    hostname: segmented_url.hostname || '',
                    port: ( ( segmented_url.port != 443 || segmented_url.port != 80 ) && segmented_url.port != null) ? segmented_url.port : ( (is_https) ? 443 : 80 ),
                    path: path,
                    method: method,
                    auth: (segmented_url.auth) ? segmented_url.auth : '',
                    headers: Object.assign({
                        'User-Agent': 'RequestLib'
                    }, headers, (is_post_or_put_request) ? {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Length': Buffer.byteLength(body_data)
                    } : {})
            };

            request = (is_https) ? HTTPS.request(request_options, handle_request.bind(this)) : HTTP.request(request_options, handle_request.bind(this));
            if (is_post_or_put_request) request.write(body_data);
            request.on('error', (Error) => {
                this.Reject(Error);
            });
            request.end();
        });
    }

}

/**
  * Handles the request callback.
  *
  * @param {Object} Res
  */
function handle_request (Res) {
    let response_text = '';

    Res.setEncoding('utf8');

    Res.on('data', (chunk) => {
        response_text += chunk;
    });

    Res.on('end', () => {
        this.Resolve({
            Response: Res,
            headers: Res.headers,
            response_text: response_text
        });
    });

    Res.on('error', (Error) => {
        this.Reject(Error);
    });
}

module.exports = new Request();

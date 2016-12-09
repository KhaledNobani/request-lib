'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = require('http');

var HTTP = _interopRequireWildcard(_http);

var _https = require('https');

var HTTPS = _interopRequireWildcard(_https);

var _url = require('url');

var URL = _interopRequireWildcard(_url);

var _querystring = require('querystring');

var QueryString = _interopRequireWildcard(_querystring);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  * @class Request
  *
  * Makes GET / POST / PUT / DELETE request.
  */
var Request = function () {

    /**
      * @constrcutor
      */
    function Request() {
        _classCallCheck(this, Request);

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


    _createClass(Request, [{
        key: 'get',
        value: function get() {
            var Options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { url: '', params: {}, body: {}, headers: {} };

            var options = Object.assign({ url: '', params: {}, body: {}, headers: {} }, Options);
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

    }, {
        key: 'post',
        value: function post() {
            var Options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { url: '', params: {}, body: {}, headers: {} };

            var options = Object.assign({ url: '', params: {}, body: {}, headers: {} }, Options);
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

    }, {
        key: 'put',
        value: function put() {
            var Options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { url: '', params: {}, body: {}, headers: {} };

            var options = Object.assign({ url: '', params: {}, body: {}, headers: {} }, Options);
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

    }, {
        key: 'delete',
        value: function _delete() {
            var Options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { url: '', params: {}, body: {}, headers: {} };

            var options = Object.assign({ url: '', params: {}, body: {}, headers: {} }, Options);
            return this.request('DELETE', options.url, options.params, options.body, options.headers);
        }
    }, {
        key: 'request',
        value: function request() {
            var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'GET';
            var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var _this = this;

            var body = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};


            var segmented_url = typeof url == 'string' ? URL.parse(url) : URL.parse('');

            return new Promise(function (Resolve, Reject) {
                _this.Resolve = Resolve;
                _this.Reject = Reject;

                if (segmented_url.protocol == null) {
                    _this.Reject(new Error('You trying to make the request using IP address'));
                }

                var request = void 0,
                    is_https = segmented_url.protocol.indexOf('https') === 0,
                    is_post_or_put_request = method.indexOf('POST') === 0 || method.indexOf('PUT') === 0,
                    body_data = is_post_or_put_request ? QueryString.stringify(body) : QueryString.stringify({}),
                    params_data = QueryString.stringify(params),
                    path = params_data ? segmented_url.path + '?' + params_data + (segmented_url.hash ? segmented_url.hash : '') : '' + segmented_url.path + (segmented_url.hash ? segmented_url.hash : ''),
                    request_options = {
                    hostname: segmented_url.hostname || '',
                    port: (segmented_url.port != 443 || segmented_url.port != 80) && segmented_url.port != null ? segmented_url.port : is_https ? 443 : 80,
                    path: path,
                    method: method,
                    auth: segmented_url.auth ? segmented_url.auth : '',
                    headers: Object.assign({
                        'User-Agent': 'RequestLib'
                    }, headers, is_post_or_put_request ? {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Length': Buffer.byteLength(body_data)
                    } : {})
                };

                request = is_https ? HTTPS.request(request_options, handle_request.bind(_this)) : HTTP.request(request_options, handle_request.bind(_this));
                if (is_post_or_put_request) request.write(body_data);
                request.on('error', function (Error) {
                    _this.Reject(Error);
                });
                request.end();
            });
        }
    }]);

    return Request;
}();

/**
  * Handles the request callback.
  *
  * @param {Object} Res
  */


function handle_request(Res) {
    var _this2 = this;

    var response_text = '';

    Res.setEncoding('utf8');

    Res.on('data', function (chunk) {
        response_text += chunk;
    });

    Res.on('end', function () {
        _this2.Resolve({
            Response: Res,
            headers: Res.headers,
            response_text: response_text
        });
    });

    Res.on('error', function (Error) {
        _this2.Reject(Error);
    });
}

module.exports = new Request();
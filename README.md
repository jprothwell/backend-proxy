# backend-proxy
[![CircleCI](https://circleci.com/gh/murcul/backend-proxy.svg?style=shield)](https://circleci.com/gh/murcul/backend-proxy)

Backend proxy is a tool to route your REST API through a proxy

## Install

```bash
$ npm i -g backend-proxy
```

## Usage

```bash
$ backend-proxy --url PROXY_URL --token-name --token TOKEN --use-headers --read-only
```

## Options

| Option        | Input         | Default  | Required |
| :-------------: |:-------------:| :-----:| :-----:|
| --port | Port on which proxy will serve requests | 3000 | No |
| --url | Url to proxy to | N/A | Yes |
| --token-name | Name of the token query parameter / header name used to pass token | token | No |
| --token | Token to use for requests | N/A | No |
| --use-headers | Pass token as a http header instead of a url query string | false | No |
| --read-only | Only allow GET requests | false | No |

## Example

```bash
$ backend-proxy --url https://reqres.in/api
```
Then
```bash
GET http://localhost:3000/users/2
```
proxies to
```bash
GET https://reqres.in/api/users/2
```

[View this on npm](https://www.npmjs.com/package/backend-proxy)


Made with ❤ by [Rikin Katyal](https://github.com/sirvar)

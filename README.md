# backend-proxy
[![CircleCI](https://circleci.com/gh/murcul/backend-proxy.svg?style=shield)](https://circleci.com/gh/murcul/backend-proxy)

Backend proxy is a tool to route your REST API through a proxy

## Install

```bash
$ npm i -g backend-proxy
```

## Usage

```bash
$ backend-proxy --url PROXY_URL --token TOKEN --read-only
```

## Options

| Option        | Input         | Default  | Required |
| :-------------: |:-------------:| :-----:| :-----:|
| --url | Url to proxy to | N/A | *|
| --token | Token to use for requests | N/A | |
| --read-only | Only allow GET requests | false |  |

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

[Testing API used](https://github.com/benhowdle89/reqres)

Made with ❤ by [Rikin Katyal](https://github.com/sirvar)

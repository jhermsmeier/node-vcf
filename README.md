
# vCard

A not so forgiving vCard parser.

- [Install](#install-with-npm)
- [Usage](#usage)

## Install with [npm](https://npmjs.org)

```sh
$ npm install vcf
```

## Usage

```javascript
var vCard = require( 'vcf' )
```

```javascript
// 'data' being either a string or a buffer
// or something that can be turned into a string
// and represents vcard data
var card = new vCard( data )
```

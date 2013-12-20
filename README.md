# vcf / vCard

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

Parsing a string or buffer:
```javascript
// 'data' being either a string or a buffer
// or something that can be turned into a string
// and represents vcard data
var card = new vCard( data )
// OR
var card = vCard.parse( data )
```

Stringify:
```javascript
var str = card.toString()
// OR with version number (doesn't work, yet)
var str = card.toString( '4.0' )
```

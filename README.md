
# vCard

A forgiving vCard parser.

- [Install](#install-with-npm)
- [Usage](#usage)
- [API](#api)

## Install with [npm](https://npmjs.org)

```shell
npm install vcard
```

## Usage

```javascript
var vCard = require( 'vcard' )
// 'data' being either a string or a buffer
var card = new vCard( data )
```

Example output of util.inspect( card ):
```javascript
{
  version: '3.0',
  fn: 'Stepcase TestUser',
  n: { data: 'TestUser;Stepcase;;;' },
  title: { data: 'CTO' },
  org: { data: 'Stepcase.com' },
  note: { data: 'Stepcase test user is a robot.' },
  email: {
    type: [ 'internet' ],
    data: 'testuser@stepcase.com'
  },
  tel: [
    { type: [ 'fax' ], data: '44444444' },
    { type: [ 'pager' ], data: '66666666' },
    { type: [ 'home' ], data: '22222222' },
    { type: [ 'cell' ], data: '11111111' },
    { type: [ 'fax' ], data: '55555555' },
    { type: [ 'work' ], data: '33333333' }
  ],
  label: [{
    type: [ 'home' ],
    encoding: 'QUOTED-PRINTABLE',
    data: '123 Home, Home Street=0D=0A='
  },{
    type: [ 'work' ],
    encoding: 'QUOTED-PRINTABLE',
    data: '321 Office, Work Road=0D=0A='
  }],
  'x-gtalk': { data: 'gtalk.step' },
  'x-aim': { data: 'aim.step' },
  'x-yahoo': { data: 'yahoo.step' },
  'x-msn': { data: 'msn.step' },
  'x-icq': { data: 'icq.step' },
  'x-jabber': { data: 'jabber.step' },
}
```

## API

#### new vCard( *data* )
Instantiates a new vCard object, parsing given `data`

#### vcard.toString( *version* )
Converts a vCard object instance back to it's RFC compliant string representation.

## Tests
The test cases were stolen from [qoobaa/vcard](https://github.com/qoobaa/vcard)

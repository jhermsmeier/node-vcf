# VCF / vCard
[![npm](https://img.shields.io/npm/v/vcf.svg?style=flat-square)](https://npmjs.com/package/vcf)
[![npm license](https://img.shields.io/npm/l/vcf.svg?style=flat-square)](https://npmjs.com/package/vcf)
[![npm downloads](https://img.shields.io/npm/dm/vcf.svg?style=flat-square)](https://npmjs.com/package/vcf)
[![build status](https://img.shields.io/travis/jhermsmeier/node-vcf.svg?style=flat-square)](https://travis-ci.org/jhermsmeier/node-vcf)

## Install via [npm](https://npmjs.com)

```sh
$ npm install --save vcf
```

## Index

* [Usage](#usage)
  - [Parsing](#parsing-a-vcard)
* [Formats](#formats)
  - [jCard](#format-jcard)
  - [vCard](#format-vcf)
* [API Reference](#api-reference)
* [Benchmarks](#benchmarks)

## Usage

```javascript
var vCard = require( 'vcf' )
```

### Parsing a Single vCard

```js
var card = new vCard().parse( string )
```

```js
vCard {
  version: '4.0',
  data: {
    version: [String: '4.0'],
    n: [String: 'Gump;Forrest;;;'],
    fn: [String: 'Forrest Gump'],
    org: [String: 'Bubba Gump Shrimp Co.'],
    title: [String: 'Shrimp Man'],
    photo: { [String: 'http://www.example.com/dir_photos/my_photo.gif'] mediatype: 'image/gif' },
    tel: [
      { [String: 'tel:+11115551212'] type: [ 'work', 'voice' ], value: 'uri' },
      { [String: 'tel:+14045551212'] type: [ 'home', 'voice' ], value: 'uri' }
    ],
    adr: [
      { [String: ';;100 Waters Edge;Baytown;LA;30314;United States of America']
        type: 'work',
        label: '"100 Waters Edge\\nBaytown, LA 30314\\nUnited States of America"' },
      { [String: ';;42 Plantation St.;Baytown;LA;30314;United States of America']
        type: 'home',
        label: '"42 Plantation St.\\nBaytown, LA 30314\\nUnited States ofAmerica"' }
    ],
    email: [String: 'forrestgump@example.com'],
    rev: [String: '20080424T195243Z']
  }
}
```

### Parsing Multiple vCards

In order to deal with a string that contains multiple vCards,
you will need to use a different function, which returns an array of cards:

```js
var cards = vCard.parse( string )
```

## Formats

### Format: jCard

```js
var card = vCard.fromJSON( data )
```

```js
var jcard = card.toJSON()
```

```json
[ "vcard",
  [
    [ "version", {}, "text", "4.0" ],
    [ "n", {}, "text", [ "Gump", "Forrest", "", "", "" ] ],
    [ "fn", {}, "text", "Forrest Gump" ],
    [ "org", {}, "text", "Bubba Gump Shrimp Co." ],
    [ "title", {}, "text", "Shrimp Man" ],
    [
      "photo", { "mediatype": "image/gif" },
      "text", "http://www.example.com/dir_photos/my_photo.gif"
    ],
    [ "tel", { "type": [ "work", "voice" ], "value": "uri" }, "uri", "tel:+11115551212" ],
    [ "tel", { "type": [ "home", "voice" ], "value": "uri" }, "uri", "tel:+14045551212" ],
    [
      "adr", { "type": "work", "label":"\"100 Waters Edge\\nBaytown, LA 30314\\nUnited States of America\"" },
      "text", [ "", "", "100 Waters Edge", "Baytown", "LA", "30314", "United States of America" ]
    ],
    [
      "adr", { "type": "home", "label": "\"42 Plantation St.\\nBaytown, LA 30314\\nUnited States ofAmerica\"" },
      "text", [ "", "", "42 Plantation St.", "Baytown", "LA", "30314", "United States of America" ]
    ],
    [ "email", {}, "text", "forrestgump@example.com" ],
    [ "rev", {}, "text", "20080424T195243Z" ]
  ]
]
```

### Format: VCF

```js
var vcf = card.toString()
var vcf = card.toString( '4.0' )
```

```vcf
BEGIN:VCARD
VERSION:4.0
N:Gump;Forrest;;;
FN:Forrest Gump
ORG:Bubba Gump Shrimp Co.
TITLE:Shrimp Man
PHOTO;MEDIATYPE=image/gif:http://www.example.com/dir_photos/my_photo.gif
TEL;TYPE=work,voice;VALUE=uri:tel:+11115551212
TEL;TYPE=home,voice;VALUE=uri:tel:+14045551212
ADR;TYPE=work;LABEL="100 Waters Edge\nBaytown, LA 30314\nUnited States
  of America":;;100 Waters Edge;Baytown;LA;30314;United States of America
ADR;TYPE=home;LABEL="42 Plantation St.\nBaytown, LA 30314\nUnited
  States ofAmerica":;;42 Plantation St.;Baytown;LA;30314;United States of
 America
EMAIL:forrestgump@example.com
REV:20080424T195243Z
END:VCARD
```

## API Reference
<a name="vCard"></a>

## vCard
**Kind**: global class  

* [vCard](#vCard)
    * [new vCard()](#new_vCard_new)
    * _instance_
        * [.version](#vCard+version) : <code>String</code>
        * [.data](#vCard+data) : <code>Object</code>
        * [.get(key)](#vCard+get) ⇒ <code>Object</code> \| <code>Array</code>
        * [.set(key, value, params)](#vCard+set)
        * [.add(key, value, params)](#vCard+add)
        * [.setProperty(prop)](#vCard+setProperty)
        * [.addProperty(prop)](#vCard+addProperty)
        * [.parse(value)](#vCard+parse) ⇒ [<code>vCard</code>](#vCard)
        * [.toString(version, charset)](#vCard+toString) ⇒ <code>String</code>
        * [.toJCard(version)](#vCard+toJCard) ⇒ <code>Array</code>
        * [.toJSON()](#vCard+toJSON) ⇒ <code>Array</code>
    * _static_
        * [.Property](#vCard.Property)
            * [new Property(field, value, params)](#new_vCard.Property_new)
            * _instance_
                * [.is(type)](#vCard.Property+is) ⇒ <code>Boolean</code>
                * [.isEmpty()](#vCard.Property+isEmpty) ⇒ <code>Boolean</code>
                * [.clone()](#vCard.Property+clone) ⇒ <code>Property</code>
                * [.toString(version)](#vCard.Property+toString) ⇒ <code>String</code>
                * [.valueOf()](#vCard.Property+valueOf) ⇒ <code>String</code>
                * [.toJSON()](#vCard.Property+toJSON) ⇒ <code>Array</code>
            * _static_
                * [.prototype](#vCard.Property.prototype) : <code>Object</code>
                * [.fromJSON(data)](#vCard.Property.fromJSON) ⇒ <code>Property</code>
        * [.mimeType](#vCard.mimeType) : <code>String</code>
        * [.extension](#vCard.extension) : <code>String</code>
        * [.versions](#vCard.versions) : <code>Array</code>
        * [.foldLine](#vCard.foldLine) ⇒ <code>String</code>
        * [.parseLines](#vCard.parseLines) : <code>function</code>
        * [.normalize(input)](#vCard.normalize) ⇒ <code>String</code>
        * [.isSupported(version)](#vCard.isSupported) ⇒ <code>Boolean</code>
        * [.parse(value)](#vCard.parse) ⇒ [<code>Array.&lt;vCard&gt;</code>](#vCard)
        * [.fromJSON(jcard)](#vCard.fromJSON) ⇒ [<code>vCard</code>](#vCard)
        * [.format(card, version)](#vCard.format) ⇒ <code>String</code>


* * *

<a name="new_vCard_new"></a>

### new vCard()
vCard


* * *

<a name="vCard+version"></a>

### vCard.version : <code>String</code>
Version number

**Kind**: instance property of [<code>vCard</code>](#vCard)  

* * *

<a name="vCard+data"></a>

### vCard.data : <code>Object</code>
Card data

**Kind**: instance property of [<code>vCard</code>](#vCard)  

* * *

<a name="vCard+get"></a>

### vCard.get(key) ⇒ <code>Object</code> \| <code>Array</code>
Get a vCard property

**Kind**: instance method of [<code>vCard</code>](#vCard)  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 


* * *

<a name="vCard+set"></a>

### vCard.set(key, value, params)
Set a vCard property

**Kind**: instance method of [<code>vCard</code>](#vCard)  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 
| value | <code>String</code> | 
| params | <code>Object</code> | 


* * *

<a name="vCard+add"></a>

### vCard.add(key, value, params)
Add a vCard property

**Kind**: instance method of [<code>vCard</code>](#vCard)  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 
| value | <code>String</code> | 
| params | <code>Object</code> | 


* * *

<a name="vCard+setProperty"></a>

### vCard.setProperty(prop)
Set a vCard property from an already
constructed vCard.Property

**Kind**: instance method of [<code>vCard</code>](#vCard)  

| Param | Type |
| --- | --- |
| prop | [<code>Property</code>](#vCard.Property) | 


* * *

<a name="vCard+addProperty"></a>

### vCard.addProperty(prop)
Add a vCard property from an already
constructed vCard.Property

**Kind**: instance method of [<code>vCard</code>](#vCard)  

| Param | Type |
| --- | --- |
| prop | [<code>Property</code>](#vCard.Property) | 


* * *

<a name="vCard+parse"></a>

### vCard.parse(value) ⇒ [<code>vCard</code>](#vCard)
Parse a vcf formatted vCard

**Kind**: instance method of [<code>vCard</code>](#vCard)  

| Param | Type |
| --- | --- |
| value | <code>String</code> | 


* * *

<a name="vCard+toString"></a>

### vCard.toString(version, charset) ⇒ <code>String</code>
Format the vCard as vcf with given version

**Kind**: instance method of [<code>vCard</code>](#vCard)  

| Param | Type |
| --- | --- |
| version | <code>String</code> | 
| charset | <code>String</code> | 


* * *

<a name="vCard+toJCard"></a>

### vCard.toJCard(version) ⇒ <code>Array</code>
Format the card as jCard

**Kind**: instance method of [<code>vCard</code>](#vCard)  
**Returns**: <code>Array</code> - jCard  

| Param | Type | Default |
| --- | --- | --- |
| version | <code>String</code> | <code>&#x27;4.0&#x27;</code> | 


* * *

<a name="vCard+toJSON"></a>

### vCard.toJSON() ⇒ <code>Array</code>
Format the card as jCard

**Kind**: instance method of [<code>vCard</code>](#vCard)  
**Returns**: <code>Array</code> - jCard  

* * *

<a name="vCard.Property"></a>

### vCard.Property
**Kind**: static class of [<code>vCard</code>](#vCard)  

* [.Property](#vCard.Property)
    * [new Property(field, value, params)](#new_vCard.Property_new)
    * _instance_
        * [.is(type)](#vCard.Property+is) ⇒ <code>Boolean</code>
        * [.isEmpty()](#vCard.Property+isEmpty) ⇒ <code>Boolean</code>
        * [.clone()](#vCard.Property+clone) ⇒ <code>Property</code>
        * [.toString(version)](#vCard.Property+toString) ⇒ <code>String</code>
        * [.valueOf()](#vCard.Property+valueOf) ⇒ <code>String</code>
        * [.toJSON()](#vCard.Property+toJSON) ⇒ <code>Array</code>
    * _static_
        * [.prototype](#vCard.Property.prototype) : <code>Object</code>
        * [.fromJSON(data)](#vCard.Property.fromJSON) ⇒ <code>Property</code>


* * *

<a name="new_vCard.Property_new"></a>

#### new Property(field, value, params)
vCard Property


| Param | Type |
| --- | --- |
| field | <code>String</code> | 
| value | <code>String</code> | 
| params | <code>Object</code> | 


* * *

<a name="vCard.Property+is"></a>

#### property.is(type) ⇒ <code>Boolean</code>
Check whether the property is of a given type

**Kind**: instance method of [<code>Property</code>](#vCard.Property)  

| Param | Type |
| --- | --- |
| type | <code>String</code> | 


* * *

<a name="vCard.Property+isEmpty"></a>

#### property.isEmpty() ⇒ <code>Boolean</code>
Check whether the property is empty

**Kind**: instance method of [<code>Property</code>](#vCard.Property)  

* * *

<a name="vCard.Property+clone"></a>

#### property.clone() ⇒ <code>Property</code>
Clone the property

**Kind**: instance method of [<code>Property</code>](#vCard.Property)  

* * *

<a name="vCard.Property+toString"></a>

#### property.toString(version) ⇒ <code>String</code>
Format the property as vcf with given version

**Kind**: instance method of [<code>Property</code>](#vCard.Property)  

| Param | Type |
| --- | --- |
| version | <code>String</code> | 


* * *

<a name="vCard.Property+valueOf"></a>

#### property.valueOf() ⇒ <code>String</code>
Get the property's value

**Kind**: instance method of [<code>Property</code>](#vCard.Property)  

* * *

<a name="vCard.Property+toJSON"></a>

#### property.toJSON() ⇒ <code>Array</code>
Format the property as jCard data

**Kind**: instance method of [<code>Property</code>](#vCard.Property)  

* * *

<a name="vCard.Property.prototype"></a>

#### Property.prototype : <code>Object</code>
Property prototype

**Kind**: static property of [<code>Property</code>](#vCard.Property)  

* * *

<a name="vCard.Property.fromJSON"></a>

#### Property.fromJSON(data) ⇒ <code>Property</code>
Constructs a vCard.Property from jCard data

**Kind**: static method of [<code>Property</code>](#vCard.Property)  

| Param | Type |
| --- | --- |
| data | <code>Array</code> | 


* * *

<a name="vCard.mimeType"></a>

### vCard.mimeType : <code>String</code>
vCard MIME type

**Kind**: static property of [<code>vCard</code>](#vCard)  

* * *

<a name="vCard.extension"></a>

### vCard.extension : <code>String</code>
vCard file extension

**Kind**: static property of [<code>vCard</code>](#vCard)  

* * *

<a name="vCard.versions"></a>

### vCard.versions : <code>Array</code>
vCard versions

**Kind**: static property of [<code>vCard</code>](#vCard)  

* * *

<a name="vCard.foldLine"></a>

### vCard.foldLine ⇒ <code>String</code>
Folds a long line according to the RFC 5322.

**Kind**: static property of [<code>vCard</code>](#vCard)  
**See**: http://tools.ietf.org/html/rfc5322#section-2.1.1  

| Param | Type |
| --- | --- |
| input | <code>String</code> | 
| maxLength | <code>Number</code> | 
| hardWrap | <code>Boolean</code> | 


* * *

<a name="vCard.parseLines"></a>

### vCard.parseLines : <code>function</code>
Parse an array of vcf formatted lines

**Kind**: static property of [<code>vCard</code>](#vCard)  
**Internal**: used by `vCard#parse()`  

* * *

<a name="vCard.normalize"></a>

### vCard.normalize(input) ⇒ <code>String</code>
Normalizes input (cast to string, line folding, whitespace)

**Kind**: static method of [<code>vCard</code>](#vCard)  

| Param | Type |
| --- | --- |
| input | <code>String</code> | 


* * *

<a name="vCard.isSupported"></a>

### vCard.isSupported(version) ⇒ <code>Boolean</code>
Check whether a given version is supported

**Kind**: static method of [<code>vCard</code>](#vCard)  

| Param | Type |
| --- | --- |
| version | <code>String</code> | 


* * *

<a name="vCard.parse"></a>

### vCard.parse(value) ⇒ [<code>Array.&lt;vCard&gt;</code>](#vCard)
Parses a string or buffer into a vCard object

**Kind**: static method of [<code>vCard</code>](#vCard)  

| Param | Type |
| --- | --- |
| value | <code>String</code> \| <code>Buffer</code> | 


* * *

<a name="vCard.fromJSON"></a>

### vCard.fromJSON(jcard) ⇒ [<code>vCard</code>](#vCard)
Constructs a vCard from jCard data

**Kind**: static method of [<code>vCard</code>](#vCard)  

| Param | Type |
| --- | --- |
| jcard | <code>Array</code> | 


* * *

<a name="vCard.format"></a>

### vCard.format(card, version) ⇒ <code>String</code>
Format a card object according to the given version

**Kind**: static method of [<code>vCard</code>](#vCard)  

| Param | Type |
| --- | --- |
| card | [<code>vCard</code>](#vCard) | 
| version | <code>String</code> | 


* * *

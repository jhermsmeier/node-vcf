# VCF / vCard
[![npm](https://img.shields.io/npm/v/vcf.svg?style=flat-square)](https://npmjs.com/package/vcf)
[![npm license](https://img.shields.io/npm/l/vcf.svg?style=flat-square)](https://npmjs.com/package/vcf)
[![npm downloads](https://img.shields.io/npm/dm/vcf.svg?style=flat-square)](https://npmjs.com/package/vcf)
[![build status](https://img.shields.io/travis/jhermsmeier/node-vcf.svg?style=flat-square)](https://travis-ci.org/jhermsmeier/node-vcf)

## Install via [npm](https://npmjs.com)

```sh
$ npm install --save vcf
```

## Benchmarks

| Method              | op/s       |
| :------------------ | ---------: |
| vCard.normalize()   |    379,662 |
| vCard.isSupported() | 15,612,641 |
| vCard#parse()       |     12,309 |
| vCard#toString()    |     45,715 |
| vCard#toJSON()      |    159,824 |

## Usage

```javascript
var vCard = require( 'vcf' )
```

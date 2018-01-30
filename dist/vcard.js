(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.vCard = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var camelCase = require('camelcase');
var Property = require('./property');
var IGNORE_WRONG_TYPES = ['pref'];

function set(object, key, value) {
  if (Array.isArray(object[key])) {
    object[key].push(value);
  } else if (object[key] != null) {
    object[key] = [object[key], value];
  } else {
    object[key] = value;
  }
}

function createParams(params, param) {

  var parts = param.split('=');
  var k = camelCase(parts[0]);
  var value = parts[1];

  if (!value) {
    value = parts[0];
    k = 'type';
  }

  if (k === 'type') {

    value.split(',').filter(function (value) {
      return IGNORE_WRONG_TYPES.indexOf(value.toLowerCase()) === -1;
    }).forEach(function (value) {
      set(params, k, value);
    });

    return params;
  }

  set(params, k, value);

  return params;
}

function clearValue(value) {
  if (typeof value === 'string') {
    return value.replace(/\\n/g, '\n');
  }

  return value;
}

function parseLines(lines) {

  var data = {};

  // NOTE: Line format:
  //  PROPERTY[;PARAMETER[=VALUE]]:Attribute[;Attribute]
  var line = null;
  var pattern = /^([^;:]+)((?:;(?:[^;:]+))*)(?:\:(.+))?$/i;
  var len = lines.length - 1;

  for (var i = 1; i < len; i++) {

    line = lines[i];

    var match = pattern.exec(line);
    if (!match) continue;

    var name = match[1].split('.');
    var property = name.pop();
    var group = name.pop();
    var value = match[3];
    var params = match[2] ? match[2].replace(/^;|;$/g, '').split(';') : [];

    var propParams = params.reduce(createParams, group ? { group: group } : {});
    var propName = property.toLowerCase();
    var propVal = new Property(propName, clearValue(value), propParams);

    set(data, propName, propVal);
  }

  return data;
}

module.exports = parseLines;

},{"./property":2,"camelcase":4}],2:[function(require,module,exports){
'use strict';

/**
 * vCard Property
 * @constructor
 * @memberOf vCard
 * @param {String} field
 * @param {String} value
 * @param {Object} params
 * @return {Property}
 */
function Property(field, value, params) {

  if (!(this instanceof Property)) return new Property(value);

  if (params != null) Object.assign(this, params);

  this._field = field;
  this._data = value;

  Object.defineProperty(this, '_field', { enumerable: false });
  Object.defineProperty(this, '_data', { enumerable: false });
}

/**
 * Constructs a vCard.Property from jCard data
 * @param  {Array} data
 * @return {Property}
 */
Property.fromJSON = function (data) {

  var field = data[0];
  var params = data[1];

  if (!/text/i.test(data[2])) params.value = data[2];

  var value = Array.isArray(data[3]) ? data[3].join(';') : data[3];

  return new Property(field, value, params);
};

/**
 * Turn a string into capitalized dash-case
 * @internal used by `Property#toString()`
 * @param  {String} value
 * @return {String}
 * @ignore
 */
function capitalDashCase(value) {
  return value.replace(/([a-z])([A-Z])/g, '$1-$2').toUpperCase();
}

/**
 * Property prototype
 * @type {Object}
 */
Property.prototype = {

  constructor: Property,

  /**
   * Check whether the property is of a given type
   * @param  {String}  type
   * @return {Boolean}
   */
  is: function is(type) {
    type = (type + '').toLowerCase();
    return Array.isArray(this.type) ? this.type.toLowerCase().indexOf(type) : this.type.toLowerCase() === type;
  },

  /**
   * Get field (key) value
   * @return {String}
   */
  getField: function getField() {
    return this._field;
  },

  /**
   * Get property type value
   * @return {String}
   */
  getType: function getType() {
    return this.type;
  },

  /**
   * Get property group value
   */
  getGroup: function getGroup() {
    return this.group;
  },

  /**
   * Get params
   * @return {Object}
   */
  getParams: function getParams() {
    return Object.assign({}, this);
  },

  /**
   * Check whether the property is empty
   * @return {Boolean}
   */
  isEmpty: function isEmpty() {
    return !this._data || !this._data.length;
  },

  /**
   * Clone the property
   * @return {Property}
   */
  clone: function clone() {
    return new Property(this._field, this._data, this);
  },

  /**
   * Format the property as vcf with given version
   * @param  {String} version
   * @return {String}
   */
  toString: function toString(version) {

    var propName = (this.group ? this.group + '.' : '') + capitalDashCase(this._field);
    var keys = Object.keys(this);
    var params = [];

    for (var i = 0; i < keys.length; i++) {
      if (keys[i] === 'group') continue;
      params.push(capitalDashCase(keys[i]) + '=' + this[keys[i]]);
    }

    return propName + (params.length ? ';' + params.join(';') : params) + ':' + (Array.isArray(this._data) ? this._data.join(';') : this._data.trim());
  },

  /**
   * Get the property's value
   * @return {String}
   */
  valueOf: function valueOf() {
    return this._data;
  },

  /**
   * Format the property as jCard data
   * @return {Array}
   */
  toJSON: function toJSON() {

    var params = Object.assign({}, this);

    if (params.value === 'text') {
      params.value = void 0;
      delete params.value;
    }

    var data = [this._field, params, this.value || 'text'];

    switch (this._field) {
      default:
        data.push(this._data);break;
      case 'adr':
      case 'n':
        data.push(this._data.split(';'));
    }

    return data;
  }

  // Exports
};module.exports = Property;

},{}],3:[function(require,module,exports){
'use strict';

/**
 * vCard
 * @constructor
 * @return {vCard}
 */
function vCard() {

  if (!(this instanceof vCard)) return new vCard();

  /** @type {String} Version number */
  this.version = vCard.versions[vCard.versions.length - 1];
  /** @type {Object} Card data */
  this.data = {};
}

/**
 * vCard MIME type
 * @type {String}
 */
vCard.mimeType = 'text/vcard';

/**
 * vCard file extension
 * @type {String}
 */
vCard.extension = '.vcf';

/**
 * vCard versions
 * @type {Array}
 */
vCard.versions = ['2.1', '3.0', '4.0'];

/**
 * Folds a long line according to the RFC 5322.
 * @see http://tools.ietf.org/html/rfc5322#section-2.1.1
 * @param  {String}  input
 * @param  {Number}  maxLength
 * @param  {Boolean} hardWrap
 * @return {String}
 */
vCard.foldLine = require('foldline');

/**
 * Normalizes input (cast to string, line folding, whitespace)
 * @param  {String} input
 * @return {String}
 */
vCard.normalize = function (input) {
  // remove unfolded lines
  /*
  * Don't trim lines at this moment: the old manner caused
  * KEY\n BLOCK to go to KEYBLOCK instead of KEY BLOCK. Effectively letting foldlines remove random spaces from
  * the input when converting to vcard and parsing that vcard again.
  */
  return (input + '').replace(/\r?\n\s*(?=\r?\n[^\x20\x09])/g, '').replace(/\r?\n([\x20\x09]|$)/g, '').trim();
};

/**
 * Check whether a given version is supported
 * @param  {String} version
 * @return {Boolean}
 */
vCard.isSupported = function (version) {
  return (/^\d\.\d$/.test(version) && vCard.versions.indexOf(version) !== -1
  );
};

/**
 * Parses a string or buffer into a vCard object
 * @param  {String|Buffer} value
 * @return {Array<vCard>}
 */
vCard.parse = function (value) {

  var objects = (value + '').split(/(?=BEGIN\:VCARD)/gi);
  var cards = [];

  for (var i = 0; i < objects.length; i++) {
    cards.push(new vCard().parse(objects[i]));
  }

  return cards;
};

/**
 * Parse an array of vcf formatted lines
 * @internal used by `vCard#parse()`
 * @type {Function}
 */
vCard.parseLines = require('./parse-lines');

/**
 * Constructs a vCard from jCard data
 * @param  {Array} jcard
 * @return {vCard}
 */
vCard.fromJSON = function (jcard) {

  jcard = typeof jcard === 'string' ? JSON.parse(jcard) : jcard;

  if (jcard == null || !Array.isArray(jcard)) return new vCard();

  if (!/vcard/i.test(jcard[0])) throw new Error('Object not in jCard format');

  var card = new vCard();

  jcard[1].forEach(function (prop) {
    card.addProperty(vCard.Property.fromJSON(prop));
  });

  return card;
};

/**
 * Format a card object according to the given version
 * @param  {vCard}  card
 * @param  {String} version
 * @return {String}
 */
vCard.format = function (card, version) {

  version = version || card.version || vCard.versions[vCard.versions.length - 1];

  if (!vCard.isSupported(version)) throw new Error('Unsupported vCard version "' + version + '"');

  var vcf = [];

  vcf.push('BEGIN:VCARD');
  vcf.push('VERSION:' + version);

  var props = Object.keys(card.data);
  var prop = '';

  for (var i = 0; i < props.length; i++) {
    if (props[i] === 'version') continue;
    prop = card.data[props[i]];
    if (Array.isArray(prop)) {
      for (var k = 0; k < prop.length; k++) {
        if (prop[k].isEmpty()) continue;
        vcf.push(vCard.foldLine(prop[k].toString(version).replace(/\r?\n/g, '\\n'), 75));
      }
    } else if (!prop.isEmpty()) {
      vcf.push(vCard.foldLine(prop.toString(version).replace(/\r?\n/g, '\\n'), 75));
    }
  }

  vcf.push('END:VCARD');

  return vcf.join('\r\n');
};

// vCard Property constructor
vCard.Property = require('./property');

/**
 * vCard prototype
 * @type {Object}
 */
vCard.prototype = {

  constructor: vCard,

  /**
   * Get a vCard property
   * @param  {String} key
   * @return {Object|Array}
   */
  get: function get(key) {

    if (this.data[key] == null) {
      return this.data[key];
    }

    if (Array.isArray(this.data[key])) {
      return this.data[key].map(function (prop) {
        return prop.clone();
      });
    } else {
      return this.data[key].clone();
    }
  },

  /**
   * Set a vCard property
   * @param {String} key
   * @param {String} value
   * @param {Object} params
   */
  set: function set(key, value, params) {
    return this.setProperty(new vCard.Property(key, value, params));
  },

  /**
   * Add a vCard property
   * @param {String} key
   * @param {String} value
   * @param {Object} params
   */
  add: function add(key, value, params) {
    var prop = new vCard.Property(key, value, params);
    this.addProperty(prop);
    return this;
  },

  /**
   * Remove a vCard property
   * @param {String} key
   * @return {Object}
   */
  remove: function remove(key) {
    delete this.data[key];
    return this;
  },

  /**
   * Set a vCard property from an already
   * constructed vCard.Property
   * @param {vCard.Property} prop
   */
  setProperty: function setProperty(prop) {
    this.data[prop._field] = prop;
    return this;
  },

  /**
   * Add a vCard property from an already
   * constructed vCard.Property
   * @param {vCard.Property} prop
   */
  addProperty: function addProperty(prop) {

    var key = prop._field;

    if (Array.isArray(this.data[key])) {
      this.data[key].push(prop);
    } else if (this.data[key] != null) {
      this.data[key] = [this.data[key], prop];
    } else {
      this.data[key] = prop;
    }

    return this;
  },

  /**
   * Parse a vcf formatted vCard
   * @param  {String} value
   * @return {vCard}
   */
  parse: function parse(value) {

    // Normalize & split
    var lines = vCard.normalize(value).split(/\r?\n/g);

    // Keep begin and end markers
    // for eventual error messages
    var begin = lines[0];
    var version = lines[1];
    var end = lines[lines.length - 1];

    if (!/BEGIN:VCARD/i.test(begin)) throw new SyntaxError('Invalid vCard: Expected "BEGIN:VCARD" but found "' + begin + '"');

    if (!/END:VCARD/i.test(end)) throw new SyntaxError('Invalid vCard: Expected "END:VCARD" but found "' + end + '"');

    // TODO: For version 2.1, the VERSION can be anywhere between BEGIN & END
    if (!/VERSION:\d\.\d/i.test(version)) throw new SyntaxError('Invalid vCard: Expected "VERSION:\\d.\\d" but found "' + version + '"');

    this.version = version.substring(8, 11);

    if (!vCard.isSupported(this.version)) throw new Error('Unsupported version "' + this.version + '"');

    this.data = vCard.parseLines(lines);

    return this;
  },

  /**
   * Format the vCard as vcf with given version
   * @param  {String} version
   * @param  {String} charset
   * @return {String}
   */
  toString: function toString(version, charset) {
    version = version || this.version;
    return vCard.format(this, version);
  },

  /**
   * Format the card as jCard
   * @param {String} version='4.0'
   * @return {Array} jCard
   */
  toJCard: function toJCard(version) {

    version = version || '4.0';

    var keys = Object.keys(this.data);
    var data = [['version', {}, 'text', version]];
    var prop = null;

    for (var i = 0; i < keys.length; i++) {
      if (keys[i] === 'version') continue;
      prop = this.data[keys[i]];
      if (Array.isArray(prop)) {
        for (var k = 0; k < prop.length; k++) {
          data.push(prop[k].toJSON());
        }
      } else {
        data.push(prop.toJSON());
      }
    }

    return ['vcard', data];
  },

  /**
   * Format the card as jCard
   * @return {Array} jCard
   */
  toJSON: function toJSON() {
    return this.toJCard(this.version);
  },

  /**
   * Check if the card doesn't contain properties
   * @return {Boolean}
   */
  isEmpty: function isEmpty() {
    var keys = Object.keys(this.data);
    var index = keys.indexOf('version');

    if (index > -1) {
      keys.splice(1, index);
    }

    return !keys.length;
  }

  // Exports
};module.exports = vCard;

},{"./parse-lines":1,"./property":2,"foldline":5}],4:[function(require,module,exports){
'use strict';

function preserveCamelCase(str) {
	var isLastCharLower = false;

	for (var i = 0; i < str.length; i++) {
		var c = str.charAt(i);

		if (isLastCharLower && (/[a-zA-Z]/).test(c) && c.toUpperCase() === c) {
			str = str.substr(0, i) + '-' + str.substr(i);
			isLastCharLower = false;
			i++;
		} else {
			isLastCharLower = (c.toLowerCase() === c);
		}
	}

	return str;
}

module.exports = function () {
	var str = [].map.call(arguments, function (str) {
		return str.trim();
	}).filter(function (str) {
		return str.length;
	}).join('-');

	if (!str.length) {
		return '';
	}

	if (str.length === 1) {
		return str.toLowerCase();
	}

	if (!(/[_.\- ]+/).test(str)) {
		if (str === str.toUpperCase()) {
			return str.toLowerCase();
		}

		if (str[0] !== str[0].toLowerCase()) {
			return str[0].toLowerCase() + str.slice(1);
		}

		return str;
	}

	str = preserveCamelCase(str);

	return str
	.replace(/^[_.\- ]+/, '')
	.toLowerCase()
	.replace(/[_.\- ]+(\w|$)/g, function (m, p1) {
		return p1.toUpperCase();
	});
};

},{}],5:[function(require,module,exports){
/**
 * Folds a long line according to RFC 5322
 * @see http://tools.ietf.org/html/rfc5322#section-2.1.1
 *
 * @param  {String}  input
 * @param  {Number}  maxLength
 * @param  {Boolean} hardWrap
 * @return {String}
 */
module.exports = function foldLine( input, maxLength, hardWrap ) {

  // Remove any newlines
  input = input.replace( /\r?\n/g, '' )

  if( maxLength != null && maxLength < 5 )
    throw new Error( 'Maximum length must not be less than 5' )

  // RFC compliant default line length
  maxLength = maxLength != null ? maxLength : 78

  // We really don't need to fold this
  if( input.length <= maxLength )
    return input

  // Substract 3 because CRLF<space> is the line delimiter
  // (3 bytes + 1 <space> extra because of soft folding)
  maxLength = maxLength - 4

  var CRLF = '\r\n'

  var lines = [], len = input.length
  var lastIndex = 0, index = 0;

  if (hardWrap) {

    // We remove the one <space> extra here again,
    // since we're going into hard folding mode
    maxLength++

    while( index < len ) {
      lines.push( input.slice( index, index += maxLength ) )
    }

    return lines.join( CRLF + ' ' )
  }

  while (index < len) {
    lastIndex = input.lastIndexOf( ' ', maxLength + index )
    if (input.slice(index).length <= maxLength) {
      lines.push( input.slice( index ) )
      break;
    }

    if (lastIndex <= index) {
      lines.push(input.slice(index, index + maxLength));
      index += maxLength;
      continue;
    }


    lines.push(input.slice( index, lastIndex ) )
    index = lastIndex
  }


  return lines.join( CRLF + ' ' )

}

},{}]},{},[3])(3)
});
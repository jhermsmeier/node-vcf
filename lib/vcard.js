/**
 * vCard
 * @constructor
 * @return {vCard}
 */
function vCard() {

  if( !(this instanceof vCard) )
    return new vCard()

  this.version = vCard.versions[ vCard.versions.length - 1 ]
  this.data = {}

}

/**
 * vCard MIME type
 * @type {String}
 */
vCard.mimeType = 'text/vcard'

/**
 * vCard file extension
 * @type {String}
 */
vCard.extension = '.vcf'

/**
 * vCard versions
 * @type {Array}
 */
vCard.versions = [ '2.1', '3.0', '4.0' ]

/**
 * Folds a long line according to the RFC 5322.
 * @see http://tools.ietf.org/html/rfc5322#section-2.1.1
 * @param  {String}  input
 * @param  {Number}  maxLength
 * @param  {Boolean} hardWrap
 * @return {String}
 */
vCard.foldLine = require( 'foldline' )

/**
 * Normalizes input (cast to string, line folding, whitespace)
 * @param  {String} input
 * @return {String}
 */
vCard.normalize = function( input ) {
  return ( input + '' )
    // Trim whitespace
    .replace( /^[\s\r\n]+|[\s\r\n]+$/g, '' )
    // Trim blank lines
    .replace( /\r?\n(\s+|$)/g, '' )
    // Unfold folded lines
    .replace( /\r?\n[\x20\x09]+/g, '' )
}

/**
 * Check whether a given version is supported
 * @param  {String} version
 * @return {Boolean}
 */
vCard.isSupported = function( version ) {
  return /^\d\.\d$/.test( version ) &&
    typeof vCard.parse[ version ] === 'function'
}

/**
 * Parses a string or buffer into a vCard object
 * @param  {String|Buffer} input
 * @return {vCard}
 */
vCard.parse = function( input ) {
  return new vCard().parse( input )
}

// Parsers
vCard.parse['2.1'] = require( './parser/2.1.js' )
vCard.parse['3.0'] = require( './parser/2.1.js' )
vCard.parse['4.0'] = require( './parser/2.1.js' )
// vCard.parse['3.0'] = require( './parser/3.0.js' )
// vCard.parse['4.0'] = require( './parser/4.0.js' )

/**
 * Format a card object according to the given version
 * @param  {String} version
 * @param  {String} charset (optional)
 * @param  {Object} cardData
 * @return {String}
 */
vCard.format = function( version, charset, cardData ) {

  if( !vCard.isSupported( version ) )
    throw new Error( 'Unsupported vCard version "' + version + '"' )

  return vCard.format[ version ]( charset, cardData )

}

// Formatters
vCard.format['2.1'] = require( './format/2.1.js' )
vCard.format['3.0'] = require( './format/3.0.js' )
vCard.format['4.0'] = require( './format/4.0.js' )

/**
 * [Property description]
 * @constructor
 * @type {Function}
 */
vCard.Property = require( './property' )

/**
 * vCard prototype
 * @type {Object}
 */
vCard.prototype = {

  constructor: vCard,

  /**
   * [get description]
   * @param  {String} key
   * @return {Object|Array}
   */
  get: function( key ) {

    if( this.data[ key ] == null )
      return this.data[ key ]

    if( Array.isArray( this.data[ key ] ) ) {
      return this.data[ key ].map( function( prop ) {
        return prop.clone()
      })
    } else {
      this.data[ key ].clone()
    }

  },

  /**
   * [set description]
   * @param {String} key
   * @param {String} value
   * @param {Object} params
   */
  set: function( key, value, params ) {
    this.data[ key ] = new vCard.Property( key, value, params )
    return this
  },

  /**
   * [add description]
   * @param {String} key
   * @param {String} value
   * @param {Object} params
   */
  add: function( key, value, params ) {

    var prop = new vCard.Property( key, value, params )

    if( Array.isArray( this.data[ key ] ) ) {
      this.data[ key ].push( prop )
    } else if( this.data[ key ] != null ) {
      this.data[ key ] = [ this.data[ key ], prop ]
    } else {
      this.data[ key ] = prop
    }

    return this

  },

  /**
   * [parse description]
   * @param  {String} value
   * @return {vCard}
   */
  parse: function( value ) {

    // Normalize & split
    var lines = vCard.normalize( value )
      .split( /\r?\n/g )

    // Keep begin and end markers
    // for eventual error messages
    var begin = lines[0]
    var version = lines[1]
    var end = lines[ lines.length - 1 ]

    if( !/BEGIN:VCARD/i.test( begin ) )
      throw new SyntaxError( 'Invalid vCard: Expected "BEGIN:VCARD" but found "'+ begin +'"' )

    if( !/END:VCARD/i.test( end ) )
      throw new SyntaxError( 'Invalid vCard: Expected "END:VCARD" but found "'+ end +'"' )

    // TODO: For version 2.1, the VERSION can be anywhere between BEGIN & END
    if( !/VERSION:\d\.\d/i.test( version ) )
      throw new SyntaxError( 'Invalid vCard: Expected "VERSION:\\d.\\d" but found "'+ version +'"' )

    this.version = version.substring( 8, 11 )

    if( !vCard.isSupported( this.version ) )
      throw new Error( 'Unsupported version "' + this.version + '"' )

    this.data = vCard.parse[ this.version ].call( this, lines )

    return this

  },

  /**
   * [toString description]
   * @param  {String} version
   * @param  {String} charset
   * @return {String}
   */
  toString: function( version, charset ) {
    version = version || this.version
    return vCard.format( version, charset, this.data )
  },

  /**
   * [toJSON description]
   * @return {Array} jCard
   */
  toJSON: function() {

    var keys = Object.keys( this.data )
    var data = []

    for( var i = 0; i < keys.length; i++ ) {
      Array.isArray( this.data[ keys[i] ] ) ?
        data = data.concat( this.data[ keys[i] ] ) :
        data.push( this.data[ keys[i] ] )
    }

    return [ 'vcard', data ]

  },

}

// Exports
module.exports = vCard

class VCard extends Map {

  constructor() {
    super()
    this.version = '4.0'
  }

  /**
   * [parse description]
   * @param {String|Buffer} value
   * @returns {VCard}
   */
  static parse( value ) {
    return new VCard().parse( value )
  }

  /**
   * [parse description]
   * @param {String|Buffer} value
   * @returns {VCard}
   */
  parse( value ) {

    var lines = VCard.normalize( value ).split( /\r?\n/g )

    var begin = lines[0]
    var end = lines[ lines.length - 1 ]
    var version = lines.find(( line ) => {
      return /^VERSION:/i.test( line )
    })

    if( !/^BEGIN:VCARD/i.test( begin ) ) {
      throw new SyntaxError( 'Invalid vCard: Expected "BEGIN:VCARD" but found "' + begin + '"' )
    }

    if( !/^END:VCARD/i.test( end ) ) {
      throw new SyntaxError( 'Invalid vCard: Expected "END:VCARD" but found "' + end + '"' )
    }

    if( !version ) {
      throw new SyntaxError( 'Invalid vCard: Missing version' )
    }

    this.version = version.slice( 8 )

    if( !VCard.VERSIONS.includes( this.version ) ) {
      throw new Error( 'Unsupported version "' + this.version + '"' )
    }

    if( this.version !== '2.1' && lines.indexOf( version ) !== 1 ) {
      throw new SyntaxError( 'Invalid vCard: Expected version at second line' )
    }

    var skipPattern = /^(BEGIN|END):VCARD|VERSION:/i
    var pattern = /^([^;:]+)((?:;(?:[^;:]+))*)(?:\:(.+))?$/i

    for( var i = 0; i < lines.length; i++ ) {

      if( skipPattern.test( lines[i] ) )
        continue

      let match = pattern.exec( lines[i] )
      if( !match ) continue

      let name = match[1].split('.')
      let property = name.pop().toLowerCase()
      let group = name.pop()
      let value = match[3]
      let params = match[2] ? match[2].replace( /^;|;$/g, '' ).split( ';' ) : []

      let _ = {
        value,
        // group: group || null,
        params: params.length ? new Map() : null,
      }

      if( params.length ) {
        params.forEach(( param ) => {
          var [ key, value ] = param.split( /=/ )
          key = key.toLowerCase()
          if( key === 'type' ) {
            if( !_.params.has( key ) ) {
              _.params.set( key, [] )
            }
            if( value[ 0 ] === '"' && value[ value.length - 1 ] === '"' && value.indexOf( ',' ) !== -1 ) {
              value = value.slice( 1, -1 )
            }
            value.toLowerCase().split( ',' ).forEach(( v ) => {
              _.params.get( key ).push( v )
            })
          } else {
            _.params.set( key, value )
          }
        })
      }

      if( this.has( property ) ) {
        this.get( property ).push( _ )
      } else {
        this.set( property, [ _ ] )
      }

    }

    return this

  }

  /**
   * [toString description]
   * @param {String} [version='4.0']
   * @returns {String} vcf
   */
  toString( version ) {
    version = version || '4.0'
    throw new Error( 'Not implemented' )
  }

  /**
   * [toJSON description]
   * @param {String} [version='4.0']
   * @returns {Array<Array>} jCard
   */
  toJSON( version ) {
    version = version || '4.0'
    throw new Error( 'Not implemented' )
  }

}

/**
 * VCard versions
 * @type {Array}
 */
VCard.VERSIONS = [ '2.1', '3.0', '4.0' ]

/**
 * VCard MIME type
 * @type {String}
 * @constant
 */
VCard.MIME_TYPE = 'text/vcard'

/**
 * VCard file extension
 * @type {String}
 * @constant
 */
VCard.EXTENSION = '.vcf'

/**
 * Normalizes input (cast to string, line folding, whitespace)
 * @param {Buffer|String} value
 * @returns {String}
 */
VCard.normalize = function( value ) {
  return ( value + '' )
    // Trim whitespace
    .replace( /^[\s\r\n]+|[\s\r\n]+$/g, '' )
    // Trim blank lines
    .replace( /(\r\n)[\x09\x20]?(\r\n)|$/g, '$1' )
    // Unfold folded lines
    .replace( /\r\n[\x20\x09]/g, "" )
}

VCard.parseProperty = function( line, version ) {
  throw new Error( 'Not implemented' )
}

VCard.formatProperty = function( prop, version ) {
  throw new Error( 'Not implemented' )
}

VCard.Property = require( './property2' )

module.exports = VCard

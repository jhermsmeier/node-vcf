/**
 * vCard Constructor
 * @param  {String|Object} data
 * @return {vCard}
 */
function vCard( data ) {
  
  if( !(this instanceof vCard) )
    return new vCard( data )
  
  this.version = '4.0'
  
  if( data != null ) {
    this.parse( data )
  }
  
}

// Exports
module.exports = vCard

// Expose data about fields 'n' stuff for external use
vCard.PROPERTIES = require( './properties' )
vCard.PARAMETERS = require( './parameters' )
vCard.DATA_TYPES = require( './data-types' )

/**
 * Parses a string into a vCard object
 * @param  {String} data
 * @return {vCard}
 */
vCard.parse = function parse( data ) {
  return new vCard().parse( data )
}

/**
 * Folds a long line according to the RFC 5322.
 * <http://tools.ietf.org/html/rfc5322#section-2.1.1>
 * 
 * @param  {String}  input 
 * @param  {Number}  maxLength 
 * @param  {Boolean} hardWrap 
 * @return {String} 
 */
vCard.foldLine = function foldLine( input, maxLength, hardWrap ) {
  
  // Remove any newlines
  input = input.replace( /\r?\n/g, '' )
  
  // RFC compliant default line length
  maxLength = maxLength && maxLength > 5
    ? maxLength : 78
  
  // We really don't need to fold this
  if( input.length <= maxLength )
    return input
  
  // Substract 3 because CRLF<space> is the line delimiter
  // (3 bytes + 1 <space> extra because of soft folding)
  maxLength = maxLength - 4
  
  const CRLF = '\r\n'
  
  var lines = [], len = input.length
  var lastIndex = 0, index = 0
  
  if( !hardWrap ) {
    while( ~(lastIndex = input.lastIndexOf( ' ', maxLength + index )) ) {
      if( lastIndex <= index ) { break }
      if( input.slice( index ).length > maxLength ) {
        lines.push( (index ? ' ' : '') + input.slice( index, lastIndex ) )
        index = lastIndex + 1
      } else {
        lines.push( (index ? ' ' : '') + input.slice( index ) )
        index = len
      }
    }
  }
  
  // We remove the one <space> extra here again,
  // since we're going into hard folding mode
  maxLength++
  
  while( index < len ) {
    lines.push( input.slice( index, index += maxLength ) )
  }
  
  return lines.join( CRLF + ' ' )
  
}

/**
 * vCard prototype
 * @type {Object}
 */
vCard.prototype = {
  
  constructor: vCard,
  
  /**
   * [set description]
   * @param {String} key
   * @param {Mixed}  value
   * @param {Object} params
   */
  set: function( key, value, params ) {
    
    // Enable omitting the value argument
    if( arguments.length === 2 ) {
      params = value
      value = null
    } else {
      params.data = value
    }
    
    // Handle multiple entries with the same key
    if( this[ key ] ) {
      Array.isArray( this[ key ] ) ?
        this[ key ].push( params ) :
        this[ key ] = [ this[ key ], params ]
    } else {
      this[ key ] = params
    }
    
    return this
    
  },
  
  /**
   * [parse description]
   * @param  {String} data
   * @return {vCard}
   */
  parse: function( data ) {
    
    // Normalize and split into lines
    var lines = ( data + '' )
      // Trim whitespace
      .replace( /^\s+|\s+$/g, '' )
      // Trim blank lines
      .replace( /\r?\n(\s+|$)/g, '' )
      // Unfold folded lines
      .replace( /\r?\n[\x20\x09]+/g, '' )
      // Split into lines
      .split( /\r?\n/g )
    
    // Bail out, if we got nothing to parse
    if( !lines.length )
      return
    
    // Keep begin and end markers
    // for eventual error messages
    var begin, version, end, line
    
    // Check for begin marker
    if( begin = lines.shift() && /BEGIN:VCARD/i.test( begin ) ) {
      throw new SyntaxError(
        'Invalid format: expected "BEGIN:VCARD" but found "'+ begin +'"'
      )
    }
    
    // Check for the end marker
    if( end = lines.pop() && /END:VCARD/i.test( end ) ) {
      throw new SyntaxError(
        'Invalid format: expected "END:VCARD" but found "'+ end +'"'
      )
    }
    
    // Check for version number
    if( version = lines.pop() && /VERSION:\d\.\d/i.test( version ) ) {
      throw new SyntaxError(
        'Invalid format: expected "VERSION:\\d.\\d" but found "'+ version +'"'
      )
    }
    
    // Process each line
    while( line = lines.shift() ) {
      this.parseLine( line )
    }
    
    return this
    
  },
  
  /**
   * [parseLine description]
   * @param  {String} line
   * @return {vCard}
   */
  parseLine: function( line ) {
    
    var match = line
      // Trim whitespace
      .replace( /^\s+|\s+$/g, '' )
      // Match key / value
      .match( /^([^:;]+)[;:](.*)$/i )
    
    if( match == null ) {
      throw new SyntaxError(
        'Invalid format: "'+ line + '"'
      )
    }
    
    // Normalize key & value
    var key = match[1].toLowerCase().replace( /-/g, '_' )
    var value = match[2].replace( /^\s+|\s+$/g, '' )
    
    // Primitive fields (Cardinality=1)
    if( key.match( /version|gender|fn/ ) ) {
      this[ key ] = value
      return this
    }
    
    // Field data object
    var field = {}
    
    // Extract PARAM="VAL,VAL;VAL" (escaped value)
    // and PARAM=VAL,VAL (multi value)
    value = value.replace(
      /(?:(?:([a-z0-9-]+)=(")([^"]+)")|(?:([a-z0-9-]+)=([^";:]+)))(?:[;:]|$)/ig,
      function param( match ) {
        
        var escaped = arguments[2] === '"'
        var value = arguments[3] || arguments[5]
        var key = ( arguments[1] || arguments[4] )
          .toLowerCase().replace( /-/g, '_' )
        
        var values = value.split( /\s*,\s*/g )
        
        values.length < 2 || escaped ?
          field[ key ] = value :
          field[ key ] = values
        
        return ''
        
      }
    )
    
    // Set the actual literal value
    if( value.length ) {
      field.data = value
    }
    
    // ...
    this.set( key, field )
    
    return this
    
  },
  
  /**
   * [toString description]
   * @param  {Number} version
   * @return {String} 
   */
  toString: function( version ) {
    
    // version = version || this.version
    if( version ) {
      console.warn(
        'WARNING: String serialization is currently '+
        'only supported for vCard version 4.0'
      )
    }
    
    var lines = []
    var keys = Object.keys( this )
    
    lines.push( 'BEGIN:VCARD' )
    lines.push( 'VERSION:4.0' )
    
    for( var i = 0; i < keys.length; i++ ) {
      
      var key = keys[i]
      var values = this[ key ] != null ?
        [].concat( this[ key ] ) : []
      
      for( var k = 0; k < values.length; k++ ) {
        
        var value = values[k]
        var line = key.toUpperCase()
        
        if( key === 'version' )
          continue
        
        if( typeof value !== 'object' ) {
          lines.push( line + ':' + value )
          continue
        }
        
        for( var param in value ) {
          
          if( param === 'data' )
            continue
          
          line = line + ';' + param.toUpperCase() + '=' +
            [].concat( value[ param ] )
              .map( function( value ) {
                return /[;:,]/.test( value ) ?
                  '"' + value + '"' : value
              }).join()
          
        }
        
        if( value.data != null ) {
          line = line + ':' + value.data
        }
        
        lines.push( vCard.foldLine( line, 75 ) )
        
      }
      
    }
    
    lines.push( 'END:VCARD' )
    
    return lines.join( '\r\n' )
    
  }
  
}

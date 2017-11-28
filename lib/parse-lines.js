var camelCase = require('camelcase');
var Property = require( './property' )
var IGNORE_WRONG_TYPES = [ 'pref' ];

function set( object, key, value ) {
  if( Array.isArray( object[ key ] ) ) {
    object[ key ].push( value )
  } else if( object[ key ] != null ) {
    object[ key ] = [ object[ key ], value ]
  } else {
    object[ key ] = value
  }
}

function createParams( params, param ) {

  var parts = param.split( '=' )
  var k = camelCase( parts[0] )
  var value = parts[1]

  if( !value ) {
    value = parts[0]
    k = 'type'
  }

  if( k === 'type' ) {

    value.split( ',' )
        .filter( function( value ) {
            return IGNORE_WRONG_TYPES.indexOf( value.toLowerCase() ) === -1
        })
        .forEach( function( value ) {
            set( params, k, value )
        })

    return params

  }

  set( params, k, value )

  return params

}

function clearValue(value) {
    if (typeof value === 'string') {
        return value.replace( /\\n/g, '\n' )
    }

    return value;
}

function parseLines( lines ) {

  var data = {}

  // NOTE: Line format:
  //  PROPERTY[;PARAMETER[=VALUE]]:Attribute[;Attribute]
  var line = null
  var pattern = /^([^;:]+)((?:;(?:[^;:]+))*)(?:\:(.+))?$/i
  var len = lines.length - 1

  for( var i = 1; i < len; i++ ) {

    line = lines[i]

    var match = pattern.exec( line )
    if( !match ) continue;

    var name = match[1].split('.')
    var property = name.pop()
    var group = name.pop()
    var value = match[3]
    var params = match[2] ?
      match[2].replace( /^;|;$/g, '' ).split( ';' ) : []

    var propParams = params.reduce( createParams, group ? { group: group } : {})
    var propName = property.toLowerCase()
    var propVal = new Property( propName, clearValue(value), propParams )

    set( data, propName, propVal )

  }

  return data

}

module.exports = parseLines

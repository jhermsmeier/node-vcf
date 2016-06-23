var camelCase = require( 'camelcase' )
var Property = require( '../property' )

function v21( lines ) {

  var data = {}

  // NOTE: Line format:
  //  PROPERTY[;PARAMETER[=VALUE]]:Attribute[;Attribute]
  var line = null
  var pattern = /^([^;:]+)((?:;(?:[^;:]+))*)(?:\:(.+))?$/i

  for( var i = 1; i < lines.length - 1; i++ ) {

    line = lines[i]

    var match = pattern.exec( line )
    if( !match ) continue;

    var property = match[1]
    var params = match[2] ? match[2].replace( /^;|;$/g, '' ).split( ';' ) : []
    var value = match[3]

    params = params.reduce( function( params, param ) {

      var parts = param.split( '=' )
      var k = camelCase( parts[0] )
      var value = parts[1]

      if( value == null || value === '' ) {
        value = parts[0]
        k = 'type'
      }

      if( k === 'type' )
        value = value.toLowerCase()

      ;( k === 'type' ? value.split( ',' ) : [ value ] )
        .forEach( function( value ) {
          if( Array.isArray( params[k] ) ) {
            params[k].push( value )
          } else if( params[k] != null ) {
            params[k] = [ params[k], value ]
          } else {
            params[k] = value
          }
        })

      return params

    }, {})

    var propName = camelCase( property )
    var propVal = new Property( propName, value, params )

    if( Array.isArray( data[ propName ] ) ) {
      data[ propName ].push( propVal )
    } else if( data[ propName ] != null ) {
      data[ propName ] = [ data[ propName ], propVal ]
    } else {
      data[ propName ] = propVal
    }

  }

  return data

}

module.exports = v21

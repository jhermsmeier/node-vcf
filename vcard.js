
/**
 * vCard constructor function
 * @param  {String} data
 * @param  {String} [version]
 * @return {Object}
 */
function vCard( data ) {
  
  ( data + '' )
    // Trim blank lines
    .replace( /\r?\n(\s+|$)/g, '' )
    // Unfold folded lines
    .replace( /\r?\n[\x20\x09]+/g, '' )
    // Split into lines
    .split( /\r?\n/g )
    // Parse line
    .forEach( function( line ) {
      
      var match = line.trim().match( /^([^:;]+)[;:](.*)$/i )
      if( match ) {
        
        var key   = match[1].toLowerCase()
        var value = match[2].trim()
        
        // Ignore begin, end and empty values
        if( key === 'begin' || key === 'end' || value === '' )
          return void 0
        
        // Single value fields
        if( key.match( /^version|fn|gender$/i ) )
          return this[ key ] = value
        
        var field = {}
        
        // Extract types
        value = value.replace(
          /type=("?)([^;:]+)\1[;:]/ig,
          function( m, g1, types ) {
            field.type = field.type || []
            field.type = field.type.concat(
              types.toLowerCase().split( ',' )
            )
            return ''
          }
        )
        
        // Extract all other parameters
        value = value.replace(
          /([^=]+)=([^;:]+)[;:]/ig,
          function( m, param, value ) {
            param = param.toLowerCase()
            field[ param ] = value
            return ''
          }
        )
        
        switch( ( field.value || '' ).toLowerCase() ) {
          case 'boolean':
            field.data = value === 'true'
            break
          case 'integer':
            field.data = parseInt( value, 10 )
            break
          case 'float':
            field.data = parseFloat( value )
            break
          case 'timestamp':
            field.data = parseInt( value, 10 ) * 1000
            break
          default:
            field.data = value
            break
        }
        
        if( this[ key ] ) {
          this[ key ] = Array.isArray( this[ key ] )
            ? this[ key ].concat( field )
            : [ this[ key ], field ]
        } else {
          this[ key ] = field
        }
        
      }
      
    }.bind( this ))
  
}

vCard.prototype = {
  
  toString: function( version ) {
    
  }
  
}

module.exports = vCard

/**
 * vCard Property
 * @constructor
 * @param {String} field
 * @param {String} value
 * @param {Object} params
 * @return {Property}
 */
function Property( field, value, params ) {

  if( !(this instanceof Property) )
    return new Property( value )

  if( params != null )
    Object.assign( this, params )

  this._field = field
  this._data = value

  Object.defineProperty( this, '_field', { enumerable: false })
  Object.defineProperty( this, '_data', { enumerable: false })

}

/**
 * [fromJSON description]
 * @param  {Array} data
 * @return {Property}
 */
Property.fromJSON = function( data ) {

  var field = data[0]
  var params = data[1]

  if( !/text/i.test( data[2] ) )
    params.value = data[2]

  var value = Array.isArray( data[3] ) ?
    data[3].join( ';' ) : data[3]

  return new Property( field, value, params )

}

/**
 * Property prototype
 * @type {Object}
 */
Property.prototype = {

  constructor: Property,

  is: function( type ) {
    type = ( type + '' ).toLowerCase()
    return Array.isArray( this.type ) ?
      this.type.indexOf( type ) :
      this.type === type
  },

  clone: function() {
    return new Property( this._field, this._data, this )
  },

  toString: function() {
    return this._data
  },

  valueOf: function() {
    return this.toString()
  },

  toJSON: function() {

    var params = Object.assign({},this)

    if( params.value === 'text' ) {
      params.value = void 0
      delete params.value
    }

    var data = [ this._field, params, this.value || 'text' ]

    switch( this._field ) {
      default: data.push( this._data ); break
      case 'adr':
      case 'n':
        data.push( this._data.split( ';' ) )
    }

    return data

  },

}

// Exports
module.exports = Property

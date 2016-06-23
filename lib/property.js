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

// TODO
Property.fromJSON = function( data ) {
  throw new Error( 'Not implemented' )
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
    delete params.value

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

var VCard = require( './vcard' )

class DecodeStream extends stream.Transform {

  constructor( options ) {

    options = options || {}
    options.readableObjectMode = true

    super( options )

    this._data = ''

  }

  _transform( chunk, encoding, next ) {

    this._data += chunk

    var pattern = /END:VCARD/ig
    var match = null

    while( match = pattern.exec( this._data ) ) {
      // ...
    }

    next()

  }

}

module.exports = DecodeStream

var vCard = require( '..' )
var fs = require( 'fs' )
var assert = require( 'assert' )

suite( 'vCard', function() {

  suite( 'JSON / jCard', function() {

    test( 'fromJSON', function() {
      var data = require( './data/jcard' )
      var card = vCard.fromJSON( data )
    })

    test( 'toJSON', function() {
      var data = require( './data/jcard' )
      var card = vCard.fromJSON( data )
      assert.deepEqual( card.toJSON(), data )
    })

  })

})

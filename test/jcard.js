var vCard = require( '..' )
var fs = require( 'fs' )
var assert = require( 'assert' )

context( 'vCard', function() {

  context( 'JSON / jCard', function() {

    test( 'fromJSON', function() {
      var data = require( './data/jcard' )
      var card = vCard.fromJSON( data )
    })

    test( 'toJSON', function() {
      var data = require( './data/jcard' )
      var card = vCard.fromJSON( data )
      assert.deepEqual( card.toJSON(), data )
    })

    test( 'toJCard', function() {
      var data = require( './data/jcard' )
      var card = vCard.fromJSON( data )
      assert.deepEqual( card.toJCard(), data )
    })

  })

})

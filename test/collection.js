var vCard = require( '..' )
var fs = require( 'fs' )
var assert = require( 'assert' )

suite( 'vCard', function() {

  suite( 'Collection', function() {

    test( 'Parses multiple vCards form one file', function() {
      var data = fs.readFileSync( __dirname + '/data/multiple.vcf' )
      var cards = vCard.parseMultiple( data )
      assert.equal( cards.length, 3 )
    })

  })

})

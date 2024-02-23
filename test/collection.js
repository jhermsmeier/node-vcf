var vCard = require( '..' )
var fs = require( 'fs' )
var assert = require( 'assert' )

context( 'vCard', function() {

  context( 'Collection', function() {

    test( 'Parses multiple vCards form one file', function() {
      var data = fs.readFileSync( __dirname + '/data/multiple.vcf' )
      var cards = vCard.parse( data )
      assert.equal( cards.length, 3 )
    })

  })

})

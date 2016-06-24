var vCard = require( '..' )
var fs = require( 'fs' )
var assert = require( 'assert' )

suite( 'vCard', function() {

  suite( 'Photo', function() {

    test( 'should be able to read base64 encoded photo', function() {
      var data = fs.readFileSync( __dirname + '/data/photo-base64.vcf' )
      var card = vCard.parse( data )
      var photo = card.get( 'photo' )
      assert.ok( photo instanceof vCard.Property )
      assert.equal( photo.encoding, 'BASE64' )
      assert.equal( photo.type, 'jpeg' )
    })

  })

})

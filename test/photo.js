var vCard = require( '..' )
var fs = require( 'fs' )
var assert = require( 'assert' )

suite( 'vCard', function() {

  suite( 'Photo', function() {

    test( 'URL parameters should not become object properties', function() {
      var data = fs.readFileSync( __dirname + '/data/xing.vcf' )
      var card = new vCard().parse( data )
      var photo = card.get( 'photo' )
      assert.equal( photo.txtsize, null )
    })

    test( 'should be able to read base64 encoded photo', function() {
      var data = fs.readFileSync( __dirname + '/data/photo-base64.vcf' )
      var card = new vCard().parse( data )
      var photo = card.get( 'photo' )
      assert.ok( photo instanceof vCard.Property )
      assert.equal( photo.encoding, 'BASE64' )
      assert.equal( photo.type, 'jpeg' )
    })

  })

})

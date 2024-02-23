var vCard = require( '..' )
var fs = require( 'fs' )
var assert = require( 'assert' )

context( 'vCard', function() {

  context( 'Character Sets', function() {

    test( 'charset should not be part of value', function() {
      var data = fs.readFileSync( __dirname + '/data/xing.vcf' )
      var card = new vCard().parse( data )
      var fullName = card.get( 'fn' )
      assert.strictEqual( fullName.valueOf().indexOf( 'CHARSET' ), -1 )
      assert.equal( fullName.valueOf(), 'Hans-Peter Mustermann' )
      assert.strictEqual( fullName.charset, 'ISO-8859-1' )
    })

  })

})

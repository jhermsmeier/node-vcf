var vCard = require( '..' )
var fs = require( 'fs' )
var assert = require( 'assert' )

suite( 'vCard', function() {

  suite( 'Real World Anomalies', function() {

    test( 'should parse a vCard with empty lines (android)', function() {
      var data = fs.readFileSync( __dirname + '/data/empty-lines.vcf' )
      var card = vCard.parse( data )
      assert.ok( card.get( 'rev' ) )
      assert.ok( card.get( 'photo' ) )
      assert.strictEqual( card.get( 'tel' ).length, 2 )
    })

  })

})

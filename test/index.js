var vCard = require( '..' )
var fs = require( 'fs' )
var assert = require( 'assert' )

suite( 'vCard', function() {

  suite( 'Character Sets', function() {

    test( 'charset should not be part of value', function() {
      var data = fs.readFileSync( __dirname + '/data/xing.vcf' )
      var card = new vCard().parse( data )
      assert.strictEqual( card.data.fn.toString().indexOf( 'CHARSET' ), -1 )
      assert.equal( card.data.fn.toString(), 'Hans-Peter Mustermann' )
      assert.strictEqual( card.data.fn.charset, 'ISO-8859-1' )
    })

  })

  suite( 'Photo URL', function() {

    test( 'URL parameters should not become object properties', function() {
      var data = fs.readFileSync( __dirname + '/data/xing.vcf' )
      var card = new vCard().parse( data )
      assert.equal( card.data.photo.txtsize, null )
    })

  })

  suite( 'Multi', function() {

    test( 'Parses multiple vCards form one file', function() {
      var data = fs.readFileSync( __dirname + '/data/multiple.vcf' )
      var cards = vCard.parseMultiple( data )
      assert.equal( cards.length, 3 )
    })

  })

})

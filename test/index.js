var vCard = require( '..' )
var fs = require( 'fs' )
var assert = require( 'assert' )

suite( 'vCard', function() {
  
  suite( 'Character Sets', function() {
    
    test( 'charset should not be part of value', function() {
      var data = fs.readFileSync( __dirname + '/data/xing.vcf' )
      var card = new vCard( data )
      assert.strictEqual( card.fn.indexOf( 'CHARSET' ), -1 )
    })
    
  })
  
  suite( 'Photo URL', function() {
    
    test( 'URL parameters should not become object properties', function() {
      var data = fs.readFileSync( __dirname + '/data/xing.vcf' )
      var card = new vCard( data )
      assert.equal( card.photo.txtsize, null )
    })
    
  })
  
})

var vCard = require( '..' )
var fs = require( 'fs' )
var assert = require( 'assert' )

suite( 'vCard', function() {

  suite( 'Character Sets', function() {

    test( 'charset should not be part of value', function() {
      var data = fs.readFileSync( __dirname + '/data/xing.vcf' )
      var card = new vCard( data )
      assert.strictEqual( typeof card.fn, 'object' )
      assert.strictEqual( card.fn.data.indexOf( 'CHARSET' ), -1 )
    })

  })

  suite( 'Photo URL', function() {

    test( 'URL parameters should not become object properties', function() {
      var data = fs.readFileSync( __dirname + '/data/xing.vcf' )
      var card = new vCard( data )
      assert.equal( card.photo.txtsize, null )
    })

  })

  suite( 'Markers', function() {

    test( 'should throw on missing BEGIN marker', function() {
      var data = 'VERSION:4.0\nURL;TYPE=work:http://www.example.comEND:VCARD\n'
      assert.throws( function() {
        vCard.parse( data )
      })
    })

    test( 'should throw on misplaced BEGIN marker', function() {
      var data = 'VERSION:4.0\nBEGIN:VCARD\nURL;TYPE=work:http://www.example.comEND:VCARD\n'
      assert.throws( function() {
        vCard.parse( data )
      })
    })

    test( 'should throw on missing VERSION marker', function() {
      var data = 'BEGIN:VCARD\nURL;TYPE=work:http://www.example.comEND:VCARD\n'
      assert.throws( function() {
        vCard.parse( data )
      })
    })

    test( 'should throw on misplaced VERSION marker', function() {
      var data = 'BEGIN:VCARD\nURL;TYPE=work:http://www.example.com\nVERSION:4.0\nEND:VCARD\n'
      assert.throws( function() {
        vCard.parse( data )
      })
    })

    test( 'should throw on missing END marker', function() {
      var data = 'BEGIN:VCARD\nVERSION:4.0\nURL;TYPE=work:http://www.example.com\n'
      assert.throws( function() {
        vCard.parse( data )
      })
    })

    test( 'should throw on misplaced END marker', function() {
      var data = 'BEGIN:VCARD\nVERSION:4.0\nEND:VCARD\nURL;TYPE=work:http://www.example.com\n'
      assert.throws( function() {
        vCard.parse( data )
      })
    })

  })

})

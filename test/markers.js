var vCard = require( '..' )
var fs = require( 'fs' )
var assert = require( 'assert' )

suite( 'vCard', function() {

  suite( 'Markers', function() {

    test( 'should throw on missing BEGIN marker', function() {
      var data = 'VERSION:4.0\r\nURL;TYPE=work:http://www.example.comEND:VCARD\r\n'
      var card = new vCard()
      assert.throws( function() { card.parse( data ) })
    })

    test( 'should throw on misplaced BEGIN marker', function() {
      var data = 'VERSION:4.0\r\nBEGIN:VCARD\r\nURL;TYPE=work:http://www.example.comEND:VCARD\r\n'
      var card = new vCard()
      assert.throws( function() { card.parse( data ) })
    })

    test( 'should throw on missing VERSION marker', function() {
      var data = 'BEGIN:VCARD\r\nURL;TYPE=work:http://www.example.comEND:VCARD\r\n'
      var card = new vCard()
      assert.throws( function() { card.parse( data ) })
    })

/* TODO: We currently don't throw on a misplaced 4.0 version. Is it required or to be more precise, "useful"?
    test( 'should throw on misplaced VERSION marker', function() {
      var data = 'BEGIN:VCARD\r\nURL;TYPE=work:http://www.example.com\r\nVERSION:4.0\r\nEND:VCARD\r\n'
      var card = new vCard()
      assert.throws( function() { card.parse( data ) })
    })*/

    test( 'should throw on missing END marker', function() {
      var data = 'BEGIN:VCARD\r\nVERSION:4.0\r\nURL;TYPE=work:http://www.example.com\r\n'
      var card = new vCard()
      assert.throws( function() { card.parse( data ) })
    })

    test( 'should throw on misplaced END marker', function() {
      var data = 'BEGIN:VCARD\r\nVERSION:4.0\r\nEND:VCARD\r\nURL;TYPE=work:http://www.example.com\r\n'
      var card = new vCard()
      assert.throws( function() { card.parse( data ) })
    })

  })

})

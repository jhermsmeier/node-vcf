var vCard = require( '..' )
var fs = require( 'fs' )
var assert = require( 'assert' )

context( 'vCard', function() {

  context( 'vCard Version Strings', function() {

    test( 'toString version 4.0 should contain type with lowercase values', function() {
      var data = fs.readFileSync( __dirname + '/data/vcard-3.0.vcf' )
      var card = new vCard().parse( data )
      var v40String = card.toString('4.0')
      assert.notEqual( v40String.indexOf('TEL;TYPE=work,voice:'), -1 )
      assert.notEqual( v40String.indexOf('ADR;TYPE=work:'), -1 )
      assert.notEqual( v40String.indexOf('EMAIL;TYPE=pref,'), -1 )
    })

    test( 'toString version 3.0 should contain type with uppercase values', function() {
      var data = fs.readFileSync( __dirname + '/data/vcard-3.0.vcf' )
      var card = new vCard().parse( data )
      var v30String = card.toString('3.0')
      assert.notEqual( v30String.indexOf('TEL;TYPE=WORK,VOICE:'), -1)
      assert.notEqual( v30String.indexOf('ADR;TYPE=WORK:'), -1 )
      assert.notEqual( v30String.indexOf('EMAIL;TYPE=PREF,'), -1 )
    })

    test( 'toString version 2.1 should contain values with uppercase but no type string', function() {
      var data = fs.readFileSync( __dirname + '/data/vcard-3.0.vcf' )
      var card = new vCard().parse( data )
      var v21String = card.toString('2.1')
      assert.notEqual( v21String.indexOf('TEL;WORK;VOICE:'), -1)
      assert.notEqual( v21String.indexOf('ADR;WORK:'), -1 )
      assert.notEqual( v21String.indexOf('EMAIL;PREF;'), -1 )
    })
  })

})

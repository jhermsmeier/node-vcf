
var fs = require( 'fs' )
var vcard = require( '../vcard.js' )
var util = require( 'util' )

var read = fs.readFileSync

var vcf = {
  2.1: read( __dirname + '/2.1.vcard' ),
  3.0: read( __dirname + '/3.0.vcard' ),
  4.0: read( __dirname + '/4.0.vcard' ),
}

// for( var version in vcf ) {
//   with( console ) {
//     log( '' )
//     log( 'VERSION', version )
//     log( new vcard( vcf[ version ] ) )
//   }
// }

var cards = fs.readdirSync( __dirname + '/cards' )
  .forEach( function( file ) {
    var card = read( __dirname + '/cards/' + file )
    console.log( '' )
    console.log( file )
    console.log( util.inspect( new vcard( card ), false, null, true ) )
  })

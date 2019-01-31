var vCard = require( '..' )
var fs = require( 'fs' )
var util = require( 'util' )
var argv = process.argv.slice( 2 )

function inspect( value ) {
  return util.inspect( value, {
    colors: process.stdout.isTTY,
    depth: null,
  })
}

var filename = argv.shift()
var data = fs.readFileSync( filename )
var card = new vCard().parse( data )

console.log( inspect( card ) )

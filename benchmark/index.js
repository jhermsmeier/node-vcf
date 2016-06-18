var fs = require( 'fs' )
var vCard = require( '..' )

;[ '2.1', '3.0', '4.0' ].forEach( function( version ) {

  var filename = __dirname + '/../test/data/version-' + version + '.vcf'
  var input = fs.readFileSync( filename, 'utf8' )

  suite( 'vCard ' + version, function() {

    bench( '.parse()', function() {
      var card = new vCard()
      card.parse( input )
    })

  })

})

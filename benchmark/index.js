var fs = require( 'fs' )
var vCard = require( '..' )

;[ '2.1', '3.0', '4.0' ].forEach( function( version ) {

  var filename = __dirname + '/../test/data/vcard-' + version + '.vcf'
  var input = fs.readFileSync( filename, 'utf8' )
  var instance = new vCard()
  instance.parse( input )

  suite( 'vCard ' + version, function() {

    bench( 'vCard.normalize()', function() {
      return vCard.normalize( input )
    })

    bench( 'vCard.isSupported()', function() {
      return vCard.isSupported( version )
    })

    bench( 'vCard#parse()', function() {
      var card = new vCard()
      return card.parse( input )
    })

    bench( 'vCard#toJSON()', function() {
      return instance.toJSON()
    })

  })

})

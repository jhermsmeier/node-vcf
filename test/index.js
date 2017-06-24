var vCard = require( '..' )
var fs = require( 'fs' )
var assert = require( 'assert' )

suite( 'vCard', function() {

  suite( 'static', function() {

    test( 'normalize should trim empty lines', function() {
      var data = fs.readFileSync( __dirname + '/data/empty-lines.vcf', 'utf8' )
      var str = vCard.normalize( data )
      assert.ok( /^\s*$/m.test( str ) )
      assert.ok( str.indexOf( '\r\nREV:2014-03-01T22:11:10Z\r\nEND' ) !== -1 )
    })

  })

  suite( 'instance', function() {

    var card = null

    suiteSetup( 'parse', function() {
      var data = fs.readFileSync( __dirname + '/data/vcard-4.0.vcf' )
      card = new vCard().parse( data )
    })

    test( 'should not have BEGIN as property', function() {
      assert.equal( card.get( 'begin' ), null )
    })

    test( 'should not have END as property', function() {
      assert.equal( card.get( 'end' ), null )
    })

    test( 'version number', function() {
      assert.strictEqual( card.version, '4.0' )
      assert.strictEqual( card.get( 'version' ).valueOf(), '4.0' )
    })

    test( 'name', function() {
      assert.strictEqual( card.get( 'n' ).valueOf(), 'Gump;Forrest;;;' )
    })

    test( 'full name', function() {
      assert.strictEqual( card.get( 'fn' ).valueOf(), 'Forrest Gump' )
    })

    test( 'property arrays', function() {
      assert.ok( Array.isArray( card.get( 'tel' ) ) )
      assert.ok( card.get( 'tel' )[0] instanceof vCard.Property )
    })

    test( 'group properties', function() {
      assert.ok( card.get( 'tel' )[2].group === 'item1' )
    })

    test( 'get() should return property clones', function() {
      assert.notStrictEqual( card.data.email, card.get( 'email' ) )
    })

    test( 'set() should set a property', function() {
      card.set( 'role', 'Communications' )
      assert.strictEqual( card.get( 'role' ).valueOf(), 'Communications' )
    })

    test( 'set() should overwrite arrays of properties', function() {
      var address = ';;100 Waters Edge;Baytown;LA;30314;United States of America'
      card.set( 'adr', address, {
        type: [ 'work' ],
        label: '"100 Waters Edge\nBaytown, LA 30314\nUnited States of America"',
      })
      assert.strictEqual( Array.isArray( card.get( 'adr' ) ), false )
      assert.strictEqual( card.get( 'adr' ).valueOf(), address )
    })

    test( 'add() should add a property instead of replacing', function() {
      var address = ';;42 Plantation St.;Baytown;LA;30314;United States of America'
      card.add( 'adr', address, {
        type: [ 'home' ],
        label: '"42 Plantation St.\nBaytown, LA 30314\nUnited States of America"',
      })
      assert.strictEqual( Array.isArray( card.get( 'adr' ) ), true )
      assert.strictEqual( card.get( 'adr' )[1].valueOf(), address )
    })

    test( 'setProperty() should set (replace) a raw vCard.Property', function() {
      var address = ';;100 Waters Edge;Baytown;LA;30314;United States of America'
      var property = new vCard.Property( 'adr', address, {
        type: [ 'work' ],
        label: '"100 Waters Edge\nBaytown, LA 30314\nUnited States of America"',
      })
      card.setProperty( property )
      assert.strictEqual( Array.isArray( card.get( 'adr' ) ), false )
      assert.strictEqual( card.get( 'adr' ).valueOf(), address )
    })

    test( 'addProperty() should add a raw vCard.Property', function() {
      var address = ';;42 Plantation St.;Baytown;LA;30314;United States of America'
      var property = new vCard.Property( 'adr', address, {
        type: [ 'home' ],
        label: '"42 Plantation St.\nBaytown, LA 30314\nUnited States of America"',
      })
      card.addProperty( property )
      assert.strictEqual( Array.isArray( card.get( 'adr' ) ), true )
      assert.strictEqual( card.get( 'adr' )[1].valueOf(), address )
    })

    test( 'toString() should render populated properties', function() {
      var card = new vCard()
      card.set( 'tel', '000' )
      assert.ok( /TEL:000/i.test( card.toString() ) )
    })

    test( 'toString() should not render empty properties', function() {
      var card = new vCard()
      card.set( 'tel', undefined )
      assert.ok( !/TEL/i.test( card.toString() ) )
    })

    test( 'toString() should render properties with group by prefixing the group to the property name', function() {
      var card = new vCard()
      card.set( 'tel', '000' , { group: 'item1' })
      assert.ok( /item1.TEL:000/i.test( card.toString() ) )
    })

  })

})

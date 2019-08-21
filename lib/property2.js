class Property extends Map {

  constructor( value, ...argv ) {

    super( ...argv )

    this.value = value || null
    this.group = null

  }

}

module.exports = Property

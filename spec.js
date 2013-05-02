
// {property};VALUE=uri:http://example.com
var properties = [
  'SOURCE',
  'KIND',
  'XML',
  'FN',
  'N',
  'NICKNAME',
  'PHOTO',
  'BDAY',
  'ANNIVERSARY',
  'GENDER',
  'ADR',
  'TEL',
  'EMAIL',
  'IMPP',
  'LANG',
  'TZ',
  'GEO',
  'TITLE',
  'ROLE',
  'LOGO',
  'ORG',
  'MEMBER',
  'RELATED',
  'CATEGORIES',
  'NOTE',
  'PRODID',
  'REV',
  'SOUND',
  'UID',
  'CLIENTPIDMAP',
  'URL',
  'VERSION',
  'KEY',
  'FBURL',
  'CALADRURI',
  'CALURI',
]

// TEL;{parameter}=
var parameters = [
  'LANGUAGE',
  'VALUE',
  'PREF',
  'ALTID',
  'PID',
  'TYPE',
  'MEDIATYPE',
  'CALSCALE',
  'SORT-AS',
  'GEO',
  'TZ',
]

// TEL;VALUE={data_type}:tel:+1-666-666-6666
var value_data_types = [
  'BOOLEAN',
  'DATE',
  'DATE-AND-OR-TIME',
  'DATE-TIME',
  'FLOAT',
  'INTEGER',
  'LANGUAGE-TAG',
  'TEXT',
  'TIME',
  'TIMESTAMP',
  'URI',
  'UTC-OFFSET',
]

var property_values = {
  BEGIN: [ 'VCARD' ],
  END: [ 'VCARD' ],
  KIND: [
    'individual',
    'group',
    'org',
    'location'
  ]
}

var parameter_values = {
  FN:           { TYPE: [ 'work', 'home' ] },
  NICKNAME:     { TYPE: [ 'work', 'home' ] },
  PHOTO:        { TYPE: [ 'work', 'home' ] },
  ADR:          { TYPE: [ 'work', 'home' ] },
  EMAIL:        { TYPE: [ 'work', 'home' ] },
  IMPP:         { TYPE: [ 'work', 'home' ] },
  LANG:         { TYPE: [ 'work', 'home' ] },
  TZ:           { TYPE: [ 'work', 'home' ] },
  GEO:          { TYPE: [ 'work', 'home' ] },
  TITLE:        { TYPE: [ 'work', 'home' ] },
  ROLE:         { TYPE: [ 'work', 'home' ] },
  LOGO:         { TYPE: [ 'work', 'home' ] },
  ORG:          { TYPE: [ 'work', 'home' ] },
  CATEGORIES:   { TYPE: [ 'work', 'home' ] },
  NOTE:         { TYPE: [ 'work', 'home' ] },
  SOUND:        { TYPE: [ 'work', 'home' ] },
  URL:          { TYPE: [ 'work', 'home' ] },
  KEY:          { TYPE: [ 'work', 'home' ] },
  FBURL:        { TYPE: [ 'work', 'home' ] },
  CALADRURI:    { TYPE: [ 'work', 'home' ] },
  CALURI:       { TYPE: [ 'work', 'home' ] },
  BDAY:         { CALSCALE: [ 'gregorian' ] },
  ANNIVERSARY:  { CALSCALE: [ 'gregorian' ] },
  TEL: {
    TYPE: [
      'work', 'home', 'text', 'voice',
      'fax', 'cell', 'video', 'pager',
      'textphone'
    ]
  },
  RELATED: {
    TYPE: [
      'work', 'home', 'contact', 'acquaintance',
      'friend', 'met', 'co-worker', 'colleague',
      'co-resident', 'neighbor', 'child', 'parent',
      'sibling', 'spouse', 'kin', 'muse', 'crush',
      'date', 'sweetheart', 'me', 'agent', 'emergency'
    ]
  }
}
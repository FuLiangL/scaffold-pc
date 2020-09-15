module.exports = {
  '/api/user': {
    code: 10001,
    responseMsg: '',
    data: {
      'age|1-100': 1,
      'name|1': [ 'John', 'Mike', 'Kenny', 'Kat', 'Cat', 'Aqua', 'Saya', 'Ellie' ],
      'gender|1': [ 'male', 'female' ],
      hobit: '@pick(["Football", "Basketball"])',
      id: '@id',
      avatar: '@image',
    },
  },
}

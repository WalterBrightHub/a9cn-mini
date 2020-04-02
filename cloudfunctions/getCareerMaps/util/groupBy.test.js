const groupBy = require('./groupBy')

test('example 1', () => {
  expect(
    groupBy([
      { class: '8', name: 'wang' },
      { class: '8', name: 'zhao' },
      { class: '9', name: 'liu' },
      { class: '9', name: 'wu' },
      { class: '6', name: 'hua' },

    ],
      'class')
  ).toEqual({
    '6': [
      { name: 'hua' }
    ],
    '8': [
      { name: 'wang' },
      { name: 'zhao' }
    ],
    '9': [
      { name: 'liu' },
      { name: 'wu' }
    ],
  })
})


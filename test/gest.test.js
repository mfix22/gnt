/* global test, expect */
const graphicli = require('graphicli')
const schema = require('./_schema')

const gest = graphicli(schema)

test('Test types', async () => {
  const res = await gest(`
    {
      phone(value:"(507)-227-3854")
      date(value: "2017-05-07T20:38:02.854")
      card(value: "4111111111111111")
    }
  `)
  expect(res).toMatchSnapshot()
})

/* global test, expect */
const graphicli = require('graphicli')
const schema = require('./_schema')

const gest = graphicli(schema)

test('Test types', async () => {
  const res = await gest(`
    {
      email(value:"")
      phone(value:"(507)-227-3854")
      date(value: "2017-05-07T20:38:02.854")
      card(value: "4111 1111 1111 1111"),
      state(value: MN)
      zip1(value: "00000")
      zip2(value: "00631")
    }
  `)
  expect(res).toMatchSnapshot()
})

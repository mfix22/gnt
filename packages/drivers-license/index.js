// Source: https://ntsi.com/drivers-license-format/

const { GraphQLScalarType, GraphQLError, Kind } = require('graphql')
const USStateType = require('graphql-types-us-state')
const {
  regex,
  whole,
  numeric,
  alpha,
  or: _or,
  and,
  repeat
} = require('rexrex')

// Wrap each option with ^$
const or = (...xs) => _or(...xs.map(whole))

const states = new Set(USStateType._values.map(v => v.value))

const stateRegexMap = {
  AL: whole(numeric(1,7)),
  AK: whole(numeric(1,7)),
  AZ: or(
    and(alpha(1), numeric(1, 8)),
    and(alpha(2), numeric(2, 5)),
    numeric(9)
  ),
  AR: whole(numeric(4, 9)),
  CA: whole(and(alpha(1), numeric(7))),
  CO: or(
    numeric(9),
    and(alpha(1), numeric(3,6)),
    and(alpha(2), numeric(2,5))
  ),
  CT: whole(numeric(9)),
  DE: whole(numeric(1,7)),
  FL: whole(and(alpha(1), numeric(12))),
  GA: whole(numeric(7,9)),
  HI: or(
    and(alpha(1), numeric(8)),
    numeric(9)
  ),
  ID: or(
    and(alpha(2), numeric(6), alpha(1)),
    numeric(9)
  ),
  IL: whole(and(alpha(1), numeric(11, 12))),
  IN: or(
    and(alpha(1), numeric(9)),
    numeric(9,10)
  ),
  IA: or(
    numeric(9),
    and(numeric(3), alpha(2), numeric(4))
  ),
  KS: or(
    and(alpha(1), numeric(1), alpha(1), numeric(1), alpha(1)),
    and(alpha(1), numeric(8)),
    numeric(9)
  ),
  KY: or(
    and(alpha(1), numeric(8, 9)),
    numeric(9)
  ),
  LA: whole(numeric(1,9)),
  ME: or(
    and(numeric(7), alpha(0,1)),
    numeric(8)
  ),
  MD: whole(and(alpha(1), numeric(12))),
  MA: or(
    and(alpha(1), numeric(8)),
    numeric(9)
  ),
  MI: or(
    and(alpha(1), numeric(10)),
    and(alpha(1), numeric(12))
  ),
  MN: whole(and(alpha(1), numeric(12))),
  MS: whole(numeric(9)),
  MO: or(
    and(alpha(1), numeric(5, 9)),
    and(alpha(1), numeric(6), 'R'),
    and(numeric(8), alpha(2)),
    and(numeric(9), alpha(0, 1))
  ),
  MT: or(
    and(alpha(1), numeric(8)),
    numeric(13, 14),
    numeric(9)
  ),
  NE: whole(and(alpha(1), numeric(6, 8))),
  NV: or(
    numeric(9, 10),
    numeric(12),
    and('X', numeric(8))
  ),
  NH: whole(and(numeric(2), alpha(3), numeric(5))),
  NJ: whole(and(alpha(1), numeric(14))),
  NM: whole(numeric(8, 9)),
  NY: or(
    and(alpha(1), numeric(7)),
    and(alpha(1), numeric(18)),
    and(numeric(8, 9)),
    and(numeric(16)),
    and(alpha(8)),
  ),
  NC: whole(numeric(1, 12)),
  ND: or(
    and(alpha(3), numeric(6)),
    numeric(9)
  ),
  OH: or(
    and(alpha(1), numeric(4, 8)),
    and(alpha(2), numeric(3, 7)),
    numeric(8)
  ),
  OK: whole(and(alpha(0, 1), numeric(9))),
  OR: whole(numeric(1, 9)),
  PA: whole(numeric(8)),
  RI: or(
    numeric(7),
    and(alpha(1), numeric(6))
  ),
  SC: whole(numeric(5, 11)),
  SD: or(numeric(6, 10), numeric(12)),
  TN: whole(numeric(7, 9)),
  TX: whole(numeric(7, 8)),
  UT: whole(numeric(4, 10)),
  VT: or(numeric(8), and(numeric(7), 'A')),
  VA: or(
    and(alpha(1), numeric(9, 11)),
    numeric(9)
  ),
  WA: or(
    alpha(1, 7),
    repeat('[a-zA-Z0-9\\*]', 12)
  ),
  WV: or(
    numeric(7),
    and(alpha(1, 2), numeric(5, 6))
  ),
  WI: whole(and(alpha(1), numeric(13))),
  WY: whole(numeric(9, 10))
}

const parse = ({ state, license: l } = {}) => {
  if (typeof l !== 'string') throw new GraphQLError('`license` must be of type string')
  if (typeof state !== 'string') throw new GraphQLError('`state` must be of type string')

  const license = l.trim()
  if (states.has(state)) {
    const rex = regex(stateRegexMap[state])
    if (license.match(rex)) return { state, license }

    throw new GraphQLError(`Licenses from ${state} must match: ${rex}`)
  }

  throw new GraphQLError(`${state} is not a valid US state accronym`)
}

module.exports = new GraphQLScalarType({
  name: 'DriversLicense',
  description: 'US State Drivers License. Returns `{ state, license }` if valid, `null` otherwise',
  serialize: parse,
  parseValue: parse,
  parseLiteral(ast) {
    if (ast.kind === Kind.OBJECT) {
      return parse(ast.value)
    }
    return null;
  }
})

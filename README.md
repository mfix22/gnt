# *G*raphQL *N*ormalized *T*ypes
The gin-n-tonic of GraphQL types: simple, final, clean. Normalize your common data with GraphQL Scalar types.

[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](#contributing)
## Usage
```bash
$ npm install --save gnt
```

and then add to your schema:

```javascript
const { Phone, UnixDate, CreditCard, State, ZipCode } = require('gnt')

{
  name: 'Query',
  fields: {
    phone: { type: Phone },
    date:  { type: UnixDate },
    card:  { type: CreditCard },
    state: { type: State }
    zipcode: { type: ZipCode }
  }  
}
```

## Examples
Each of these types can be installed individually using there 'Package Name' shown below

| Type           | Package Name     | Input Example     | Output Example    |
| :------------- | :-------------   | :-------------    | :-------------    |
| Phone          | `graphql-types-phone`   | `'(817) 569-8900'` | `'+18175698900'` |
| Zipcode        | `graphql-types-zipcode` | `'55902'`, `00000` | `'55902'`, `null` |
| UnixDate       | `graphql-types-unix-timestamp` | `2017-05-07T14:47:59.438`, `Date` | `1494186489` |
| CreditCard     | `graphql-types-credit-card` | `'4111111111111111'` | ```{ number: '4111111111111111', cardType: 'VISA', validCVV: false, validExpiryMonth: false, validExpiryYear: false, isExpired: true }``` |
| NonEmptyString | `graphql-types-non-empty-string` | `''` | `null`         |
| JSON           | `graphql-type-json` | `Any` | `JSON Object`  |
#### Enum Types
| Type           | Package Name     | Input Example     |
| :------------- | :-------------   | :-------------    |
| USState        | `graphql-types-us-state`    | `US`, `CA`, `DE` `...` |

## Contributing
Contributions are more than welcome! This repo is not meant to be owned by me (and if there is a more suitable owner please [let me know](https://github.com/mfix22/gnt/issues)), but rather by the commuity. 

If you have any idea for new types, please submit an issue or PR!

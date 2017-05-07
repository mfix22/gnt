# GraphQL Normalized Types
Normalize your common data with GraphQL

## Usage
```bash
$ npm install --save gnt
```

and then add to your schema:

```javascript
const { Phone, UnixDate } = require('gnt')
...
args: {
  phoneNumber: { type: new GraphQLNonNull(PhoneNumber) },
  date: { type: new GraphQLNonNull(UnixDate) }
}
```

## Example
```javascript
Phone
  Input:  '(817) 569-8900'
  Output: '+18175698900'

UnixDate
  Input:  '2017-05-07T14:47:59.438' | new Date()
  Output: 1494186489
```

## lzc-doing

[![NPM version](https://img.shields.io/npm/v/lzc-doing.svg)](https://www.npmjs.com/package/lzc-doing)

```javascript
const doin=require('./index')({
    interval:200,
    text:'lzc-doing'
}).start('hhh start...')
doin.text=doin.text+' hhh'
setTimeout(() => {
    doin.success('hhh end !!!')
    doin.fail('hhh end !!!')
}, 3000);
```
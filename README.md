# Vite example: preserving class names in library

When building libraries with Vite one of the undesired effects is that class names are minified which results in their output being different than expected.

For example, let's assume there is a `Person` class in the library like so:

```typescript
export class Person {
  constructor(public name: string) {}
}
```

When the code is put through Vite it will result in something like this:

```javascript
class s {
  constructor(e) {
    this.name = e;
  }
}
export {
  s as Person
}
```

If later on one would like to `console.log()` an instance of the class then instead of getting something like this:

```
Person { name: 'Jane' }
```

what will be printed is something like this:

```
s { name: 'Jane' }
```

That might be problematic on many levels if you rely on the class names not being changed. The way to fix it is to add the following Vite configuration option:

```javascript
export default defineConfig({
  build: {
    minifyIdentifiers: false
  }
})
```

This will result in just bunding the code together into a single file but preserving the names of the declared classes.

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
}
export {
  Person,
};
```

## Remark about `keepNames: true`

There is a second option that could be considered when configuring Vite to keep the original names of the classes. That option is `keepNames: true`. Unfortunately, what it does is something completely different. Let's see an example of what it results in:

```javascript
var i = Object.defineProperty;
var a = (h, t) => i(h, "name", { value: t, configurable: !0 });
const c = class c {
  constructor(t) {
    this.name = t;
  }
};
a(c, "Person");
let s = c;
export {
  s as Person
};
```

In the end, when `console.log`ing an instance of `Person` we still will get the same name, `s`, instead of `Person` but the constructor's `name` property will have the proper value of `'Person'` instead. This code is not only much harder to read but also doesn't do what is expected.

## Using both options

When both options are applied, the result is even more strange:

```javascript
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
const _Person = class _Person {
  constructor(name) {
    this.name = name;
  }
};
__name(_Person, "Person");
let Person = _Person;
export {
  Person
};
```

As you can see not only is the `Person` class name changed to `_Person` but the constructor's `name` property is still updated to be `'Person'`.

## Final thoughts

The conclusion is that if one wants to preserve the names of classes one should use the `build.minifyIdentifiers: false` option _without_ setting the `build.keepNames = true`, which guarantees that the identifier is acutally preserved and no further modifications to names of classes is done.

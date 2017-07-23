# Webpack Reflect

> Provides rudimentary runtime reflective capabilities over a Webpack bundle.

Webpack Reflect will tell you- at runtime and from the console- what is in your bundle and give you tools to require it.

As opposed to [webpack-runtime-require](https://github.com/Venryx/webpack-runtime-require), WebpackReflect is a plugin.

# Usage

Add the plugin to your webpack configuration file (often webpack.config.js):

```
var WebpackReflectPlugin= require("webpack-reflect").Plugin
module.exports= {
	plugins: [
		new WebpackReflectPlugin()
		// ....
	]
	// ....
}
```

From there, there are three options for consuming:

1. Use `reflection.js` from other components in your bundle to reflect
2. Use `require.js` from other componenets in your bundle to dynamically quasi-`require()`.
3. Ask for `global.js` from other components in your bundle to install a `window.reflectRequire` that can be used from the console!


Entrypoint file:
```
import { default as _ } "lodash"
import "webpack-reflect/global"
_.defaults({a: 1}, {b: 2})
```

Then from the console you can: `var _ = reflectRequire("lodash")` to get your lodash module!

Note that Webpack will not expose unused exports, and at the moment Webpack-Reflect has no built in tooling to combat this masking (the code is in many times included in the bundle but Webpack wrapper only makes available exports it intends to use). If you have exports you want, make sure you use them inside your bundle! Also note that Webpack is awfully tricky about sniffing for dead-code; it will statically discard this tree, replacing your `1+1 == 1` conditional with a false and ignoring the lodash usage; `if(1 == 2){ _.default({a: 1}, {b: 2}) }`.

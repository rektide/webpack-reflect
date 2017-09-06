var Reflections= require( "./reflections")
var numberToIdentifier= require( "./number-to-identifier")

console.log("refl", Reflections)

function Require( name){
	var
	  data= Require._reflections[ name],
	  rawModule= __webpack_require__( data.id)
	if( !data.usedExports){
		return rawModule
	}
	var
	  module= {},
	  matches= 0
	for( var i in data.usedExports){
		var
		  name= data.usedExports[ i],
		  identifier= numberToIdentifier[ i],
		  value= rawModule[ identifier]
		module[ name]= value
		if( value!== undefined){
			++matches
		}
	}
	if( !matches){
		// cjs module.exports = ... had a 'default' usedExports with undefined value
		// probably smarter heuristics could handle this better but doing this last via detection feels safe
		return rawModule
	}
	return module
}
Require._reflections = Reflections

module.exports= Require

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
	var module= {}
	for( var i in data.usedExports){
		var
		  name= data.usedExports[ i],
		  identifier= numberToIdentifier[ i]
		module[ name]= rawModule[ identifier]
	}
	return module
}
Require._reflections = Reflections

module.exports= Require

var Reflections= require( "./reflections")
var numberToIdentifier= require( "./number-to-identifier")

function Require( name){
	var
	  data= Reflections[ name],
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

module.exports= Require

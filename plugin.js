function WebpackReflectPlugin() {}

WebpackReflectPlugin.prototype.apply = function( compiler){
	compiler.plugin('compilation', function( compilation){
		var
		  _payload,
		  _target
		compilation.plugin("record-modules", function( modules, records){
			_payload= {}
			for( var module of modules){
				var payloadModule= _payload[ module.portableId]= {
					id: module.id
				}
				if( module.usedExports&& module.usedExports!== true){
					// copy in non-trivial usedExports
					payloadModule.usedExports= module.usedExports
				}
			}

			var target= modules.filter( m=> m.portableId.indexOf( "webpack-reflect/reflections.js")!== -1)
			if( target.length!== 1){
				throw new Error( "Expected one reflection.js module")
			}
			_target= target[ 0]
		})

		compilation.plugin("record-hash", function( records){
			var modules= records.modules.byIdentifier
			for( var identifier in modules){
				var payloadModule= _payload[ identifier]
				if( !payloadModule){
					continue
				}
				// having trouble getting HashedModuleIdsPlugin to take effect atm
				// i'm expecting when working though the id will have changed & this will update it
				payloadModule.id= modules[ identifier]
			}

			// update our reflections.js file with the payload
			var text= _target._source._value
			text= text.substring( 0, text.indexOf("=")+ 2)
			text+= JSON.stringify( _payload)
			_target._source._value= text

			// cleanup
			_payload= null
			_target= null
		})
	})
}

module.exports = WebpackReflectPlugin

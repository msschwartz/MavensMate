/* new_metadata commander component
 * To use add require('../cmds/new-metadata.js')(program) to your commander.js based node executable before program.parse
 */
'use strict';

var util 							= require('../lib/util').instance;
var Project 					= require('../lib/project');
var Metadata 					= require('../lib/metadata');

module.exports = function(program) {

	program
		.command('new-metadata')
		.version('0.0.1')
		.description('Creates new metadata based on supplied template and params')
		.action(function() {
			var self = this;

			util.getPayload()
				.then(function() {
					global.project = new Project();
					return global.project.initialize();
				})
				.then(function() {
					var newMetadata = new Metadata(global.payload);
					return newMetadata.deployToServer();
				})
				.then(function(result) {
					util.respond(self, result);
				})
				['catch'](function(error) {
					util.respond(self, 'Could not create metadata', false, error);
				})
				.done();
		});
	
};
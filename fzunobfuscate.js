'use strict';

var util = require('util');
var Q = require('q');
var fs = require('fs');
var path = require('path');
var xml2js = require('xml2js');
var sprintf = require('sprintf-js').sprintf;


var fzXORKey = "FILEZILLA1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";


function parseFileToJSON (filename) {

	if (!filename || !(filename = path.resolve(__dirname, filename))) {
		console.error('- No filename given.');
		return Q.fcall(function () { throw new Error('[warg] No filename given'); });
	}

	var parser = new xml2js.Parser({explicitArray: true});

	return Q.nfcall(fs.readFile, filename, {encoding: 'UTF-8'})
		.then(function (data) {
			console.log('+ File "%s" successfully read...', filename);
			return Q.nfcall(parser.parseString, data);
		}, function (err) {
			console.error(err);
		})
		.then(function (json) {
			console.log('+ XML successfully parsed...');
			return json;
		}, function (err) {
			console.error(err);
		});

}


function deobfuscateFZPassword (pass) {
	if (!pass || pass === '') return '';
	var keylen = fzXORKey.length;
	var len = pass.length / 3;
	if (Math.floor(len) != len) throw new Error('[pwerr] Obfuscated password not plausable');
	var kpos = len % keylen;
	var result = '';

	for (var i = 0; i < len; ++i) {
		//parseInt(pass.substr(3 * i, 3));
		result += String.fromCharCode((parseInt(pass.substr(3 * i, 3)) ^ fzXORKey.charCodeAt((kpos + i) % keylen)) & 0xFF);
	}
	return result;
}


function showItem (host, user, pass, name) {
	console.log(sprintf('  %-28s %-23s %-15s' + (name? ' %-9s': ''), host, user, pass, name));
}


function showUsage () {
	console.log('* Usage: %s <path_to_filezilla.xml>', process.argv[1]);
	return 1;
}



//process.exit((function () {

	Q.longStackSupport = true;

	if (process.argv.length !== 3) {
		return showUsage();
	}
	var cfgFilename = process.argv[2];

	parseFileToJSON(cfgFilename)
	.then(function (json) {
		if (!json || !json.FileZilla) throw new Error('[dataerr] Invalid or no data received');
		//console.log(util.inspect(json.FileZilla, {colors: true, depth: 4}))

		var data;
		if (json.FileZilla.RecentServers && json.FileZilla.RecentServers[0]
				&& (data = json.FileZilla.RecentServers[0].Server)) {
			console.log('\n* RecentServers:');
			//console.dir(data);
			data.forEach(function (item) {
				var item = item.$;
				showItem(item.Host, item.User, deobfuscateFZPassword(item.Pass));
			});
		}
		if (json.FileZilla.Sites && json.FileZilla.Sites[0]
				&& (data = json.FileZilla.Sites[0].Site)) {
			console.log('\n* Sites:');
			//console.dir(data);
			data.forEach(function (item) {
				var item = item.$;
				showItem(item.Host, item.User, deobfuscateFZPassword(item.Pass), item.Name);
			});
		}

		//console.log(util.inspect(json.FileZilla.RecentServers.Server, {colors: true, depth: null}))
		//console.log(util.inspect(json.FileZilla.Sites, {colors: true, depth: null}))
	}, function (err) {
		console.error('ERROR');
	})
	.done();

//	return 0;

//})());

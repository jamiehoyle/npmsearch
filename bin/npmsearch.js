#!/usr/bin/env node

var search = require('../index.js');
var argv = require('optimist')
    .demand(1)
    .describe('exact',     "Use exact keywords only (bool)")
    .describe('relevance', "Relevance factor for sorting")
    .describe('downloads', "Downloads factor for sorting")
    .describe('halflife',  "Halflife of download count value in days")
    .describe('freshness', "Demand database freshness (days) or update")
    .describe('refresh',   "Force database update (bool)")
    .argv

search(argv._, argv, function(err, results) {
    var limit = argv.limit || 7;
    for (var k = 0; k < Math.min(results.length, limit); ++k) {
        var details = results[k];
        var space = "    ";
        var pkg = details.data;
        console.log("*", pkg.name, '(' + details.relevance, details.downloads + ')');
        console.log(space, pkg.description);
        if (pkg.author) console.log(space, "by", pkg.author.name, "<" + pkg.author.email + ">");
        if (pkg.repository && pkg.repository.url) 
            console.log(space, pkg.repository.url.replace('git://','http://'));
        console.log();
    }
});


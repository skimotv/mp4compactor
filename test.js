'use strict';
var mp4compactor  = require('./');
var jumpPoints = [167,371,604,824,1038,1247];
var compactor = new mp4compactor(jumpPoints,30,"ingest/antfarm.mp4","skimo/skimo.mp4");

compactor.run(function(err) 
{
    if (err) 
    {
        console.log(err);
    }
    else 
    {
        console.log('done');
    }
});

compactor.on('error', function(err) 
{
    console.error(err);
});

compactor.on('progress', function(d) 
{
    console.log(d);
});

compactor.on('complete', function() 
{
    console.log('transmux complete');
});

// mp4compactor.js
// ===============
'use strict';
var async = require('async');
var EventEmitter = require('events').EventEmitter;
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var util = require('util');
exports.version = '0.0.1';

var mp4compactor  = function(clipPoints, duration, src, dest) 
{
    var self = this;
    this.run = function(callback) 
    {
        var i = 0;
        async.eachSeries(clipPoints, clip, done);
        function clip(part, asyncCb) 
        {
           i++;
           var command = 'ffmpeg -i ' + src +  ' -ss ' +  part  + ' -t ' + duration  +  ' -c copy -y skimo/' + i +  '.mp4';
           console.log('executing command ' + command);
           exec(command, function(err, stdout, stderr)
           {
               if (err)
               {
                   asyncCb(err);
               }
               else if (stderr)
               {
                   asyncCb(new Error('ffmpeg error: ' + stderr));
               }
               else
               {
                   asyncCb();
               }
           });
           asyncCb()
        }
        function done(err) 
        {
            if (err) 
            {
                self.emit('error', err);
                callback(err);
            }
            else 
            {
                console.log('there were ' +  clipPoints.length + ' items passed');
                self.emit('complete');
                callback(null);
            }
        }
    };
};
util.inherits(mp4compactor, EventEmitter);
module.exports = mp4compactor;

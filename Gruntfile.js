'use strict';

module.exports = function (grunt) {
    // this will load every module that starts with "grunt-"
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var config = {};

    config['watch'] = {
        options: {
            nospawn: true
            //Note that the nospawn option helps speed up the scaffolding process by
            //around 500 milliseconds on most machines. This is possible by restricting the
            //spawning of child processes for each task that is run.
        },
        compass: {
            files: ['src/styles/{,*/}*.{scss,sass}'],
            tasks: ['compass:server']
        },
        jade: {
            files: ['src/tempates/{,*/}*.jade'], //{,*/}*.jade expression matches Jade files in the root directory and all of its subsequent subdirectories.
            tasks: ['jade:server']
        }
    }
    config['compass'] = {
        options: {
            //It is important to note that the sassDir variable stores the directory where all user-built Sass files can be found. 
            sassDir: 'src/styles/sass',
            //The cssDir variable stores the directory where the compiled CSS file will be located after the grunt-contrib-compass task runs and scaffolds all the Sass files together.
            cssDir: 'src/styles',
            importPath: 'src/bower_components',
            /*Setting the last option relativeAssets to false will override the generation
of relative paths for assets such as images or fonts. This will minimize the 404
errors for the sake of this project */
            relativeAssets: false
        },
        /*In this case, compass:dist will be used for the deployment of the project into a distributable format. On the other hand, compass:server will be used for
on-the-fly compilation through the grunt-contrib-watch plugin. Note that
since both are empty objects, there is virtually no difference in configuration
between the two tasks. However, it is still the best practice to segment your
tasks out like this in case a specific configuration setting is required by one
task or another.*/
        dist: {},
        server: {}
    }

    //The grunt-contrib-jade plugin maps HTML files to their respective Jade templates via a files object.
    config['jade'] = {
        dist: {
            files: {
                'src/index.html': 'src/templates/index.jade',
                'src/golden-dragon.html': 'src/templates/golden-dragon.jade',
                'src/little-pizzeria.html': 'src/templates/little-pizzeria.jade'
            }
        },
        server: {
            options: {
                data: {
                    debug: false
                }
            },
            files: {
                'src/index.html': 'src/templates/index.jade',
                'src/golden-dragon.html': 'src/templates/golden-dragon.jade',
                'src/little-pizzeria.html': 'src/templates/little-pizzeria.jade'
            }
        }
    }
    grunt.initConfig(config);

    var tasks = [];

    grunt.registerTask('build', tasks);
};
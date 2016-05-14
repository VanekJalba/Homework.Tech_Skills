module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['JS_17_18/src/js/*.js'],
                dest: 'JS_17_18/dist/js/script.min.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'JS_17_18/dist/js/script.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'JS_17_18/dist/css/style.min.css': ['JS_17_18/src/css/*.css']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);

};

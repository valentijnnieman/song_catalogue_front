module.exports = function(grunt)
{
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        server: {
          port: grunt.option('port') || 8000
        }
    });

    grunt.loadNpmTasks('grunt-serve');
    grunt.registerTask('default', 'grunt-serve');
}

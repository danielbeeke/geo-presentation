
module.exports = function(grunt) {

grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.initConfig({
    watch: {
      compass: {
        files: ['css/source/theme.scss'],
        tasks: ['compass']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: ['index.html', 'slides/*.md', 'slides/*.html', 'js/*.js', 'css/*.css']
      },
      index: {
        files: ['templates/_index.html', 'templates/_section.html', 'slides/list.json'],
        tasks: ['buildIndex']
      },
      jshint: {
        files: ['js/*.js'],
        tasks: ['jshint']
      }
    },
    compass: {                  // Task
      css: {                   // Target
        options: {              // Target options
          config: 'config.rb'
        }
      }
    },
    connect: {
      livereload: {
        options: {
          port: 9000,
          hostname: 'localhost',
          base: '.',
          open: true,
          livereload: true
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['js/*.js']
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            src: ['slides/**', 'bower_components/**', 'js/**', 'css/*.css'],
            dest: 'dist/'
          }, {
            expand: true,
            src: ['index.html'],
            dest: 'dist/',
            filter: 'isFile'
          }
        ]
      }
    }
  });
  require('load-grunt-tasks')(grunt);
  grunt.registerTask('buildIndex', 'Build index.html from templates/_index.html and slides/list.json.', function() {
    var html, indexTemplate, sectionTemplate, slides;
    indexTemplate = grunt.file.read('templates/_index.html');
    sectionTemplate = grunt.file.read('templates/_section.html');
    slides = grunt.file.readJSON('slides/list.json');
    html = grunt.template.process(indexTemplate, {
      data: {
        slides: slides,
        section: function(slide) {
          return grunt.template.process(sectionTemplate, {
            data: {
              slide: slide
            }
          });
        }
      }
    });
    return grunt.file.write('index.html', html);
  });
  grunt.registerTask('test', '*Lint* javascript and coffee files.', ['jshint']);
  grunt.registerTask('server', 'Run presentation locally and start watch process (living document).', ['buildIndex', 'compass', 'connect:livereload', 'watch']);
  grunt.registerTask('dist', 'Save presentation files to *dist* directory.', ['test', 'compass', 'buildIndex', 'copy']);
  return grunt.registerTask('default', ['test', 'server']);
};

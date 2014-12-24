module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-text-replace');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    builddir: '.',
    banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %>\n' +
            ' * Homepage: <%= pkg.homepage %>\n' +
            ' * Copyright 2012-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license %>\n' +
            ' * Based on Bootstrap\n' +
            '*/\n',
    swatch: {
      amelia:{}, cerulean:{}, cosmo:{}, cupid:{}, cyborg:{}, darkly:{},
      flatly:{}, journal:{}, lumen:{}, readable:{}, simplex:{},
      slate:{}, spacelab:{}, superhero:{}, united:{},yeti:{},
      custom:{},paper:{},sandstone:{},default:{}
    },
    clean: {
      build: {
        src: ['*/build.less', '!global/build.less']
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      dist: {
        src: [],
        dest: ''
      }
    },
  compress: {
    main: {
      options: {
        mode: 'zip',
        archive: 'archiveName.zip'
      },
      files: [
        {src: ['path/**'], 
         dest: 'internal_folder2/',
          cwd: ''}
      ]
    }
  },
  replace: {
    example: {
        src: [],
        dest: '',             
        replacements: [{
          from: '',                   
          to: ''
          }]
    }
    },


    less: {
      dist: {
        options: {
          compress: false
        },
        files: {}
      }
    },
  
  copy: {
  main: {
    files: [
    ]
  }
  }
});

  grunt.registerTask('none', function() {});

  grunt.registerTask('build', 'build a regular theme', function(theme, compress) {
    var compress = compress == undefined ? true : compress;

    var concatSrc;
    var concatDest;
    var lessDest;
    var lessSrc;
    var files = {};
    var dist = {};
    concatSrc = 'global/build.less';
    concatDest = theme + '/build.less';
    lessDest = '<%=builddir%>/' + theme + '/ui/theme-'+theme+'/css/bootstrap.css';
    lessSrc = [ theme + '/' + 'build.less' ];

    dist = {src: concatSrc, dest: concatDest};
    grunt.config('concat.dist', dist);
    files = {}; files[lessDest] = lessSrc;
    grunt.config('less.dist.files', files);
    grunt.config('less.dist.options.compress', false);

    grunt.task.run(['concat', 'less:dist', 'clean:build',
      compress ? 'compressLess:'+lessDest+':'+'<%=builddir%>/' + theme + '/ui/theme-'+theme+'/css/bootstrap.min.css':'none']);

    if(theme==='default'){
    grunt.config('copy.main.files',[
      {src:'<%=builddir%>/fonts/**', dest:'<%=builddir%>/' + theme + '/ui/theme-'+theme+'/'},
      {src:'<%=builddir%>/global/mendix/mendix-custom.css', dest:'<%=builddir%>/' + theme + '/ui/theme-'+theme+'/css/mendix-custom.css'},
      {src:['**'], cwd:'<%=builddir%>/'+theme+'/ui/', dest:'<%=builddir%>/mxbootswatch-demo/ui/', expand:true},
      {src:'<%=builddir%>/'+theme+'/index.html', dest:'<%=builddir%>/mxbootswatch-demo/index.html',filter: 'isFile'},
      {src:'<%=builddir%>/global/mendix/components.json', dest:'<%=builddir%>/' + theme + '/components.json'}
      ]);
    }else{
      grunt.config('copy.main.files',[
      {src:'<%=builddir%>/fonts/**', dest:'<%=builddir%>/' + theme + '/ui/theme-'+theme+'/'},
      {src:'<%=builddir%>/global/mendix/mendix-custom.css', dest:'<%=builddir%>/' + theme + '/ui/theme-'+theme+'/css/mendix-custom.css'},
      {src:['**'], cwd:'<%=builddir%>/'+theme+'/ui/', dest:'<%=builddir%>/mxbootswatch-demo/ui/', expand:true},
      {src:'<%=builddir%>/'+theme+'/index.html', dest:'<%=builddir%>/mxbootswatch-demo/index-'+theme+'.html',filter: 'isFile'},
      {src:'<%=builddir%>/global/mendix/components.json', dest:'<%=builddir%>/' + theme + '/components.json'}
      ]);
    }

    grunt.task.run('copy');
    grunt.config('replace',{example: {
        src: ['<%=builddir%>/' + theme + '/components.json'],
        dest: '<%=builddir%>/' + theme + '/components.json',             
        replacements: [{
          from: 'theme-name',                   
          to: 'theme-'+theme
          }]
    }});
    grunt.task.run('replace');
      
    grunt.config('compress.main.options.archive', '../theme/'+theme+'.zip');
    grunt.config('compress.main.options.mode', 'zip');
    grunt.config('compress.main.files', [{src:['**'], cwd:'<%=builddir%>/' + theme, dest:'.',expand:true}]);
    grunt.task.run('compress');


  });


  grunt.registerTask('compressLess', 'compress a generic css', function(fileSrc, fileDst) {
    var files = {}; files[fileDst] = fileSrc;
    grunt.config('less.dist.files', files);
    grunt.config('less.dist.options.compress', true);
    grunt.task.run(['less:dist']);
  });

    grunt.registerMultiTask('buildmulti', 'build a multi theme', function() {
      var t = this.target;
      
    });

  grunt.registerTask('makemultizip','Make multi zip',function(){

    grunt.config('compress.main.options.archive', '../theme/bootswatch.zip');
    grunt.config('compress.main.options.mode', 'zip');
    grunt.config('compress.main.files', [{src:['**'], cwd:'<%=builddir%>/mxbootswatch-demo', dest:'.',expand:true}]);
    grunt.task.run('compress');
  });

  grunt.registerMultiTask('swatch', 'build a theme', function() {
    var t = this.target;
    grunt.task.run('build:'+t);
  });

  grunt.registerTask('default', 'build a theme', function() {
    grunt.task.run('swatch');
  });
};

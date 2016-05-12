(function() {
  	module.exports = function(grunt) {
		var remapify = require('remapify');
		var coffeeify = require("coffeeify");
		var stringify = require("stringify");
		var md5File = require('md5-file');
		grunt.initConfig({
		  	//每次运行Grunt的时候清除之前生成的文件
		  	clean: {
				dist  : ["dist"],
		  	},
		  	//分析模块依赖树，最后生成一个main.js文件
		  	browserify: {
				weixinPages: {
				  	options: {
				  		alias: {
    						'config'   : './src/common/config.js',
    						'common'   : './src/common/common.js',
    						'databus'  : './src/common/data_bus'
    						// 'loading'  : './src/components/loading/loading.js' 
  						},
						preBundleCB: function(b) {
						  	b.transform(coffeeify)
						  	b.transform(stringify({extensions: [".hbs", ".html", ".tpl", ".txt"]}))
						  	
						}
				  	},
					expand: true,
					flatten: true,
					src: ['src/pages/**/*.js'],
					dest: 'dist/js/pages/',
					ext: '.js'
				}
			},
		  	//压缩js文件
		  	uglify: {
				js: {
			  		files: [
						{
							expand: true,
							cwd: 'dist/js/pages',
							src: '**/*.js',
							dest: 'dist/js/pages'
						}
			  		]
				}
		  	},
		  	cssmin: {
                options: {
                    shorthandCompacting: false,
                    roundingPrecision: -1
                },
                target: {
                    files: {
                        'bin/datepicker.min.css': ['bin/datepicker.css']
                    }
                }
            },
			//监听文件变化，如果src文件夹中的js或css文件变化了，执行任务`browserify`和`sass`
			watch: {
				weixin: {
				  files: ["src/**/*.js", "src/**/*.less", "src/**/*.jade"],
				  tasks: ["browserify", "less", "copy"]
				}
			},
			//less文件编译成css
			less: {
				weixinComponents: {
				  	files: {
						'dist/css/icon.css': 'src/common/lib-icons.less',
						'dist/css/home.css': 'src/pages/home/home.less',
						'dist/css/profile.css': 'src/pages/profile/profile.less',
						'dist/css/notes.css': 'src/pages/notes/notes.less',
						'dist/css/blogs.css': 'src/pages/blogs/blogs.less',
						'dist/css/blog.css': 'src/pages/blog/blog.less',
						'dist/css/login.css': 'src/pages/admin/login/login.less',
						'dist/css/post.css': 'src/pages/post/post.less',
						'dist/css/notes.css': 'src/pages/notes/notes.less',
				  	}
				}
		  	},

			connect: {
			    server: {
			      	options: {
			        	port: 8888,
			        	base: '.'
			      	}
			    }
			},

			copy: {
	            home: {
	                src: 'src/pages/home/index.html',
	                dest: '../views/index.ejs',
	                options: {
      					process: function (content, srcpath) {
        					return content.replace(/(css\?v=)(\w+)/g, 'css?v=' + md5File('dist/css/qing-song.css').substring(0, 10));
      					}
    				}
	            }
	        },
	        jade: {
				compile: {
				    options: {
				     	data: {
				        	debug: false
				      	}
				    },
			    	files: {
			    		"views/home.html": "src/pages/home/home.jade",
			    		"views/notes.html": "src/pages/notes/notes.jade",
			    	}
				}
			}
		});

		//加载上述任务所需要的插件
		grunt.loadNpmTasks("grunt-contrib-clean");
		grunt.loadNpmTasks("grunt-browserify");
		grunt.loadNpmTasks("grunt-contrib-watch");
		grunt.loadNpmTasks("grunt-contrib-uglify");
		grunt.loadNpmTasks("grunt-contrib-cssmin");
		grunt.loadNpmTasks("grunt-contrib-copy");
		grunt.loadNpmTasks('grunt-contrib-less');
		grunt.loadNpmTasks('grunt-css-sprite');
		grunt.loadNpmTasks('grunt-contrib-concat');
		grunt.loadNpmTasks('grunt-contrib-connect');
		grunt.loadNpmTasks('grunt-contrib-copy');
		grunt.loadNpmTasks('grunt-contrib-jade');

		grunt.registerTask("test", function() {
		  return grunt.task.run([
		  	"less",
			// "jade",
			// "connect",
			"watch" 
		  ]);
		});


		grunt.registerTask("default", function() {
		  return grunt.task.run([
			"browserify", 
			"concat",
			"less", 
			"connect",
			"watch:weixin",
		  ]);
		});

		grunt.registerTask("release", function() {
		  	return grunt.task.run([
				"clean", 
				"browserify", 
				"concat",
				"less",
				"uglify",
				"copy"
		  	]);
		});
	};
}).call(this);
# grunt-vash v0.1.0 [![Build Status: Linux](https://api.travis-ci.org/MoLow/grunt-vash.svg)](https://travis-ci.org/MoLow/grunt-vash)

> Compile Vash templates



## Getting Started
This plugin requires Grunt `>=0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-vash --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-vash');
```



## Vash task
_Run this task with the `grunt Vash` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

#### process
Type: `Function`
Default: null

Process the output of a compiled vash template.

#### model
Type: `Object`

Sets the model passed to Vash during template compilation. Any data can be passed to the template.

#### dest
Type: `String`

Sets the destination where to save compiled vash template.

### Usage Examples

```js
vash: {
    compile: {
        files: {
            'test/fixtures/unit.vash': {
                dest: 'tmp/vash.html',
                model: {
                    theme: 'theme1', name: 'fixtures'
                }
            },
        },
        options:{
            process: function(content, path){
                return content.replace(/<!---->/gi, '');
            }
        }
    },
}
```

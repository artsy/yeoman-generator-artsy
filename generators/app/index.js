// For reference, see https://github.com/Microsoft/vscode-generator-code/blob/master/generators/app/index.js

var Generator = require('yeoman-generator')
var yosay = require('yosay');

module.exports = class extends Generator {
  aStart() {
      this.log(yosay('Welcome to the Artsy Project Generator!'));
  }
  aGetType() {
   return this.prompt([{
      type: 'list',
      name: 'type',
      message: 'What type of extension do you want to create?',
      choices: [
          {
              name: 'Web Project - TS, React, Relay, Storybooks, Jest',
              value: 'web'
          },
          {
              name: 'React Native - Not done yet',
              value: 'react-native'
          },
      ]
  },
  {
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : this.appname

    }]).then( (answers) => {
      this.name = answers.name.replace(/ /g,"_")
      this.type = answers.type
    });
  }

  setup() {
    // For the license
    var date = new Date();
    this.year = date.getFullYear();

    // Copy _all_ files, as templated, you can use ejx in them
    var templateRoot = this.templatePath(this.type)
    var projectRoot = this.destinationPath(this.name)

    this.fs.copyTpl(templateRoot, projectRoot, this);
  }

   end() {
     if (this.type == "web")
      this.log("");
      this.log("All Done!");
      this.log("You can now `cd` into " + this.name + " and run `yarn install`")
    }
}


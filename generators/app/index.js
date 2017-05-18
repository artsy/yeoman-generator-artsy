// For reference, see https://github.com/Microsoft/vscode-generator-code/blob/master/generators/app/index.js

var Generator = require("yeoman-generator");
var yosay = require("yosay");

module.exports = class extends Generator {
  aStart() {
    this.log(yosay("Welcome to the Artsy Project Generator!"));
  }
  aGetType() {
    return this.prompt([
      {
        type: "list",
        name: "type",
        message: "What type of extension do you want to create?",
        choices: [
          {
            name: "CLI tool",
            value: "cli"
          },
          {
            name: "Web Project - TS, React, Relay, Storybooks, Jest",
            value: "web"
          },
          {
            name: "React Native - Not done yet",
            value: "react-native"
          }
        ]
      },
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname
      },
      {
        type    : 'input',
        name    : 'username',
        message : 'Your GitHub username',
        store   : true
      }
      
    ]).then(answers => {
      this.name = answers.name.replace(/ /g, "_");
      this.type = answers.type;
      this.username = answers.username;
    });
  }

  setup() {
    // For the license
    var date = new Date();
    this.year = date.getFullYear();

    // Copy _all_ non-dotfile files, as templated, you can use ejx in them
    var templateRoot = this.templatePath(this.type);
    var projectRoot = this.destinationPath(this.name);

    this.fs.copyTpl(templateRoot, projectRoot, this);
    this.fs.copy(templateRoot + "/.*", projectRoot)
  }

  end() {
    this.log("");
    this.log("OK, setting up git!");

    var projectRoot = this.destinationPath(this.name);
    this.spawnCommandSync("git", ["init"], { cwd: projectRoot })
    
    this.log("Running Yarn install")
    this.spawnCommandSync("yarn", ["install"], { cwd: projectRoot })

    if (this.type === "cli") {
        this.log("Running Yarn upgrade")
        this.spawnCommandSync("yarn", ["upgrade"], { cwd: projectRoot })    
    }

    this.log("Alright, you're good to go.")
    this.log("> cd " + projectRoot)
  }
};

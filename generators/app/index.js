// @ts-check

// For reference, see https://github.com/Microsoft/vscode-generator-code/blob/master/generators/app/index.js

// This file runs un-transpiled, so don't use too much fancy syntax.

var Generator = require("yeoman-generator");
var yosay = require("yosay");
var path = require("path");
var fs = require("fs")

module.exports = class extends Generator {
  aStart() {
    this.log(yosay("Welcome to the Artsy Project Generator!"));
  }

  aGetType() {
    return this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname
      },
      {
        type: "input",
        name: "username",
        message: "Your GitHub username",
        store: true
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

    // Because it's only doing CLIs for now
   this.type = "cli" ;
    
    // Copy _all_ non-dotfile files, as templated, you can use ejx in them
    var templateRoot = this.templatePath(this.type);
    var projectRoot = this.destinationPath(this.name);

    var files = [
      "._gitignore",
      "._npmignore",
      ".travis.yml",
      "CHANGELOG.md",
      "dangerfile.ts",
      "LICENSE",
      "package.json",
      "README.md",
      "tsconfig.json",
      "tslint.json",
      "wallaby.js",

      "src/index.ts",
      "src/_tests/index.test.ts",
    ];
    files.forEach(f => {
      this.fs.copyTpl(path.join(templateRoot, f), path.join(projectRoot, f), this);
    })

    const renames = [
      {from: "._gitignore", to: ".gitignore"},
      {from: "._npmignore", to: ".npmignore"}
    ]
    renames.forEach(r => this.fs.move(path.join(projectRoot, r.from), path.join(projectRoot, r.to)))
  }

  end() {
    this.log("");
    this.log("OK, setting up git!");

    var projectRoot = this.destinationPath(this.name);
    this.spawnCommandSync("git", ["init"], { cwd: projectRoot });

    this.log("Running Yarn install");
    this.spawnCommandSync("yarn", ["install"], { cwd: projectRoot });

    if (this.type === "cli") {
      this.log("Running Yarn upgrade");
      this.spawnCommandSync("yarn", ["upgrade", "--latest"], { cwd: projectRoot });
    }

    this.log("Alright, you're good to go.");
    this.log("> cd " + projectRoot);
  }
};

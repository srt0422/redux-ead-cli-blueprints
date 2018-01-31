const {
  pwd
} = require("shelljs");

const path = require("path");
const fs = require("fs");

function getNames(namesPath, entityName) {

  const dirPath = path.join(pwd().stdout, namesPath);

  const fileNames = fs.readdirSync(dirPath);

  return convertToEntityNames(fileNames)
    .filter(it => ["index", entityName].indexOf(it) === -1)
    .filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    })
    .concat([entityName]);
}

function convertToEntityNames(fileNames) {

  return fileNames.map((it) => {
    if (it.split(".").length > 0) {
      return it.split(".")[0];
    }

    return it;
  });
}

function getFunctionsPath(options) {

  const sourceBase = options.settings.getSetting("sourceBase");
  const effectsPathSegment = options.settings.getSetting("effectsPath") || "effects";
  const effectsPath = path.join(sourceBase, effectsPathSegment);

  const functionsPathSegment = options.settings.getSetting("functionsPath") || "functions";

  return path.join(effectsPath, functionsPathSegment);
}

function renameIndexFiles(options) {

  const functionsPath = getFunctionsPath(options);

  renameIndexFile(functionsPath);
}

function renameIndexFile(pathName) {

  const absolutePath = path.join(pwd().stdout, pathName, "index.js");

  if (fs.existsSync(absolutePath))
    fs.renameSync(absolutePath, path.join(pwd().stdout, pathName, "index.js.temp"));
}

function removeIndexFiles(options) {

  const functionName = getFunctionsPath(options);

  removeIndexFile(functionName);
}

function removeIndexFile(pathName) {

  const absolutePath = path.join(pwd().stdout, pathName, "index.js.temp");

  if (fs.existsSync(absolutePath))
    fs.unlinkSync(absolutePath);
}

module.exports = {

  description() {
    return 'Generates a reducer/actions/constant Duck Module for redux with effects-as-data boilerplate.';
  },

  locals: function(options) {

    functionsPath = getFunctionsPath(options);

    // Return custom template variables here.
    return {
      functions: getNames(functionsPath, options.entity.name),
      testDescription: ""
    };
  },

  fileMapTokens() {
    return {
      __ead__: options => options.settings.getSetting('effectsPath') || "effects",
      __functions__: options => options.settings.getSetting('functionsPath') || "functions"
    };
  },

  beforeInstall: function(options) {
    renameIndexFiles(options);
  },

  afterInstall: function(options) {
    removeIndexFiles(options);
  },
};

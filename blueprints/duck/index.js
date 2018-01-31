const {
  pwd
} = require("shelljs");

const path = require("path");
const fs = require("fs");

const defaultDucksPath = "state/reducers";
const defaultActionsPath = "state/actions";

function getNames(namesPath, entityName) {

  const dirPath = path.join(pwd().stdout, namesPath);

  const fileNames = fs.readdirSync(dirPath);

  return getName(fileNames)
    .filter(it => ["index", entityName].indexOf(it) === -1)
    .filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    })
    .concat([entityName]);
}

function getName(fileNames) {

  return fileNames.map((it) => {
    if (it.split(".").length > 0) {
      return it.split(".")[0];
    }

    return it;
  });
}

function getDucksPath(options) {

  const sourceBase = options.settings.getSetting("sourceBase");

  return {
    ducksPath: path.join(sourceBase, options.settings.getSetting("ducksPath") || defaultDucksPath),
    actionsPath: path.join(sourceBase, options.settings.getSetting("actionsPath") || defaultActionsPath)
  };
}

function renameIndexFiles(options) {

  const duckNames = getDucksPath(options);

  Object.keys(duckNames).forEach(it => renameIndexFile(duckNames[it]));
}

function renameIndexFile(pathName) {

  if (fs.existsSync(path.join(pathName, "index.js")))
    fs.renameSync(path.join(pathName, "index.js"), path.join(pathName, "index.js.temp"));
}

function removeIndexFiles(options) {

  const duckNames = getDucksPath(options);

  Object.keys(duckNames).forEach(it => removeIndexFile(duckNames[it]));
}

function removeIndexFile(pathName) {
  fs.unlinkSync(path.join(pathName, "index.js.temp"));
}

module.exports = {

  description() {
    return 'Generates a reducer/actions/constant Duck Module for redux;.';
  },

  locals: function(options) {

    const {
      ducksPath
    } = getDucksPath(options);

    // Return custom template variables here.
    return {
      ducks: getNames(ducksPath, options.entity.name),
      ducksPathFromActions: path.parse(ducksPath).name,
      defaultActionConstant: options.entity.name
    };
  },

  fileMapTokens() {
    return {
      __ducks__: options => options.settings.getSetting("ducksPath") || defaultDucksPath,
      __actions__: options => options.settings.getSetting("actionsPath") || defaultActionsPath
    };
  },

  beforeInstall: function(options) {
    renameIndexFiles(options);
  },

  afterInstall: function(options) {
    removeIndexFiles(options);
  },
};

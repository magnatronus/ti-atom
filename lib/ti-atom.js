/**
 * ti-atom main package module
 *
 * This atom package connects to the Titanium CLI and can be used to create classic or alloy apps
 * in the current project directory

 * Now supports running the app with TiShadow
 *
 */


var util = require('util');
var envPATH = process.env.PATH;
var currentProject = null;

/**
 * Called when the package has been activated
 */
function activate(){

  // add our functions to the workspaceView commands
  atom.workspaceView.command("ti-atom:shadowrun", function() {
    return shadowrun();
  });

  atom.workspaceView.command("ti-atom:createapp", function() {
    return createapp();
  });
  atom.workspaceView.command("ti-atom:createalloyapp", function() {
    return createalloyapp();
  });

  // Fix OSX Path problem
  if(process.platform==='darwin'){
    process.env.PATH= process.env.PATH + ":/usr/local/bin";
  }

  // make sure dev console is showing so we can see stuff
  atom.openDevTools();

  // set the defaults for the settings (this creates them)
  if(atom.config.get('ti-atom.copyright')===undefined){
    createDefaultSettings();
  }

  // Say Hello
  console.log("ti-atom extension loaded");

}

/**
 * Called when package is deactivated
 */
function deactivate(){

  // reset the modified path
  process.env.PATH = envPATH;

}


/**
 * Generic function to run a child process with an optional callback
 */
function executeCommand(cmd, callback){


  var exec = require('child_process').exec;
  var ti= exec(cmd, {'env': process.env},function(err, stdout, stderr){
    console.log(stdout);
    console.log(stderr);
    if(err!==null){
      console.log('----- ERROR -----');
      console.log(err);
    }

    if(callback){
      callback();
    }

  });

}

/**
 * Generate a New Titanium  Project
 */
function createTiApp(name, id, url, dir, callback){

   var platform = generatePlatformOptions();
   if(platform.length>0){

     console.log('----- CREATING TITANIUM APP -----');
     var ticmd = util.format('ti create -f --no-prompt --log-level info -n "%s" --id %s -u %s -d %s -p %s',name, id, url, dir, platform);

     executeCommand(ticmd, function(){
       console.log('----- TITANIUM APP CREATED -----')
       if(callback){
         callback();
       }
     });
   }
   else{
     console.error('You have not specified any platforms in the settings for Ti Atom');
   }


}

/**
 * Convert an App to Alloy using the passed in directory
 * @param {string} dir  - the project directory to convert to alloy
 */
function addAlloy(project){
  console.log('----- CREATING ALLOY COMPONENTS -----');
  var ticmd = util.format('alloy new "%s"',project);
  executeCommand(ticmd, function(){
    console.log('----- ALLOY COMPONENTS GENERATED -----')
  });

}


/**
 * Set up default settings  for app creation
 */
 function createDefaultSettings(){

   atom.config.set("ti-atom.url", "http://");
   atom.config.set("ti-atom.id", "my.app.id");
   atom.config.set("ti-atom.copyright", "Copyright 2014");
   atom.config.set("ti-atom.publisher", "My Company");

   // platforms
   atom.config.set("ti-atom.createForAndroid", false);
   atom.config.set("ti-atom.createForIOS", false);
   atom.config.set("ti-atom.createForMobileWeb", false);

   // TiShadow Server
   atom.config.set("ti-atom.TishadowServerHost", 'localhost');


 }

 /**
  * create the command line option for the required platform
  */

 function generatePlatformOptions(){
   var platform=[];

   if(atom.config.get("ti-atom.createForAndroid")){
     platform.push('android');
   }

   if(atom.config.get("ti-atom.createForMobileWeb")){
    platform.push('mobileweb');
   }

   if(atom.config.get("ti-atom.createForIOS")){
     platform.push('ios');
   }

   return platform.join();
 }

/**
 * Use Dir info to contruct project info
 */
function getProjectInfo(){
  return {
    "project" : atom.project.getRootDirectory().path,
    "appname" : atom.project.getRootDirectory().getBaseName(),
    "dirname" : atom.project.getRootDirectory().getParent().getPath()
  };
}

/**
 * Creates a Classic Titanium App
 */
function createapp(){
  var project = getProjectInfo()
  createTiApp(project.appname, atom.config.get("ti-atom.id"), atom.config.get("ti-atom.url"), project.dirname);
}

/**
 * Generate an Alloy Project from a Classic App
 */
function createalloyapp(){
  var project = getProjectInfo()
  createTiApp(project.appname, atom.config.get("ti-atom.id"), atom.config.get("ti-atom.url"), project.dirname, function(){
    addAlloy(project.project);
  });

}

/**
 * Run the current project using TiShadow
 */
function shadowrun(){
 var project = getProjectInfo()
 console.log(util.format('----- RUNNING TISHADOW TO SERVER %s -----', atom.config.get("ti-atom.TishadowServerHost")));
 var cmd = util.format("cd %s;tishadow run --host %s", project.project, atom.config.get("ti-atom.TishadowServerHost"));
 executeCommand(cmd, function(){
   console.log("----- TISHADOW APP SHOULD BE RUNNING -----");
 });
}

/**
 * Our Exports
 */
exports.activate = activate;
exports.deactivate = deactivate;
exports.createapp = createapp;
exports.createalloyapp = createalloyapp;
exports.shadowrun = shadowrun;

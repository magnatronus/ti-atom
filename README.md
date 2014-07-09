# Why
Mainly to see how to create an Atom.io package and to see what Atom.io is like to use (I always need a practical exercise to do that sort of thing)
Also the Atom.io package examples and tutorials are mainly in CoffeeScript and I wanted to see if I coud create one using JavaScript.

# Ti Atom

This is a very **experimental package** that can be used to generate Titanium mobile projects (http://www.appcelerator.com) in Atom.io.

The initial release is simple and uses the Titanium CLI to create either a Titanium Classic Project or a Titanium Alloy project.


# How To
Download and install the package into Atom.io. This should add a new menu 'Titanium' in the menu bar, and display the developer tools (you will probably want to select the Console at this point).


## step one - set up
Go to the Atom.io Preferences(Settings) and scroll through the list of packages until you find **Ti Atom**. When you select it you should see a number of settings that you should fill in.

- TiShadow Server Url - this should be set to the host where you have your TiShadow server running
- Copyright - (currently optional and not used in project creation)
- Id - this is used as the app id of the project when created. This really needs to be requested when the project is generated rather than hard coded here. The idea is to have a base Id and then ask for the last part of the App Id when creating a project( not yet implemented)
- Publisher - (currently optional and not used in project creation)
- Url - This is the URL used when a project is created

there are also a set of tick boxes tha should be used to define which platform(s) you wish to create a build for

The idea here is to allow a set of defaults to be created that will be used for each project

## step two - create a skeleton project
Make sure step one has been done first :-)

To create a new Titanium project (currently hard coded to generate ALL platforms) just use the Atom File->Open to browse to (and optionally create) your app project directory.
Then select Titanium->New Project->Classic App (or Alloy App) and the package will generate the skeleton project in the directory you currently have open.

As a project is created the output of the CLI will be displayed in the Console of the Developer Tools.


# Other Ideas

Not sure if some of these are even possible yet, but just a few things that sprang to mind

 - Context Menu to allow building, cleaning etc
 - Some way of setting build configs
 - Integrating TiShadow so builds can be run directly (added in version 0.0.2)

# TiShadow Support
When a project has been created Ti-Atom now has a setting to allow it to work with TiShadow. Basically in the settings you should set up *Tishadow Server Host* to point to your running TiShadow server. Then if the select the Titaniun->Run As->TiShadow menu option your app should run on any devices/emulators etc. that you have connected to your TiShadow server.
See http://tishadow.yydigital.com for more details about the excellent TiShadow

# Important

 Currently I have **ONLY** tested this on OSX.

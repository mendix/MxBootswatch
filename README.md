MxBootswatch
==========

MxBootswatch is a collection of free themes for Mendix using the [Bootstrap](http://getbootstrap.com/) framework. These themes are based on the themes provided by Bootswatch. Check it out at [bootswatch.com](http://bootswatch.com).

Usage
-----
MxBootswatch can be used in a number of ways to help speed up and improve styling in Mendix. You can use any of the zipped themes in the theme folder. Simply copy the theme into your theme folder for your application. Alternatively you can use the project package stored in the dist folder to preview the themes, see example styling and reuse layouts. All the source for the themes is stored in the theme-builder folder.

Using the installation instructions bellow will allow you to build custom themes easyily using grunt and less.

Installation
-----
To use the theme builder you must have a number of components installed before being able to use the builder.

You can of course use the complied themes without the theme builder, but the theme builder gives you the flexibility of being able to change a couple of variables and build a new great looking theme.

To get started you will need to install Node.js. Node.js can be downloaded from [here](http://nodejs.org/) and you can install it on windows, mac or linux.

<img src="images/nodejs_logo_light.png"/>

Once node.js is installed open up in the node.js command prompt on windows or open up the terminal on mac.

The first thing you will need to do is install Grunt. Grunt is a javascript task runner, which will allow you to build the correct zipped file structure for your themes.

In the terminal type the following command:

`npm install -g grunt-cli`

<img src="images/install-grunt-cli.PNG"/>

<img src="images/installed-grunt-cli.PNG"/>

The next thing you will to install is the less compiler.
To do this type the following:
`npm install less`

<img src="images/install-less.PNG"/>
<img src="images/installed-less.PNG"/>

We now have all the necessary components installed to build your themes.

We can now install our theme builder. Navigate to the theme-builder folder and type the command:

`npm install`

<img src="images/install-theme-builder.PNG"/>


Customization
------
MxBootswatch is open source and you’re welcome to modify the themes.

Each theme is contained in its own theme folder inside the theme-builder folder.

Each theme consists of two LESS files. `variables.less`, which is included by default in Bootstrap, allows you to customize [these settings](http://getbootstrap.com/customize/#less-variables). `bootswatch.less` introduces more extensive structural changes.

To compile the themes into a Mendix zipped theme file you can type the following command:
`grunt swatch : themename`

The following themes exist in this project:
`amelia,cerulean, cupid, custom, cyborg, darkly,default, flatly, journal, lumen, readable, simplex, slate, spacelab, superhero, united & yeti`

If you want to compile all the themes you can type the command:
`grunt swatch`

When this command is run all themes will be compiled from LESS to CSS, placed in the correct folder structure, zipped up and placed in the Mendix theme folder. The file that performs these actions is called Gruntfile.js.

Check out the [Help page](http://bootswatch.com/help/) for more details on building your own theme.


Author
------
Simon Black
+ http://mendix.com

Thomas Park

+ http://github.com/thomaspark
+ http://thomaspark.me

Thanks
------
[Mark Otto](http://github.com/markdotto) and [Jacob Thornton](http://github.com/fat) for [Bootstrap](https://github.com/twitter/bootstrap).

[Jenil Gogari](http://www.jgog.in/) for his contributions to the Flatly theme.

[James Taylor](http://github.com/jostylr) for [cors-lite](https://github.com/jostylr/cors-lite).


Copyright and License
----
Copyright 2014 Simon Black

Copyright 2014 Thomas Park

Code released under the MIT License.

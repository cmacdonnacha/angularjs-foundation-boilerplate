# angularjs-foundation-boilerplate
A simple and well structured boilerplate project based on AngularJS and Zurb's Foundation

## Features
* Responsive layout
* Mobile ready
* SASS support
* Grunt watch, build and local server tasks
* Live reload
* Organised folder structure
* Minified CSS, HTML and JS build files
* [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons/) icons
* Support for Unit & E2E Testing
* Unit Test reporting
* ESLint to detect incorrect coding patterns.
* [Jasmine](http://jasmine.github.io/2.3/introduction.html) testing framework
* [Karma](http://karma-runner.github.io/0.13/index.html) test runner
* [Protractor](https://angular.github.io/protractor/#/)  end-to-end test framework

## Live Demo
[Check out the live demo](http://cmacdonnacha.github.io/angularjs-foundation-boilerplate/)

## Setup
1. Install [Git](https://git-scm.com/downloads) and [NodeJS](http://nodejs.org/)
2. Clone this project: `git clone https://github.com/cmacdonnacha/angularjs-foundation-boilerplate.git`
2. Install Grunt and Bower globally: `npm install -g grunt-cli bower`
3. Install Karma globally: `npm install -g karma`
4. Install PhantomJS headless browser globally: `npm install -g phantomjs`
5. Install Protractor globally: `npm install -g protractor`
6. Install Selenium web driver binaries by running: `webdriver-manager update` (installs the Chrome driver by default)
7. Install a local Http server: `npm install -g serve` (for local web testing)

**NOTE:** If you have previous versions of any of the above packages, it's recommended that you update them: `npm update -g`

## Install Project Dependencies
1. `npm install` - this installs both the required NodeJS modules and the bower component libraries.

**IMPORTANT:** If you run into any issues please have a look at the **"Troubleshooting"** section at the bottom of this page.

## Quick Usage
* `grunt watch` : Creates a development build folder called 'public' and serves it on: [`http://localhost:9000/`](http://localhost:9000/)
* `grunt test` : Runs code checks, unit tests and E2E tests
* `grunt run:unit` : Runs unit tests only
* `grunt run:e2e` : Runs E2E tests only
* `grunt production` : Creates a production build in a folder called **'production'**
* `grunt run:production` : Serves the **'production'** build on: [`http://localhost:9000/`](http://localhost:9000/) if it exists.
* `grunt eslint` : Runs an ESLint code check

## Running unit test reports
1. `grunt reports`: will create and serve the **'reports'** folder
2. Navigate to [`http://localhost:22000/`](http://localhost:22000/)

## Project Structure
This project follows a **"Folders-by-Feature"** structure very simular to [John Papa's Styleguide](https://github.com/johnpapa/angular-styleguide#application-structure). From the folder structure below you can see that there are 6 separate components, a folder for each component.
Each component is treated as a mini Angular app. This structure allows us developers to easily locate code and identify what each file represents at a glance.
By retaining this structure the project is much more manageable as it grows.

![alt text](http://i.imgur.com/OaqOEI0.png "Folders-by-Feature structure")

* The `app` folder contains the individual components:
    * `about`: Contains the about page related files.
    * `common`: Contains all common services, directives etc. used across the entire app.
    * `home`: Contains the home page related files.
    * `layout`: Acts as a container for other layout components (about, home, topbar etc.)
    * `sample`: A template component that can be duplicated whenever you want to create your own component (Copy and paste).
    * `topbar`: Contains the topbar related files.


* Each component has its own sub-folder containing files associated with that component:
    * assets
    * controllers
    * directives
    * e2e tests
    * services
    * styles
    * unit tests
    * views

    **Note:** Not every component will contain all of these sub-folders, just add them as you need them.
* The `assets` folder contains the globally used fonts and images.
* The `styles` folder contains all of the global sass files needed to style the app. Let's have a closer look at each file:

    *  `_font-awesome.scss`: Contains all of the font awesome icons taken from the `vendor/font-awesome` folder. Check [this](http://fortawesome.github.io/Font-Awesome/icons/) out to see all available icons.
    *  `_mixins.scss`: This is where you can put your very own Sass Mixins that can be used globally throughout the app. This should only contain Mixins.
    *  `_settings.scss`: Allows you to override the default Foundation styles with your own. This is detailed in a section below.
    *  `_shared.scss`: This is where you can put your very own Sass that can be used globally throughout the app. Typically it's where you would add globally used Sass classes which would then use mixins from the `_mixins.scss` file.
    *  `main.scss`: Brings everything together. Contains all of the Sass file imports. It's what tells the app where to grab the styles from.

#### Adding a new component
As you can see in this boilerpate project we have 6 sample components: `about`, `common`, `home`, `layout`, `sample` and `topbar`. Check out the [wiki](https://github.com/cmacdonnacha/angularjs-foundation-boilerplate/wiki/How-to-add-a-new-component) to see how you can go about adding your very own component. 

## Making Foundation Styles your own
Foundation is great because it comes with basic styling, leaving it up to you to give it your very own touch. You can do this by changing the `_settings.scss` file inside the `styles` folder:

![alt text](http://i.imgur.com/ScJMdQ6.png "Foundation _settings.scss file")

Simply uncomment any of the sections in the `_settings.scss` file and you will override the default Foundation styling. Don't like the color of the topbar? No problem, change to a nice bright pink instead. Find out more [here.](http://foundation.zurb.com/docs/using-sass.html)

## Troubleshooting
Even crème de menthe projects have their issues. Here are some problems you may face along with some suggestions on how to resolve them:

#### 1. Issue: I'm getting the following error when running `npm install`: ***"Error: EPERM or operation not permitted or permission denied"***
This error means that NPM was not able to install one of the node modules to the file system. There are three major reasons why this could happen:

* You don't have write access to the installation directory.
* The permissions in the NPM cache got messed up.
* You have over-zealous anti-virus software installed, and it's blocking file system writes.

**Suggestion:**

1. Run `npm cache clean`.
2. Run `npm install` again.

#### 2. Issue: I'm getting the following error when running `npm install`: ***"Error: Can't find Python executable 'python', you can set the PYTHON env variable."***
**Suggestion:** This error can be ignored (it's a warning really) as the node modules will install successfully anyway. The reason this error appears is because
some node modules have dependencies on a clunky build tool called `node-gyp` that compiles C++ extensions for NodeJS, and it requires python. Long story short,
if you don't have Python installed on your machine you will see these errors but it's nothing to worry about.

#### 3. Issue: I'm getting an error when running the `grunt production` task.
**Suggestion:** Make sure you have administrator permissions to delete folders from the directory. If you're still seeing the issue then manually delete the `production` folder and run `grunt production` again.
<br>
<br>

#### 4. Issue: I'm getting the following error when running the `grunt test` task: ***"No selenium server jar found at the specified location"***
**Suggestion:** Run the following command and try again: `webdriver-manager update`
<br>
<br>

#### 5. Issue: I'm still getting an error when running the `grunt test` task.
**Suggestion:** Make sure you have Java installed. Close and re-launch the command line and try again.
<br>
<br>

#### 6. Issue: I'm getting the following error ***"Error: Cannot find module 'stylus'"***
**Suggestion:** Run the following command: `npm install stylus -g`
<br>
<br>

#### 7. Issue: I'm getting the following error when running the `grunt watch` task: ***"Error: 'libsass' bindings" not found. Try reinstalling 'node-sass'***
**Suggestion:** Run the following command: `npm install grunt-sass`
<br>
<br>

#### 8. Issue: Bower hangs and cannot fetch the libraries when running `npm install`
**Suggestion:**
Set Git global options to fetch components over 'https' instead of 'git' by running the following command:
`git config --global url."https://".insteadOf git://`
<br>
<br>

#### 9. Issue: None of the above solutions have helped
**Suggestion 1:**

1. Stop the `grunt watch` task.
2. Run `grunt clean`
3. Run `grunt watch` again.

**Suggestion 2:**

This project has been tested with the following tools:
* **NodeJs:** 4.2.1
* **Npm:** 2.14.7

If you are running into issues while installing node packages then ensure you have the versions above installed.

## Contribute
Believe it or not, **angularjs-foundation-boilerplate** is not perfect. If you want to improve it somehow then by all means go ahead and create a pull request :-)

## Changelog
### 1.0.1
**06/11/2015**
* Updated font awesome icons
* Reduced size of favicon
* Updated grunt file

### 1.0.0
**30/10/2015**
* Initial Release

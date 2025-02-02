# ionic-angular-learning

In this project I will learn about angular and ionic basics.

(I am working on windows 11)

##

## I - Setup the environment, prettier format.

Install node via nvm.

nvm download link
[nvm download link](https://github.com/coreybutler/nvm-windows)
or

```bash
https://github.com/coreybutler/nvm-windows
```

After successfully installing nvm, open powershell or Command Prompt to install Node.js. This project is built on Node.js version 20.18.0.

```bash
nvm install 20.18.0
```

If you have installed multiple versions of Node.js, set version 20.18.0 as default.

```bash
nvm use 20.18.0
```

##

## II - Start Angular 18 base

Install Angular CLI

```bash
npm install -g @angular/cli
```

Create a new project

```bash
ng new <project-name>
```

### II.I - Lesson 1. Angular Architecture

### II.II - Lesson 2. Component.

### II.III - Lesson 3: Create the application’s HousingLocation component

### II.IV - lesson 4 - Creating an interface

### II.V - Lesson 5: Add an input parameter to the component

### II.VI - Lesson 6 - Add a property binding to a component’s template

### II.VII - Lesson 7 - Add an interpolation to a component’s template

### II.VIII - \*ngFor/@for

### II.IX - Lesson 9 - Services

### II.X - Lesson 10. Routes

### II.XI - Lesson 11. Integrate details page into application

### II.XII - Lesson 12. Form

### II.XIII - Lesson 13. Add search feature (Home)

### II.XIV - Lesson 14. HTTP communication

##

## III - Review basic knowledge Angular 18

### III.I - ngModel - Data/Events/Two-way binding

### III.II - Directives & fix logic get currentPath/pageTitle

### III.III - Pipes

### III.IV - Fix Pipes & Create CustomPipes

### III.V - Services and Dependency Injection + restyle with common.scss

### III.VI - HTTP - CLIENT

#### II.VI.I - Create Menu REST API

#### III.VI.II - Fix Menu REST API - CRUD menu combined with form

### III.VII - Guards in Routing, Module - Lazy Loading

### III.VIII - Signals

### III.IX - Performance

##

## IV - Ionic basics (Environment setup) - update README.md

Install Ionic CLI

```bash
npm install -g @ionic/cli
```

## IV.I - Get to know ionicframework - Creating the project

[Overview](https://ionicframework.com/docs/angular/overview)

Creating the project

```bash
ionic start
```

Select Angular -> enter project name (ionic-base)-> choose template (sidemenu) -> build app with NgModules

Go to project

```bash
cd .\ionic-base
```

Run app

```bash
ionic serve
```

The application is run on the default port 8100.

```bash
http://localhost:8100/
```

===> Understand the structure of ionic project

## IV.II - Create pages

```bash
ionic g page  <page-name | directory/page-name>
```

===> Create a few pages and get familiar with some UI Components

## IV.III - Component - Page navigation - Reactive form

## IV.IV - NGRX

Installing with npm

```bash
npm install @ngrx/store --save
```

```bash
npm install @ngrx/store-devtools --save
```

## IV.V - Build Rest Api using Express, sequelize combined with MSSQLServer

Create registerApi (with registerValidation)

[SQL Server installation guide](https://learn.microsoft.com/en-us/sql/database-engine/install-windows/install-sql-server?view=sql-server-ver16)

[Sequelize documentation](https://sequelize.org/)

[Sequelize migrations](https://sequelize.org/docs/v6/other-topics/migrations/)

## IV.VI - Manage registration and login state with NgRx

Create loginApi

Auto login upon successful registration

## IV.VII - Track login status with ngrx/effects

Installing with npm

```bash
npm install @ngrx/effects --save
```

## IV.VIII - Forgot and recovery password feature

Create forgotPasswordApi

Create resetPasswordApi

Submit a password reset request.

Receive a password reset link (with token) via email.

Reset password

## IV.IX - Complete User Authentication.

Finish (Angular - Ionic/angular at basic level)

##

[Author](https://www.facebook.com/vqduydz)

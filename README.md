# Webpack Setups
Reference to some quick setups for Webpack, Babel, React, Node.js and more!

1. Webpack, React + Babel (Minimal Starter)
1.  
1.   
1.  
1.  
1.  
1.  


-------------------------------------------------------------

### 1. Webpack, React + Babel (Minimal Starter)

A minimal react starter for quickly scaffolding a basic project.

`> mkdir myproject`

`> cd myproject`

We use yarn which is like a variation of the popular npm package installer for node.js. Yarn is quicker and has some additional features to prevent dependency conflicts (you will see a yarn.lock filegenrated, which helps with that)

#### Install Webpack and Webpack Dev Server  


`> yarn init` (enter through all questions)

`> yarn add webpack webpack-dev-server path`

1. **webpack**: The module bundler.
2. **webpack-dev-server**: Serves a webpack app. Updates browser on change.
3. **path**: utilities for working with file and directory paths

```
success Saved 3 new dependencies.
├─ path@0.12.7
├─ webpack-dev-server@2.4.1
└─ webpack@2.2.1
```

* Webpack is a javascript file with a JSON object which sets a Webpack configurations.
* Careful of javascript typos. It's not a text file. A typo will stop execution, similar to a typo in any .js file.
* Watch square/curly brackets, semicolons and commas for proper formatting.


`> touch webpack.config.js` and edit with:

```javascript
/* ./webpack.config.js  */

const path = require('path');
module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}
```
*What each block means:*

1. **module.exports**: needed to allow other .js config files to access this.
2. **entry**: source script, where the bundler pulls the source code for processing.
3. **output**: path:, filename: path to save the processed bundle
4. **loaders**: transformations, filters to apply to pre-processed files
  * All .js and .jsx files are transformed.
  * Exclude node_modules, do not transform those.

#### Install Babel

`> yarn add babel-loader babel-core babel-preset-es2015 babel-preset-react --dev`

* **babel-loader**: Transpiling JS files using Babel & webpack.
* **babel-core**: Core Babel transpiler
* **babel-preset-es2015**: Transpiles to ES5
* **babel-preset-react**: Transpiles JSX

`> touch .babelrc` Babel API options allowed (except callbacks)

Edit .babelrc

```javascript
{
    "presets":[
        "es2015", "react"
    ]
}
```

#### Setup client HTML & JS

`> mkdir client`

`> touch index.html index.js`

Edit index.js:

```javascript
/* webpack entry */
console.log('Standby for advanced web development...')
```

Edit index.html:
```
<!-- basic html scaffolding -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>React Setup</title>
  </head>
  <body>
    <div id="root">

    </div>
  </body>
</html>
```

* React components will be rendered in `<div id="root">`
* We could use a script calling bundle.js.
* In this case we'll use html-webpack-plugin

#### Install Plugin: HTML Webpack

`> yarn add html-webpack-plugin`

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})

...
...

    },
  plugins: [HtmlWebpackPluginConfig]
}
```

* **template**: Our client/index.html ise set as a template in the plugin
* **filename**: It generates an index.html filename
* **inject**: The js file is after the closing body tag

In package.json under the "license" entry add:

```javascript
"scripts": {
  "start": "webpack-dev-server"
},

...

```

#### Start Web Server

`> yarn start`

In your command console you should see something like:

```
Result:

 ...

[85] multi (webpack)-dev-server/client?http://localhost:8080 ./client/index.js 40 bytes {0} [built]
  + 71 hidden modules
Child html-webpack-plugin for "index.html":
 chunk    {0} index.html 541 kB [entry] [rendered]
     [0] ./~/lodash/lodash.js 540 kB {0} [built]
     [1] (webpack)/buildin/global.js 509 bytes {0} [built]
     [2] (webpack)/buildin/module.js 517 bytes {0} [built]
     [3] ./~/html-webpack-plugin/lib/loader.js!./client/index.html 590 bytes {0} [built]
webpack: Compiled successfully.
```

View in Browser

* Open your browser on `http://localhost:8080/`
* Should see a blank page but CTL-SHIFT-I and look in console for the console log message we entered in index.js. Also see title tag for the page.

Common ERRORS:
1. Typos in .babelrc, webpack.conf, package.json - check for typos.
1. Yarn installs in wrong directory - check all installs and node_modules should be at root, not in th client dir.)
1. Forgetting to install a module, check that all modules were installed.

#### Initial React component

`> yarn add react react-dom`

1. `> mkdir components`
1. `> cd components`
1. `> touch App.jsx`

* note: Some developers use .js for React components instead of .jsx. It's usually considered best practice (such as by Facebook and Airbnb Style Guide) to use .jsx, but functionally it does not matter, as long as our Webpack babel loaders process both .js and .jsx.

* Another difference: When you import a component, by default, .jsx needs to be called as part of the import = so `import App from './components/App.jsx';`
, but if you are using .js, it can be left off.

* By convention we use PascalCase to name React Components.

Edit client/components/App.jsx:

```javascript
import React from 'react';

export default class App extends React.Component {
  render() {
    return (
     <div style={{textAlign: 'center'}}>
        <h3>Initial React Component</h3>
      </div>);
  }
}
```

Edit client/index.js:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

ReactDOM.render(<App />, document.getElementById('root'));
```

`> yarn start` and see browser: `http://localhost:8080/`

#### Add Messages.jsx - another React component

Create new file in the components directory:
`touch Messages.jsx`

```javascript
import React from 'react';

class Messages extends React.Component {
  render() {
    return (
     <div style={{padding:10}}>
        <p>My first message</p>
      </div>);
  }
}
export default Messages;

```

Now in App.jsx, at the top:

 `import Messages from './Messages.jsx';`

and inside the render method:

`<Messages />`

App.jsx source code:

```javascript
import React from 'react';
import Messages from './Messages.jsx';

export default class App extends React.Component {
  render() {
    return (
     <div style={{textAlign: 'center'}}>
        <h1>Initial React Component</h1>
        <Messages />
      </div>);
  }
}
```

`> yarn start` and see browser: `http://localhost:8080/`

#### Messages.jsx - Add props

We can communicate properties/values between components with "props".

* In App.jsx replace <Messages/> with `<Messages item={"message"} />`

Now we can connect this to Messages - the string inside item ("message") gets passed to the Messages component as props.item

* In Messages.jsx add into the render method ` - {this.props.message}`

So now we have in each component, Messages.jsx:

```javascript
class Messages extends React.Component {
  render() {
    return (
     <div style={{padding:10}}>
        <p>My first message - {this.props.message}</p>
      </div>);
  }
}
```

and App.js:

```javascript
render() {
  return (
   <div style={{textAlign: 'center'}}>
      <h1>Initial React Component</h1>
      <Messages item={"This is my message!"} />
    </div>);
}
```

`> yarn start` and see browser: `http://localhost:8080/`

Notice that "This is my message!" now displays.


#### App.jsx - Add State.

Let's add a basic constructor with this.state to App.jsx:

```javascript
constructor(props) {
  super(props);
  this.state = {
    date: new Date()
  };
}
```

Now inside the render() method add a prop to the Messages component:

```javascript
<Messages
  item={"message"}
  date={this.state.date.toLocaleTimeString()}
/>
```

Lastly in Messages.jsx, display the new prop:  

`My first message - {this.props.message} - {this.props.date}`

`> yarn start` and see browser: `http://localhost:8080/`

#### App.jsx - Add reactive State

We're going to automaticallyl update our state with a timer.

In App.jsx, modify the constructor, zero out clock, time:

```javascript
constructor(props) {
  super(props);
  this.state = {
    date: new Date(),
    clock: 0,
    time: ''
  };
}
```

Next the "lifecycle method" componentDidMount(), when the app is first loaded, it will call the startTimer() helper method:

```javascript
componentDidMount() {
  this.startTimer();
}

```

Helper method startTimer() gets a new time and sets the interval which also calls the update function:  

```javascript
startTimer(){
  let offset = new Date()
  interval = setInterval(this.update.bind(this), 1)
}
```
Helper method update() gets the current clock state and calculates the difference of current time with time from last update using the calculateOffset() help method and sets the new State:

```javascript
update() {
  let clock = this.state.clock
  clock += this.calculateOffset()
  this.setState({clock: clock })
  let time = clock;
  this.setState({time: time })
}
```

Helper method calculateOffset() compares now to previous time.

```javascript
calculateOffset() {
  let now = new Date()
  let newOffset = now - offset
  offset = now
  return newOffset
}
```

In the Messages.jsx component in the render() method we add:

`- {this.props.time}`  

`> yarn start` and see browser: `http://localhost:8080/`

You shoudl see a number being updated. However, the nu,ber is not formatted correctly.   

Now lets format the time correctly.

-------------------------------------------------------------









for later:

```
var MESSAGES= [
  {category: 'News', user:'nbc', message: 'France looks at election results',rating:'26'},
  {category: 'Tech', ', user: 'google', message: 'Google looking to buy a robot company',rating:'5'},
  {category: 'News', ', user: 'cbs', message: 'More Fighting in Iraq',rating:'12'},
  {category: 'Finance', user: 'wallstreetjournal', message: 'Stock Market Reaches New Highs',rating:'15'},
  {category: 'New York City', user: 'bobdobbs', message: 'SoHo getting makeover, see Houston',rating:'22'},
  {category: 'Personal', user: 'mike', message: 'Hey what's up man haven;t heard from you in a while',rating:'56'}
];
```

```
var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
```


.

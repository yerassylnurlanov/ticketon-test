import Reactotron from 'reactotron-react-native'

Reactotron
.configure({
  host: '192.169.100.9', // default is localhost (on android don't forget to `adb reverse tcp:9090 tcp:9090`)
  name: 'Ignite App' // would you like to see your app's name?
}) // controls connection & communication settings
.useReactNative() // add all built-in react native plugins
.connect() // let's connect!

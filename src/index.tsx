/* @refresh reload */
import { render } from 'solid-js/web'

import App from './App'
import { getPresets } from './presets'

const root = document.getElementById('root')
const presets = getPresets();

render(() => <App presets={presets} />, root!)

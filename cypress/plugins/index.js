const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')
const createEsbuildPlugin =   require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const nodePolyfills =   require('@esbuild-plugins/node-modules-polyfill').NodeModulesPolyfillPlugin
const addCucumberPreprocessorPlugin =   require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = async (on, config) => {
	
	on('task', {downloadFile})
	await addCucumberPreprocessorPlugin(on, config) // to allow json to be produced
	  // To use esBuild for the bundler when preprocessing
	on(
	  'file:preprocessor',
	  createBundler({
	    plugins: [nodePolyfills(), createEsbuildPlugin(config)],
	  })
	)
		
	return config
}

module.exports = (on, config) => {
	

}

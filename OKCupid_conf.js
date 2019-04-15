module.exports = function(config) {
  config.set({
	  seleniumAddress: 'http://localhost:4444/wd/hub',
	  suites: {
	  	OKCupid: 'OKCupid.js'
	  	// POF: 'POF.js'
	  	// Zoosk: 'zoosk.js'
	  }
 	 // specs: ['OKCupid.js']
  })
}
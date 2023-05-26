//we just directly override the global.fetch function, which is what our app leverages to make remote requests.
global.fetch = require('jest-fetch-mock');
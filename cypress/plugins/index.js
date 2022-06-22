/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

require("dotenv").config({ path: ".env.development.local" })
const mongoose = require("mongoose");
import User from "../../models/database/user";

;(async () => {
	global.mongoose = mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
})()


/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task',{
    async verifyEmail(email){
      console.log("verify email task");
      console.log('email', email);
      const user = await User.findOneByEmail(email);
      console.log('user', user);
      const verifyLink = `${process.env.SERVER_BASE_URL}/verify-email?token=${encodeURIComponent(user.emailVerificationCode)}&email=${encodeURIComponent(email)}`;
      console.log('verifyLink', verifyLink);
      return verifyLink
    }
  })
}

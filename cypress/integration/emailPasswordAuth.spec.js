const { v4: uuid } = require("uuid")

describe("Navigation", () => {
	it("Register Flow", async () => {
		// Go To Register Page
		cy.visit("http://localhost:3000/signup")
		const user = `user-${uuid()}`
		const password = `password-${uuid()}`
		const email = `rewave-${user}@saurwein.net`

		// Type all necessary information to register user
		cy.findByRole("textbox", {
			name: /first name/i,
		}).type("John")
		cy.findByRole("textbox", {
			name: /last name/i,
		}).type("Doe (Cypress)")

		cy.findByPlaceholderText(/your e\-mail/i).type(email)
		cy.findByPlaceholderText(/confirm e\-mail/i).type(email)

		cy.get("#password").type(password)
		cy.get("#password-confirm").type(password)

		cy.get(".Checkbox_checkmark__UL2QR").click()

		cy.findByRole("button", {
			name: /register/i,
		}).click()

		// Should land on "Signed Up Sucessfully" Page
		cy.get(".login__Instructions-sc-1q91r8q-5").then(($el) => {
			expect($el).to.be.visible
		})

		// User should not be able to login with an invalid password
		cy.findByRole("textbox", {
			name: /e\-mail password/i,
		}).type(email)
		cy.findByPlaceholderText(/your password/i).type("Stupid shit")
		cy.get(".dzNCZd").click()

		cy.findByText("Please check whether your credentials are correct").then(
			($el) => {
				expect($el).to.be.visible
			}
		)

		// Type in correct password and try to login again
		cy.findByPlaceholderText(/your password/i).clear()
		cy.findByPlaceholderText(/your password/i).type(password)
		cy.get(".dzNCZd").click()

		// E-Mail is not verified yet
		cy.findByText(
			'You must verify your E-Mail address before logging in. Please check your inbox. If you haven\'t received an email within 10 minutes, please click "Forgot your password".'
		).then(($el) => {
			expect($el).to.be.visible
		})

		// Generate Verification Link (See Plugins file) that should be sent to the `email`
		cy.task('verifyEmail',email).then(link=>{
			cy.visit(link)
			cy.findByText(
				'Your email has been verified succesfully'
			).then(($el) => {
				expect($el).to.be.visible
			})
			cy.findByRole("textbox", {
				name: /e\-mail password/i,
			}).type(email)
			cy.findByPlaceholderText(/your password/i).type(password)
			cy.get(".dzNCZd").click()
			cy.findByText(
				'Welcome, John'
			).then(($el) => {
				expect($el).to.be.visible
			})
		})
		
	})
})

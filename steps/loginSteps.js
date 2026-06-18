const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../pages/loginPage');

Given('user opens {string}', async function (url) {
    this.loginPage = new LoginPage(this.page)
    await this.loginPage.goto(url)
})

Then('the login page should be visible', async function () {
    await this.loginPage.assertLoginPageVisible();
})

When('user enters username {string}', async function (username) {
    await this.loginPage.fillUsername(username);
})

When('user enters password {string}', async function (password) {
    await this.loginPage.fillPassword(password);
})

When('user clicks the login button', async function () {
    await this.loginPage.clickLogin();
})

Then('user should be redirected to the products page', async function () {
    await this.loginPage.assertRedirectedProducts();
})

Then ('user should see error message {string}', async function (message) {
    await this.loginPage.assertErrorMessage(message);
})
const {expect} = require ('@playwright/test');

class LoginPage {
    constructor(page){
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async goto(url){
        await this.page.goto(url);
    }

    async fillUsername(username) {
        await this.usernameInput.fill(username);
    }

    async fillPassword(password) {
        await this.passwordInput.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async assertLoginPageVisible() {
        await expect(this.loginButton).toBeVisible();
    }

    async assertRedirectedProducts() {
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html')
    }

    async assertErrorMessage(text) {
        await expect(this.errorMessage).toContainText(text);
    }
}
module.exports = LoginPage;
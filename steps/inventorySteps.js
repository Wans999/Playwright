const { Then, When } = require('@cucumber/cucumber');
const InventoryPage = require('../pages/inventoryPage');

Then('user should see the inventory page', async function () {
    this.inventoryPage = new InventoryPage(this.page);
    await this.inventoryPage.assertInventoryPageVisible();
});

Then('products should be displayed', async function () {
    await this.inventoryPage.assertProductsDisplayed();
});

When('user adds the first product to cart', async function () {
    if (!this.inventoryPage) this.inventoryPage = new InventoryPage(this.page);
    await this.inventoryPage.addFirstProductToCart();
});

When('user removes the first product from cart', async function () {
    await this.inventoryPage.removeFirstProductFromCart();
});

Then('the cart badge should show {string}', async function (count) {
    await this.inventoryPage.assertCartBadge(count);
});

Then('the cart badge should not be visible', async function () {
    await this.inventoryPage.assertCartBadgeNotVisible();
});

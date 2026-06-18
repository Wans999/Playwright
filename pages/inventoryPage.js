const { expect } = require('@playwright/test');

class InventoryPage{
    constructor(page){
        this.page = page;
        this.inventoryList = page.locator('.inventory_list');
        this.inventoryItems = page.locator('.inventory_item');
        this.addToCartButton = page.locator('.inventory_item').first().locator('button');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async assertInventoryPageVisible(){
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    }

    async assertProductsDisplayed(){
        await expect(this.inventoryList).toBeVisible();
        await expect(this.inventoryItems).toHaveCount(6);
    }

    async addFirstProductToCart(){
        await this.addToCartButton.click();
    }

    async removeFirstProductFromCart(){
        await this.addToCartButton.click();
    }

    async assertCartBadge(count){
        await expect(this.cartBadge).toBeVisible();
        await expect(this.cartBadge).toHaveText(count);
    }

    async assertCartBadgeNotVisible(){
        await expect(this.cartBadge).not.toBeVisible();
    }
}

module.exports = InventoryPage;
Feature: Inventory functionality

  Background:
    Given user opens "https://www.saucedemo.com"
    And user enters username "standard_user"
    And user enters password "secret_sauce"
    And user clicks the login button

  @inventory
  Scenario: User can see products on inventory page
    Then user should see the inventory page
    And products should be displayed

  @inventory
  Scenario: User can add product to cart
    When user adds the first product to cart
    Then the cart badge should show "1"

  @inventory
  Scenario: User can remove product from cart
    When user adds the first product to cart
    And user removes the first product from cart
    Then the cart badge should not be visible

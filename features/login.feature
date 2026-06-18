Feature: Login functionality

@positive
  Scenario: User can open login page
    Given user opens "https://www.saucedemo.com"
    Then the login page should be visible
    When user enters username "standard_user"
    And user enters password "secret_sauce"
    And user clicks the login button
    Then user should be redirected to the products page

@negative
Scenario Outline: User cannot login with invalid credentials
    Given user opens "https://www.saucedemo.com"
    When user enters username "<username>"
    And user enters password "<password>"
    And user clicks the login button
    Then user should see error message "<message>"

    Examples:
    | username      | password      | message                                                   |
    | wrong_user    | secret_sauce  | Epic sadface: Username and password do not match any user |
    | standard_user | wrong_pass    | Epic sadface: Username and password do not match any user |
    |               |               | Epic sadface: Username is required                        |
    | standard_user |               | Epic sadface: Password is required                        |
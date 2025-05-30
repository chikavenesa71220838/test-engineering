Feature: User Login and Cart Functionality
  As a user
  I want to login and manage my cart
  So that I can shop easily on the website

  Scenario: Failed login with invalid credentials
    Given the user is on the login page
    When the user enters an invalid username and password
    And the user clicks the login button
    Then the user should see a failed message

  Scenario: Successful login with valid credentials
    Given the user is on the login page
    When the user enters a valid username and password
    And the user clicks the login button
    Then the user should see the products page

  Scenario: Successfully adding an item to the cart
    Given the user is logged in
    When the user adds an item to the cart
    Then the cart should contain the item

  Scenario: Successfully removing an item from the cart
    Given the user is logged in
    And the user adds an item to the cart
    When the user removes the item from the cart
    Then the cart should be empty

Scenario: Cart badge update after adding item
  Given the user is on the login page
  When the user enters a valid username and password
  And the user clicks the login button
  And the user adds an item to the cart
  Then the cart icon should display number 1


Scenario: Logout
  Given the user is on the login page
  When the user enters a valid username and password
  And the user clicks the login button
  Then the user clicks the logout button




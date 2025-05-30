import { Builder, By, until } from "selenium-webdriver";
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "chai";

setDefaultTimeout(30000);

let driver;

Given("the user is on the login page", async function () {
  driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://www.saucedemo.com/");
});

When("the user enters an invalid username and password", async function () {
  await driver.findElement(By.id("user-name")).sendKeys("invalid_user");
  await driver.findElement(By.id("password")).sendKeys("wrong_password");
});

When("the user enters a valid username and password", async function () {
  await driver.findElement(By.id("user-name")).sendKeys("standard_user");
  await driver.findElement(By.id("password")).sendKeys("secret_sauce");
});

When("the user clicks the login button", async function () {
  await driver.findElement(By.id("login-button")).click();
});

Then("the user should see a failed message", async function () {
  const errorMsg = await driver
    .wait(until.elementLocated(By.css("[data-test='error']")), 5000)
    .getText();
  expect(errorMsg).to.include("Username and password do not match");
  await driver.quit();
});

Then("the user should see the products page", async function () {
  const title = await driver
    .wait(until.elementLocated(By.className("title")), 5000)
    .getText();
  expect(title).to.equal("Products");
  await driver.quit();
});

Given("the user is logged in", async function () {
  driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://www.saucedemo.com/");
  await driver.findElement(By.id("user-name")).sendKeys("standard_user");
  await driver.findElement(By.id("password")).sendKeys("secret_sauce");
  await driver.findElement(By.id("login-button")).click();
  await driver.wait(until.elementLocated(By.className("title")), 5000);
});

When("the user adds an item to the cart", async function () {
  await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click();
});

Then("the cart should contain the item", async function () {
  await driver.findElement(By.className("shopping_cart_link")).click();
  const cartItem = await driver
    .wait(until.elementLocated(By.className("inventory_item_name")), 5000)
    .getText();
  expect(cartItem).to.equal("Sauce Labs Backpack");
  await driver.quit();
});

When("the user removes the item from the cart", async function () {
  await driver.findElement(By.className("shopping_cart_link")).click();
  await driver
    .wait(until.elementLocated(By.id("remove-sauce-labs-backpack")), 5000)
    .click();
});

Then("the cart should be empty", async function () {
  const items = await driver.findElements(By.className("cart_item"));
  expect(items.length).to.equal(0);
  await driver.quit();
});

Then("the cart icon should display number 1", async function () {
  const cartBadge = await driver.findElement(By.className("shopping_cart_badge")).getText();
  expect(cartBadge).to.equal("1");
  await driver.quit();
});

Then("the user clicks the logout button", async function () {
  // Klik tombol menu (☰)
  await driver.findElement(By.id("react-burger-menu-btn")).click();

  // Tunggu sampai menu logout terlihat dan bisa diklik
  const logoutBtn = await driver.wait(
    until.elementIsVisible(driver.findElement(By.id("logout_sidebar_link"))),
    5000
  );
  await logoutBtn.click();
  await driver.quit();
});


// Then("the user should be redirected to the login page", async function () {
//   // Tunggu sampai URL menunjukkan halaman login
//   await driver.wait(async () => {
//     const url = await driver.getCurrentUrl();
//     return url.includes("saucedemo.com/");
//   }, 10000);

//   // Tunggu sampai tombol login muncul dan terlihat
//   const loginBtn = await driver.wait(
//     until.elementLocated(By.id("login-button")),
//     10000
//   );
//   await driver.wait(until.elementIsVisible(loginBtn), 5000);

//   // Pastikan tombol login tampil
//   expect(await loginBtn.isDisplayed()).to.be.true;

//   await driver.quit();
// });



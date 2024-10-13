import { expect, test } from "@playwright/test";
import { assert } from "console";
import { faker } from "@faker-js/faker";

test("E2E test for shopping", async ({ page }) => {
  await test.step("Login to the demo website", async () => {
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill("anshika@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole("button", { name: "Login" }).click();
  });

  await test.step("Add product to the cart", async () => {
    const products = page.locator(".card-body");
    //without below line playwright runs too fast and does not capture the elements
    await page.waitForLoadState("networkidle");

    const count = await products.count();
    console.log(count);
    //console.log(count);
    for (let i = 0; i < count; i++) {
      if (
        (await products.nth(i).locator("b").textContent()) === "ADIDAS ORIGINAL"
      ) {
        await products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  });

  await test.step("Check the cart and checkout", async () => {
    await page.getByRole("button", { name: "Cart" }).nth(0).click();
    const productAdded = await page.locator(".cartSection h3").textContent();
    expect(productAdded).toBe("ADIDAS ORIGINAL");
    await page.getByRole("button", { name: "checkout" }).click();
  });

  await test.step("Enter the Credit card info and place order", async () => {
    let cvv = String(faker.number.int({ min: 100, max: 999 }));
    let name = faker.person.firstName();
    await page.getByRole("combobox").nth(0).selectOption({ index: 10 });
    await page.getByRole("combobox").nth(1).selectOption({ index: 28 });
    await page.locator('input[type="text"]').nth(1).fill(cvv);
    await page.locator('input[type="text"]').nth(2).fill(name);
    await page.getByPlaceholder("select country").pressSequentially("aus");
    const dropdown = page.locator("section .ta-results");
    await dropdown.waitFor();
    const options = await dropdown.locator("button").count();
    console.log(options);
    for (let i = 0; i < options; i++) {
      const option = await dropdown.locator("button").nth(i).textContent();
      if (option === " Australia") {
        await dropdown.locator("button").nth(i).click();
        break;
      }
    }
    await page.getByText("Place Order").click();
    await expect(page.locator(".hero-primary")).toHaveText(
      " Thankyou for the order. "
    );
    const orderID = await page
      .locator(".em-spacer-1 .ng-star-inserted")
      .textContent();
    console.log(orderID);

    await page.locator("button[routerlink*=myorders]").click();

    await page.locator("tbody").waitFor();
    const rowcount = page.locator("tbody tr");

    for (let i = 0; i < (await rowcount.count()); i++) {
      const rowOrderId = await rowcount.nth(i).locator("th").textContent();
      if (orderID.includes(rowOrderId)) {
        await rowcount.nth(i).locator("button").first().click();
        break;
      }
    }
  });
});

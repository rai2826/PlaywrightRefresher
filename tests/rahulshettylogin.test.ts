import { expect, test } from "@playwright/test";
import { assert } from "console";

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
});

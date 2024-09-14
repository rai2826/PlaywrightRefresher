import { test } from "@playwright/test";

test("Test1", async ({ page }) => {
  test.step("Go to the URL", async () => {
    await page.goto("https://www.saucedemo.com/");
  });
  test.step("Enter User name and pass word", async () => {
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
  });
});

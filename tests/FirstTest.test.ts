import { expect, test } from "@playwright/test";

test("Test1", { tag: ["@smoke", "@epic123", "@us234"] }, async ({ page }) => {
  await test.step("Go to the URL", async () => {
    await page.goto("https://www.saucedemo.com/");
  });

  await test.step("Enter User name and pass word", async () => {
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
  });

  await test.step("Validate the title page", async () => {
    const title = await page.locator(".app_logo").innerText();
    expect(title).toBe("Swag Labs");
  });
});

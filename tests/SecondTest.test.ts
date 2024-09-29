import { expect, test } from "@playwright/test";

//You can use test.use to override the config defined in config.ts
test.use({ baseURL: `https://the-internet.herokuapp.com` });

test(
  "second login test",
  { tag: ["@smoke", "@epic1234", "@us3456"] },
  async ({ page }) => {
    await test.step("navigating to the url", async () => {
      await page.goto("/login");
    });
    await test.step("Enter username and password", async () => {
      await page.locator("#username").fill("tomsmith");
      await page.locator("#password").fill("SuperSecretPassword!");
      await page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("validate login is successful", async () => {
      expect(await page.getByRole("button", { name: "Logout" })).toBeVisible;
    });

    await test.step("logout", async () => {
      await page.getByRole("link", { name: "Logout" }).click();
    });
  }
);

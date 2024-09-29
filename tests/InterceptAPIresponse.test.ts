import { expect, test } from "@playwright/test";

test("Intercepting the API response", async ({ page }) => {
  await page.goto("https://thinking-tester-contact-list.herokuapp.com/");
  await page.getByRole("button", { name: "Sign up" }).click();
  await page.locator("#firstName").fill("Gaurav");
  await page.locator("#lastName").fill("Rai");
  await page.locator("#email").fill("grvcd@gmail.com");
  await page.locator("#password").fill("1234567abs");

  const adduserapiresponsepromise = page.waitForResponse(
    "https://thinking-tester-contact-list.herokuapp.com/users"
  );

  await page.locator("#submit").click();

  const adduserapires = await adduserapiresponsepromise;
  const adduserapirescode = adduserapires.status();
  //const adduserresponsebody = await adduserapires.body();
  //console.log(adduserapires);
  expect(adduserapirescode).toBe(201);
});

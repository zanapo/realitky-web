import { test, expect } from "@playwright/test";

test("homepage renders", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Moderní realitní kancelář"
  );
});

test("listing page renders", async ({ page }) => {
  await page.goto("/nemovitosti");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Nemovitosti"
  );
});

test("property detail renders", async ({ page }) => {
  await page.goto("/nemovitosti/luxusni-byt-3kk-ostrava-centum");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Luxusní byt"
  );
});

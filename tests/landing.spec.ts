import { test, expect } from "@playwright/test";

test.describe("Landing page", () => {
  test("should have a title", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await expect(page.getByText("Últimos lanzamientos")).toHaveCount(1);
  });
});

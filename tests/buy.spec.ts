import { test, expect } from "@playwright/test";

test.describe.configure({
  mode: "serial",
});

test.describe("Landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.locator("button").nth(2).click();
    await page.getByPlaceholder("Correo electrónico o nombre").click();
    await page.getByPlaceholder("Correo electrónico o nombre").fill("testUser");
    await page.getByPlaceholder("Correo electrónico o nombre").press("Tab");
    await page.getByPlaceholder("Contraseña").fill("123456");
    await page.getByRole("button", { name: "Entrar" }).click();
  });

  test("buy a product", async ({ page }) => {
    await page.goto("http://localhost:3000/hogwarts-legacy");
    await page.getByRole("button", { name: "Comprar ahora" }).click();
    await page.goto("http://localhost:3000/cart");
    await page.getByRole("button", { name: "Proceder con el pago" }).click();
    await page.getByText('Test User (Mi casa de la playa)Calle tampoco existe, 4, 54321, Granada, Granada.').click();
    await page.getByRole('button', { name: 'Pagar' }).click();
    await page.getByRole('button', { name: 'Ver pedido' }).click();
    await page.getByText('/06/20241 productos45.60€').first().click();
  });
});

const { test, expect } = require('@playwright/test');

async function waitForMillseconds(time) {
    await new Promise((resolve) => setTimeout(resolve, Number(time)));
}

test("e22 demo", async ({ page }) => {
    const email = "testuser125@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Mangal@123");
    await page.locator("#login").click();
    await page.getByRole('button', { name: 'Add To Cart' }).nth(1).click();
    await page.getByRole('button', { name: 'Cart' }).nth(0).click();
    await expect(page.getByRole('heading', { name: 'ZARA COAT 3' })).toBeVisible();

    await page.getByRole('button', { name: 'Checkout' }).click();

    expect(await page.locator("label").nth(3).textContent()).toEqual(email);
    await page.locator("[name='coupon']").fill("rahulshettyacademy");

    await page.getByRole('button', { name: 'Apply Coupon' }).click();
    const couponMessage = await page.locator("p.mt-1.ng-star-inserted").textContent();
    await expect(page.getByText(couponMessage)).toBeVisible();

    await page.locator("input.input.txt").nth(2).fill("Sample Text");
    await page.locator("[placeholder*='Country']").pressSequentially("India");
    await page.locator(".ta-results").waitFor();
    const countOptions = await page.locator("[type='button']").count();
    console.log("count is", countOptions)

    for (let i = 1; i < countOptions; i++) {
        console.log(await page.locator("[type='button']").nth(i).textContent() === ' India');
        if (await page.locator("[type='button']").nth(i).textContent() === ' India') {
            console.log(await page.locator("[type='button']").nth(i).textContent() === ' India');
            console.log("mil gya for", i)
            await page.locator("[type='button']").nth(i).click();
            break;
        }
    }
    await page.locator("input.input.txt").nth(1).fill("433");
    await page.locator("a.btnn.action__submit.ng-star-inserted").click();
    console.log("ok done");
});

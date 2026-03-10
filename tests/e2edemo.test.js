const { test, expect } = require('@playwright/test');
require('dotenv').config();


const TEST_DATA = {
    email: process.env.email,
    password: process.env.password,
    couponCode: process.env.couponCode,
    targetCountry: process.env.targetCountry,
    cvv: process.env.cvv
};
async function waitForMillseconds(time) {
    await new Promise((resolve) => setTimeout(resolve, Number(time)));
}


const BASE_URL = "https://rahulshettyacademy.com/client/#/auth/login";

/**
 * E2E Test: Complete Purchase Flow
 * This test covers the full user journey from login to checkout:
 * 1. User Authentication
 * 2. Adding product to cart
 * 3. Cart verification
 * 4. Applying coupon code
 * 5. Filling shipping details
 * 6. Order submission
 */
test("e2e demo - Complete Purchase Flow", async ({ page }) => {

    // ========== STEP 1: User Authentication ==========
    await page.goto(`${BASE_URL}`);
    await page.locator("#userEmail").fill(TEST_DATA.email);
    await page.locator("#userPassword").fill(TEST_DATA.password);
    await page.locator("#login").click();

    // ========== STEP 2: Add Product to Cart ==========
    // Select the second product (ZARA COAT 3) and add to cart
    await page.getByRole('button', { name: 'Add To Cart' }).nth(1).click();

    // ========== STEP 3: Navigate to Cart & Verify ==========
    await page.getByRole('button', { name: 'Cart' }).nth(0).click();
    await expect(page.getByRole('heading', { name: 'ZARA COAT 3' })).toBeVisible();

    // ========== STEP 4: Proceed to Checkout ==========
    await page.getByRole('button', { name: 'Checkout' }).click();

    // Verify user email is pre-populated correctly
    const displayedEmail = await page.locator("label").nth(3).textContent();
    expect(displayedEmail).toEqual(TEST_DATA.email);

    // ========== STEP 5: Apply Coupon Code ==========
    await page.locator("[name='coupon']").fill(TEST_DATA.couponCode);
    await page.getByRole('button', { name: 'Apply Coupon' }).click();

    // Verify coupon success message is displayed
    const couponMessage = await page.locator("p.mt-1.ng-star-inserted").textContent();
    await expect(page.getByText(couponMessage)).toBeVisible();

    // ========== STEP 6: Fill Shipping Details ==========
    // Fill additional shipping information
    await page.locator("input.input.txt").nth(2).fill("Sample Text");

    // Select country from autocomplete dropdown
    await page.locator("[placeholder*='Country']").pressSequentially(TEST_DATA.targetCountry);
    await page.locator(".ta-results").waitFor();

    // Find and select the target country from dropdown options
    const countryButtons = page.locator("[type='button']");
    const countOptions = await countryButtons.count();
    console.log("Available country options:", countOptions);

    for (let i = 0; i < countOptions; i++) {
        const optionText = await countryButtons.nth(i).textContent();
        if (optionText === ` ${TEST_DATA.targetCountry}`) {
            console.log(`Found target country at index: ${i}`);
            await countryButtons.nth(i).click();
            break;
        }
        else {
            console.log(`Option at index ${i} does not match target country: ${optionText}`);
        }
    }

    // Fill CVV/Security code
    await page.locator("input.input.txt").nth(1).fill(TEST_DATA.cvv);

    // ========== STEP 7: Submit Order ==========
    await page.locator("a.btnn.action__submit.ng-star-inserted").click();
    console.log("✅ Order submitted successfully!");
});

test.only("e2e demo - Verify Order History", async ({ page }) => {

    await page.goto(`${BASE_URL}`);
    await page.locator("#userEmail").fill(TEST_DATA.email);
    await page.locator("#userPassword").fill(TEST_DATA.password);
    await page.locator("#login").click();

    await page.locator(".btn.btn-custom").nth(1).click();
    await waitForMillseconds(500);
    
    const TotalOrderNumber = await page.locator("tbody tr").count();
    const orderId1 = "69ad6847415d779f9b627f79"
    await waitForMillseconds(1500);

    for (let i = 0; i < TotalOrderNumber; i++) {

        const matchId = (await page.locator("tbody tr").nth(i).textContent()).match(/^[a-f0-9]+/)[0];
        if (orderId1 === matchId) {
            console.info(`Order ID ${orderId1} found at index ${i}`);
            const row = await page.locator("tbody tr").nth(2);
            await row.locator(".btn.btn-primary").click();
            const fetchOrderId = await page.locator(".col-text.-main").textContent();
            expect(fetchOrderId).toEqual(orderId1)
             console.info(`Order ID ${orderId1} found at index ${i}`);
            break;
        }
    }
});
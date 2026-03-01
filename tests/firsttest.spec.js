const { test, expect } = require('@playwright/test');

async function waitForMillseconds(time) {
    await new Promise((resolve) => setTimeout(resolve, Number(time)));
}

// browser is annotation
test("my test2", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://google.com")
    console.log("done test")
});


test('open google', async ({ browser }) => {

    //  await page.got
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://facebook.com")

});
test('open facebook', async ({ page }) => {

    // const context = await browser.newContext();
    // const page = await context.newPage();
    // await page.goto("https://facebook.com")
    // await page.locator.title;
    // const pageTitle = await page.title();
    // console.log("this title",await page.title())
    // await expect(page.title()).toBe("Facebook – log in or sign up");  
    // await expect(page).toHaveTitle("Facebook – log in or sign up");
    // await expect(await page.title()).toContain("Facebook");
    // await expect(page).toBeNull;


    // await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // await expect(page.title()).toBe("Rahul Shetty Academy");
    // await expect(page).toHaveTitle("Rahul Shetty academy")
    // await page.locator("#username").fill("adityamangal0202@m")
    // await page.locator("#password").fill("adityamangal0202@m")
    // await page.locator("#signInBtn").click();
    // console.log("here",await page.locator("#username").textContent());

    const firstPhone = page.locator(".card-body").nth(0).textContent();
    await page.goto("https://portal-devex-qa.payrix-qa.net/login");
    // await expect(await page.title()).toBe("Payrix");
    // await expect(page).toHaveTitle("Rahul Shetty academy")
    await page.locator("(//input[@formcontrolname='username'])[1]").fill("adi22")
    await page.locator("[type='text']").fill("adi22")   // alternate work  // ask
    await new Promise((resolve) => setTimeout(resolve, Number('2500')));

    // await page.locator("(//input[@formcontrolname='password'])[1]").fill("testpsc1")
    // await page.locator("[type='password'].nth(1)").fill("testpsc1")   //ask
    await page.locator("[name='password']").fill("testpsc1")
    // await new Promise((resolve) => setTimeout(resolve, Number('2000')));
    await new Promise((resolve) => setTimeout(resolve, Number('3000')));
    await page.getByText('Log In').click();
    // await page.locator("//*[contains(text(), 'Log In')]").click();
    await new Promise((resolve) => setTimeout(resolve, Number('2000')));
    // console.log("here",await page.locator("#username").textContent());
    await page.locator(".card-body").nth(0).textContent();
    console.log(firstPhone)

});
test('open academy website', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // await expect(page).toHaveTitle("Rahul Shetty academy")
    // await new Promise((resolve) => setTimeout(resolve, Number('1200')));
    await page.locator("#username").fill("rahulshettyacademy")
    await new Promise((resolve) => setTimeout(resolve, Number('1000')));
    await page.locator("#password").fill("learning")
    await new Promise((resolve) => setTimeout(resolve, Number('1000')));
    await page.locator("#signInBtn").click();
    await new Promise((resolve) => setTimeout(resolve, Number('100')));

    const firstPhone = await page.locator(".card-body a").first().textContent();
    // const firstPhone = await page.locator(".card-body").nth(0).textContent();
    const firstPhone2 = await page.locator(".card-body a").nth(0).textContent();
    const firstPhone3 = await page.locator(".card-body a").nth(1).textContent();
    // const firstPhonew = page.locator(".card-body").nth(1);
    console.log(firstPhone)
    console.log(firstPhone2)
    console.log(firstPhone3)

});


export async function getElement(num) {
    const ok = await page.locator(".card-body b").nth(num).textContent();
    return ok;
}
test('test project', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/auth/login");
    // await expect(page).toHaveTitle("Rahul Shetty academy")
    // await new Promise((resolve) => setTimeout(resolve, Number('1200')));
    await page.locator("#userEmail").fill("test@test21.com")
    await waitForMillseconds('1000');
    await page.locator("#userPassword").fill("Mangal@123")
    await waitForMillseconds('1000');
    await page.locator("#login").click();
    await waitForMillseconds('1000');
    // async function getElement(num) {

    //     const ok = await page.locator(".card-body b").nth(num).textContent();
    //     console.log(ok);
    // }
    // const firstPhone = await page.locator(".card-body b").first().textContent();
    await page.waitForLoadState('networkidle');
    const firstPhone = await page.locator(".card-body b").allTextContents();
    console.log(firstPhone)
    // console.log(firstPhone[0])
    // const firstPhone2 = await page.locator(".card-body b").last().textContent();
    // console.log("okok2",getElement(0))
    // getElement(0)
    // getElement(1)
    // getElement(2)
});

test('dropdown test', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#username").fill("adityamangal0202@m")
    await waitForMillseconds('1000');
    await page.locator("#password").fill("adityamangal0202@m")
    await waitForMillseconds('1000');
    const dropdown = await page.locator("select.form-control");
    await waitForMillseconds('1000');
    dropdown.selectOption("teach");
    await waitForMillseconds('1000');
    await page.locator("label.customradio").nth(1).click();
    // await waitForMillseconds('1000');
    expect(await page.locator("label.customradio").nth(1)).toBeChecked();
    expect(await page.locator("label.customradio").nth(1).isChecked()).toBeTruthy();
    console.log((await page.locator("label.customradio").nth(1).isChecked()))
    await page.locator("#okayBtn").click();
    await waitForMillseconds('500');
    await page.locator("#signInBtn").click();
    await waitForMillseconds('500');
    // await page.pause();

});

test('child window test', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // await page.locator("#username").fill("adityamangal0202@m")
    // await waitForMillseconds('1000');
    // await page.locator("#password").fill("adityamangal0202@m")
    // await waitForMillseconds('1000');
    // const dropdown = await page.locator("select.form-control");
    // await waitForMillseconds('1000');
    // dropdown.selectOption("teach");
    // await waitForMillseconds('1000');
    // await page.locator("label.customradio").nth(1).click();
    // // await waitForMillseconds('1000');
    // expect(await page.locator("label.customradio").nth(1)).toBeChecked();
    // expect(await page.locator("label.customradio").nth(1).isChecked()).toBeTruthy();
    // console.log((await page.locator("label.customradio").nth(1).isChecked()))
    // await page.locator("#okayBtn").click();
    // await waitForMillseconds('500');
    // await page.locator("#signInBtn").click();
    // await waitForMillseconds('500');
    // await page.pause();

    // await page.locator("[href*='https://rahulshettyacademy.com/documents-request']")
    const doc = page.locator("[href*='documents-request']")
    console.log(doc)
    await expect((doc).toHaveAtrribute("class","blinkingTexts"))
});

 test.only('child window', async ({browser}) => { 
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log("done")
    const page2Link = await page.locator("[href*='documents-request']")
    console.log("link here ",page2Link)
    
    // child window open
    const [page2] = await Promise.all([
        context.waitForEvent('page'),
        page2Link.click()
    ]);
    
    let text = await page2.locator(".red").textContent();
    await page2.locator(".red").textContent();
    console.log(text)
    const array = text.split('@')
    const email = array[1].split(' ')[0]
    console.log(array)
    console.log(email)
    await page.locator("#username").fill(email)
    // await page.pause();
    await waitForMillseconds('1000');
    await page.locator("#password").fill("adityamangal0202@m")
    await waitForMillseconds('3000');
});
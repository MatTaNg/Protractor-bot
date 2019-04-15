describe('Zoosk', function() {

jasmine.DEFAULT_TIMEOUT_INTERVAL = 43200000; //In miliseconds

    var userID = "mattang5280@gmail.com";
    var password = "Ab@2dragons";
    var message = "Hey trouble :)";

    var login_button = element(by.xpath(".//*[@id='login-form-trigger']"));
    var email_textBox = element(by.xpath("html/body/div[4]/div/div/div/div/div[3]/form/div/div[1]/input"));
    var password_textBox = element(by.xpath("html/body/div[4]/div/div/div/div/div[3]/form/div/div[2]/input"));
    var submitCredentials = element(by.xpath("html/body/div[4]/div/div/div/div/div[3]/form/button"));


browser.waitForAngularEnabled(false);

function signInUser() {
    return login_button.click().then(function() {
        browser.wait(protractor.ExpectedConditions.visibilityOf(email_textBox), 10000,"Element not visible timing out");
        return email_textBox.sendKeys(userID).then(function() {
            return password_textBox.sendKeys(password).then(function() {
                return submitCredentials.click();
            });
        });
    });
};

it('should automatically send messages', function() {
    browser.get('http://www.zoosk.com/').then(function() {
            //Sign in User
            signInUser().then(function() {
                browser.pause();
            });
        });
});
});

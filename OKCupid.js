describe('OKCupid', function() {

    var userID = "ng5280@hotmail.com";
    var password = "Ab@2dragons";
    var message = "Hey trouble";
    
    var signIn = element(by.xpath(".//*[@id='root']/div/div[1]/div/div/div[2]/button"));
    var userID_textBox = element(by.xpath(".//*[@id='login_username']"));
    var password_textBox = element(by.xpath(".//*[@id='login_password']"));
    var submitCredentials_button = element(by.xpath(".//*[@id='sign_in_button']"));
    var browseMatches = element(by.xpath(".//*[@id='navigation']/div[1]/ul/li[1]/a/span"));
    var message = element(by.xpath(".//*[@id='profile2015']/div[1]/div/div[2]/button[1]"));
    var message_was_sent = element(by.css(".message yours"));
    // var messageBox = element(by.css("form .inputcontainer.textarea.empty"));

    browser.waitForAngularEnabled(false);

    it('should automatically send messages', function() {
        browser.get('https://okcupid.com').then(function() {
            //Sign in User
            signIn.click().then(function() {
                userID_textBox.sendKeys(userID).then(function() {
                    password_textBox.sendKeys(password).then(function() {
                        submitCredentials_button.click().then(function() {
                            //User has Signed in
                            console.log("BROWSER GET");
                            browser.get("https://www.okcupid.com/match").then(function() {
                                // browser.driver.wait(protractor.until.elementIsVisible(element(by.css(".match_card_wrapper"))));
                                var all_matches = element.all(by.css(".match_card_wrapper"));
                                
                                all_matches.get(0).click().then(function() {
                                    message.click().then(function() {
                                        message_was_sent.isPresent().then(function(present) {
                                            if(present === false) {
                                                //Sending Message
                                                console.log("PRESENT");
                                                var messageBox = element(by.xpath(".//textarea[starts-with(@id,'message_')]"));
                                                messageBox.sendKeys(message).then(function() {
                                                    console.log("SEND KEYS");
                                                    browser.pause();
                                                    var sendMessage = element.all(by.buttonText('Send'));
                                                    sendMessage.click().then(function() {
                                                        browser.navigate().back();
                                                        browser.pause();
                                                    });  
                                                });


                                             // element.all(by.tagName("textarea")).each(function(item) {
                                                //     console.log("TEXT AREA");
                                                //     console.log(item);
                                                //     console.log(typeof(item));
                                                //     item.isDisplayed().then(function(displayed) {
                                                //         console.log(displayed);
                                                //         if(displayed === true) {
                                                //             item.sendKeys("Hey trouble :)").then(function() {
                                                //             console.log("SEND KEYS");
                                                //             browser.pause();
                                                //             var sendMessage = element.all(by.buttonText('Send'));
                                                //             sendMessage.click().then(function() {
                                                //                 browser.navigate().back();
                                                //                 browser.pause();
                                                //             });  
                                                //             });
                                                //         }
                                                //     });
                                                // });

}
});

});
});

});
                            // browser.driver.wait(function() {
                            //     return browser.driver.getCurrentUrl().then(function(url) {
                            //         console.log("URL");
                            //         console.log(url);
                            //         browser.pause();
                            //     });
                            // });

                            // var all_matches = element.all(by.css(".match_card_wrapper user-not-hidden matchcard-user"));
                            // // browser.wait(protractor.ExpectedConditions.elementToBeClickable(all_matches), 5000);
                            // console.log(all_matches);
                            // all_matches[0].click().then(function() {
                            //     browser.pause();
                            //     browser.getCurrentUrl().then(function(url) {
                            //         console.log("URL:");
                            //         console.log(url);
                            //     });
                            //     // var message = element(by.xpath(".//*[@id='profile2015']/div[1]/div/div[2]/button[1]"));
                            //     // message.click().then(function() {
                            //     //     browser.pause();
                            //     // });

                            // });

});
});
});
});
});
    // expect(element(by.xpath(".//*[@id='root']/div/div[1]/div/div/div[2]/button")).isPresent()).toBe(true);
    

});

});
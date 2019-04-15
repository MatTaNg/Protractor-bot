describe('OKCupid', function() {

jasmine.DEFAULT_TIMEOUT_INTERVAL = 43200000; //In miliseconds

    var userID = "mattang5280@gmail.com";
    var password = "Ab@2dragons";
    var message = "Hey trouble :)";

var userName_textBox = element(by.xpath(".//*[@id='logincontrol_username']"));
var password_textBox = element(by.xpath(".//*[@id='logincontrol_password']"));
var signIn = element(by.xpath(".//*[@id='logincontrol_submitbutton']"));
var sendMessage_textArea = element(by.id("send-message-textarea"));
var submitMessage = element(by.id("send-quick-message-submit"));
var clickedUser = element(by.xpath(".//*[@id='username']"));
var nextPage_ofUsers = element(by.xpath(".//*[@id='container']/a/span"));

var sentMessage_button = element(by.xpath(".//*[@id='sub-menu']/li[3]/a"));
var allUsersSentMessage = element.all(by.css(".blue-title-sm"));
var sent_msg_next_button = element(by.xpath(".//*[@id='container']/form/div[11]/div[2]/span/a"));

var users_sent_messages_to = [];

browser.waitForAngularEnabled(false);

function grabAllUserNames() {
    var promises = new Promise(function(fulfill, reject) {
        allUsersSentMessage.each(function(elem, index) {
            return elem.getText().then(function(text) {
                users_sent_messages_to.push(text);
                console.log(text);
            });
        });
        return sent_msg_next_button.isPresent().then(function(present) {
            if(present === true) {
                return sent_msg_next_button.click().then(function() {
                    return grabAllUserNames();
                });
            }
        });
    });
    return protractor.promise.all(promises);
};

function signInUser() {
    return userName_textBox.sendKeys(userID).then(function() {
        return password_textBox.sendKeys(password).then(function() {
            return signIn.click();
        });
    });
};

function sendMessageToUser(indx) {
    console.log("SEND MESSAGE TO USER");
    var lock = false;
    var numberOfProfiles_onPage;
    var all_profiles = element.all(by.css(".rc"));

    var promises = new Promise(function(fulfill, reject) { 
        return all_profiles.count().then(function(count) {
            numberOfProfiles_onPage = count;
            console.log("numberOfProfiles_onPage");
            console.log(numberOfProfiles_onPage);
        all_profiles.each(function(elem, index) {
            if(index >= indx && lock === false) {
                lock = true;
                var currentIndex = index;
                return elem.click().then(function() {
                    clickedUser.getText().then(function(text) {
                        if(users_sent_messages_to.indexOf(text) === -1 ) {
                            return sendMessage_textArea.sendKeys(message).then(function() {
                                console.log(message);
                                return submitMessage.click().then(function() {
                                    users_sent_messages_to.push(text);
                                    console.log("SUBMITTED")
                                    console.log(text);
                                    browser.navigate().back();
                                    browser.navigate().back();
                                    return sendMessageToUser(++currentIndex);
                                });
                            });
                        } else {
                            console.log("NOT SUBMITTED");
                            browser.navigate().back();
                            return sendMessageToUser(++currentIndex);
                        }
                    });
                });
            }
                if(index === numberOfProfiles_onPage - 1) {
                    console.log("INDEX");
                    console.log(index);
                    return nextPage_ofUsers.isPresent().then(function(present) {
                        console.log("PRESENT");
                        console.log(present);
                        if(present === true) {
                            console.log("NEXT PAGE");
                            nextPage_ofUsers.click().then(function() {
                                return sendMessageToUser(0);
                            });
                        }
                    });
                }
            
            });
        });
});
return protractor.promise.all(promises);
};

it('should automatically send messages', function() {
    browser.get('http://www.pof.com/').then(function() {
            //Sign in User
            signInUser().then(function() {
                sentMessage_button.click().then(function() {
                    grabAllUserNames().then(function() {
                        browser.get('http://www.pof.com/').then(function() {
                            sendMessageToUser(0).then(function() {
                            });
                        });
                    });
                });
            });
        });
});
});

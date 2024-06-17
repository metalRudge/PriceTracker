// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-06-11
// @description  try to take over the world!
// @author       You
// @match        https://www.bigblue.rs/sr/hotel/grcka/skopelos/delphi-studio?PL=30755-37-285-5031222
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.getValue
// @grant        GM_addStyle
// @grant        GM_log
// @require      https://code.jquery.com/jquery-3.6.0.min.js

// ==/UserScript==
(function() {
    'use strict';
    function overrideInputValue()
    {
        let count = 0;
        let inputs = document.getElementsByClassName('input-group-addon');
        inputs[0].click();
        var tbody = document.querySelector('.datepicker-days tbody');
        
        if(tbody)
        {
            let elements = tbody.querySelectorAll('td');
            for(var i = 0;i <elements.length;i++)
            {
                var curr = elements[i];
                let attribute = curr.getAttribute('class');
                if(attribute && attribute.includes('day paint'))
                {

                    count++;
                    if(count == 2)
                    {
                        curr.click();
                        break;
                    }
                }
            }

        }

    }
  function getPrice()
  {
       var priceStr = document.getElementById('txtPackagePrice').innerText;
       var price = parseInt(priceStr.replace(/[^0-9]/g, ''));
       return price;
  }
  function checkValue() {
        setInterval(function() {
            // Check and adjust input field value
            overrideInputValue();
        }, 2000);
      let emailSent = false;

// Set up the interval and store the interval ID
      const intervalId = setInterval(function() {
    var cena = getPrice();

    // Check if the price is less than 1338 and the email has not been sent yet
    if (cena < 1400 && !emailSent) {
        // Send the email
        sendEmail(cena);

        // Set the flag to indicate that the email has been sent
        emailSent = true;

        // Clear the interval to stop it from running again
        clearInterval(intervalId);
    }
}, 4000);
}
  function sendEmail(price)
  {
        const data = {
            to: 'stefankh69@gmail.com', // Recipient email address
            subject: 'Sending with SendGrid is Fun',
            body: 'Cena je '+price + '€'
        };

        // Make an HTTP POST request to localhost
        fetch('http://localhost:3000/send-email', { // Assuming your server is running on port 3000
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
            if (!response.ok) {
                throw new Error('Failed to send email');
            }
            if(response.ok)
            {
                console.log('Email sent successfully');
                return 0;
            }
        })
            .catch(error => {
            console.error('Error sending email:', error);
        });
    }

checkValue();
let emailSent = false;
let price = getPrice();
if(price < 1500 && !emailSent && price == price) //check for NaN values
{
    sendEmail(price);
    emailSent = true;
}
})();
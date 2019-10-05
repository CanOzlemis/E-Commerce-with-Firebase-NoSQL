# E-Commerce-with-Firebase-NoSQL-
Multi-purpose Online e-commerce project

!!THIS PROJECT WAS MADE IN TURKISH LANGUAGE!!

Programing languages used : HTML, CSS, JS
System : Firebase (noSQL)

LOGIN : 
entire login logic is inside the :
login / index.js
Each function is commented to clarify the usage.

If the user is not registered to the system, the system will automatically bring up the UI for registering and the phone number used for login in will be registered as the number of the user. The system uses Firebase phone Auth. for sending the security key and confirming the legitamacy of the phone number.


GENERAL SCRIPTS : 
Entire logic of the website is inside the 'js' folder.
-loginCheck.js : Makes sure that the user is logged in to the system and is not bypassing.
-restaurant.js : Takes all the registered restaurants and using append() it is placed into the website.
-restorantscript.js : Takes all the items of the menu from the restaurant and places it to the website. Also it builds the logic for the shopping cart system ( with button ).
-sepet.js : This is the shopping cart, it makes sure of displaying all the information (your orders) and confirmation system for sending it to the specific stores.
-market.js : Build the 'market' section & the scripts of the website(market section), pulls all of the data from the firebase data base.
-emlak.js : Builds the 'emlak' section & the script of the website (emlak section), pulls all of the data fro the firebase data base.
-........js : rest is built for specific pages.

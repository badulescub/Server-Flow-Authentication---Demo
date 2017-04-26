# Server Flow Authentication Demo
Things I wish I knew when I started. Not production-ready code.

Azure Mobile App authentication demo - Asp.Net Core client + Angular 2

-----------------------------------------------

Server Side - Azure Mobile App

Azure Mobile App Settings:
https://github.com/Microsoft/azure-docs/blob/master/articles/app-service-mobile/app-service-mobile-dotnet-backend-how-to-use-server-sdk.md#custom-auth

Server Flow Authentication can be tested
MobileAppUrl/.auth/login/<provider>
MobileAppUrl/.auth/me

Note:
Custom Authentication Controller is not a MobileAppController nor a TableController
The ApiController should:
-	not use the [MobileAppController] attribute
-	expose Login (and Register) actions

Returns:
{
        "authenticationToken": "<token>",
        "user": {
            "userId": "<userId>“
        }
}

-----------------------------------------------

Client Side - Mobile Service Client in Asp.Net Core + Angular app

.Net Core SDK
https://www.microsoft.com/net/download/core

Azure App Service Blog
https://blogs.msdn.microsoft.com/appserviceteam/

Azure Mobile Apps learning path
https://azure.microsoft.com/en-us/documentation/learning-paths/appservice-mobileapps/

Mobile Service Client documentation
https://azure.github.io/azure-mobile-apps-js-client/MobileServiceClient.html

How to Use the JavaScript client library for Azure Mobile Apps
https://docs.microsoft.com/en-us/azure/app-service-mobile/app-service-mobile-html-how-to-use-client-library

Open Source Development
https://github.com/azure


---

My Blog:
http://bogdan.bynapse.com/category/azure

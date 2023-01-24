import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const validate = require("validate.js");

// Get an instance of `PhoneNumberUtil`.
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const httpTrigger: AzureFunction = 
                  async function (context: Context, req: HttpRequest): Promise<void> {


const number = phoneUtil.parseAndKeepRawInput(req.body.mobileNumber, 'US');

if(!phoneUtil.isValidNumber(number)) {
  context.res = {
    status: 400, 
    body:  "The string supplied did not seem to be a phone number"
  };
  return;
} 

// Parse number with country code and keep raw input.

if(!phoneUtil.isValidNumberForRegion(number, 'US')){
  context.res = {
    status: 400, 
    body:  "The string supplied is invalid for region"
  };
  return;
}

    const constraints = {
        mail: {
          email: true,
          presence: true
        },
        firstName: {
            presence: true, format: {
                pattern: "[a-z0-9]+",
                flags: "i",
                message: "can only contain a-z and 0-9"
              }
        },
        lastName: {
            presence: true
        }
    };

    const validation =  await validate({mail: req.body.emailAddress,
                       firstName: req.body.firstName,
                       lastName: req.body.lastName,}
                       , constraints)
    
    if (validation){
      console.log("Validation errors", validation);
      context.res = {
        status: 400, 
        body:  validation
      };
      return;
    }
             

    if (req.body) 
    {
      context.bindings.contact = req.body;
      context.res = {
        status: 201, 
        body: req.body
      };
      return;
    }
    else {
      context.res = {
        status: 400,
        body: "Request body required."
      };
      return;
    }
    
   

};

export default httpTrigger;
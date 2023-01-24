import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const validate = require("validate.js");

// Get an instance of `PhoneNumberUtil`.
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest
): Promise<void> {


    const number = phoneUtil.parseAndKeepRawInput(req.body.mobileNumber, 'US');

    if(!phoneUtil.isValidNumberForRegion(number, 'US')){
      context.res = {
        status: 400, 
        body:  "The number "+req.body.mobileNumber+" supplied is invalid for region US"
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

    const contact = context.bindings.contactToUpdate
    // context.log(contact);
    if (!contact) {
        context.res = {
            status: 404, 
            body: "Document with id "+context.bindingData.id+" for the client not found "
        };
    }
    
       context.bindings.updateContact = req.body;
    //    context.log(context.bindings.updateContact);
       context.res = {
            status: 201, 
            body: req.body
        };
       
  
         
};

export default httpTrigger;
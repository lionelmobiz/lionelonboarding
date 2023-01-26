import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  respondWithBadRequest,
  respondWithCreated,
} from "../lib/responders/Responses";
import {
  phonenumberValidator,
  contactValidator,
} from "../lib/validator/Validator";
import { Contact } from "../models/Contact";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  var isContactValid: boolean = true;
  var errorMessage: string = "";
  const contactCheck: Contact[] = context.bindings.contactCheck;
  context.log("contactCheck:", contactCheck);
  if (contactCheck.length > 0) {
    respondWithBadRequest(context, {
      error:
        "Contact with mobile number " +
        context.bindingData.mobileNumber +
        " for the client with id " +
        context.bindingData.clientId +
        " already exists",
    });
    return;
  }

  var contact: Contact = req.body;
  contact.id = req.body.firstName + context.bindingData.mobileNumber;
  contact.mobileNumber = context.bindingData.mobileNumber+"";
  contact.clientId = context.bindingData.clientId;
 

  var phonenumberValidation = phonenumberValidator(contact.mobileNumber);
  context.log("phonenumberValidation:",phonenumberValidation)
  if (!phonenumberValidation) {
    isContactValid = false;
    errorMessage = "Inavlid phone number provided";
  }

  var contactValidation = contactValidator(contact);
  if (!contactValidation) {
    isContactValid = false;
    errorMessage = "Invalid email, firstname or lastname";
  }

  if (isContactValid) {
    context.bindings.contact = req.body;
    respondWithCreated(context, {
      type: "contact",
      id: req.body.id,
      clientId: req.body.clientId,
      attributes: {
        mobileNumber: req.body.mobileNumber,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        city: req.body.city,
        country: req.body.country,
        dateOfBirth: req.body.dateOfBirth,
      },
    });
  } else {
    respondWithBadRequest(context, errorMessage);
    return;
  }
};

export default httpTrigger;

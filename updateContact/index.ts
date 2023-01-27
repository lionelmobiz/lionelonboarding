import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  respondWithBadRequest,
  respondWithSuccess,
  respondWithNotFound,
} from "../lib/responders/Responses";
import { Contact } from "../models/Contact";
import {
  phonenumberValidator,
  contactValidator,
} from "../lib/validator/Validator";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const contactToUpdate: Contact[] = context.bindings.contactToUpdate;
  context.log("contactToUpdate", contactToUpdate);
  if (contactToUpdate.length < 1) {
    respondWithNotFound(context, {
      error:
        "Document with id " +
        context.bindingData.id +
        " for the client " +
        context.bindingData.clientId +
        " not found ",
    });
  } else {
    var contactDocument = req.body;
    var isContactValid: boolean = true;
    var errorMessage: string = "";

    var phonenumberValidation = phonenumberValidator(
      contactDocument.mobileNumber
    );
    context.log("phonenumberValidation:", phonenumberValidation);
    if (!phonenumberValidation) {
      isContactValid = false;
      errorMessage = "Inavlid phone number provided";
    }

    var contactValidation = contactValidator(contactDocument);
    if (!contactValidation) {
      isContactValid = false;
      errorMessage = "Invalid email, firstname or lastname";
    }

    if (isContactValid) {
      contactDocument.id = context.bindingData.id;
      contactDocument.clientId = context.bindingData.clientId;

      context.bindings.updateContact = contactDocument;
      context.bindings.contact = req.body;

      respondWithSuccess(context, {
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
  }
};
export default httpTrigger;

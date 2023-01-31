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
import {
  contactsRepository
} from "../repository/contactsRepository";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {

  var isContactValid: boolean = true;
  var errorMessage: string = "";

  const contactDao=new contactsRepository();
  await contactDao.init();
  const contactCheck = await contactDao.findContactByMobileNumber(
    req.body.mobileNumber,
    req.body.clientId
  );

  context.log("contactCheck: ", contactCheck.resources);
  if (contactCheck.resources.length>0) {
    errorMessage =
      "Contact with same mobile number and under same client already exists";
    respondWithBadRequest(context, errorMessage);
    return;
  }
  var contact: Contact = req.body;
  contact.id = req.body.firstName + req.body.mobileNumber;
  var phonenumberValidation = phonenumberValidator(contact.mobileNumber);
  context.log("phonenumberValidation:", phonenumberValidation);
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
    contactDao.saveContact(contact);
    respondWithCreated(context, {
      type: "contact",
      id: contact.id,
      clientId: contact.clientId,
      attributes: {
        contact: contact,
      },
    });
  } else {
    respondWithBadRequest(context, errorMessage);
    return;
  }
};

export default httpTrigger;

import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  respondWithBadRequest,
  respondWithCreated,
} from "../lib/responders/Responses";
import { Contact } from "../models/Contact";
import { contactsRepository } from "../repository/contactsRepository";
import { Validation } from "../lib/validator/Validation";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const contact: Contact = req.body;
  var errorMessage: string = "";

  const validator = new Validation();
  await validator.init();
  const contactValidation = await validator.contactValidator(contact);
  if (contactValidation.hasError) {
    respondWithBadRequest(context, contactValidation.message);
    return;
  }
  const phonenumberValidation = await validator.phonenumberValidator(
    contact.mobileNumber
  );
  if (phonenumberValidation.hasError) {
    respondWithBadRequest(context, phonenumberValidation.message);
    return;
  }

  const contactDao = new contactsRepository();
  await contactDao.init();
  const contactCheck = await contactDao.findContactByMobileNumber(
    req.body.mobileNumber,
    req.body.clientId
  );

  if (contactCheck.resources.length > 0) {
    errorMessage =
      "Contact with same mobile number and under same client already exists";
    respondWithBadRequest(context, errorMessage);
    return;
  }
  contact.id = req.body.firstName + req.body.mobileNumber;

  await contactDao.saveContact(contact);
  const attributes=contact;
  respondWithCreated(context, {
    type: "contact",
    id: contact.id,
    clientId: contact.clientId,
    attributes,
  });
};

export default httpTrigger;

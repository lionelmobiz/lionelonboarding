import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  respondWithBadRequest,
  respondWithCreated,
} from "../lib/responders/Responses";
import { Contact } from "../models/Contact";
import { contactsRepository } from "../repository/contactsRepository";
import { Validation } from "../lib/validator/Validation";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
//TODO: format phone number and date of birth !!!!!
//TODO: change id generation
const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("Create Contact Request Body: ", req.body);
  const contact: Contact = req.body;
  var errorMessage: string = "";
  const validator = new Validation();
  await validator.init();

  //Format phone number
  contact.mobileNumber = await validator.formatPhoneNumberE164(
    contact.mobileNumber
  );

  //validate phone number
  const phonenumberValidation = await validator.phonenumberValidator(
    contact.mobileNumber
  );
  if (phonenumberValidation.hasError) {
    context.log("phonenumberValidation: ", phonenumberValidation);
    respondWithBadRequest(context, phonenumberValidation.message);
    return;
  }

  //contact validation
  const contactValidation = await validator.contactValidator(contact);
  if (contactValidation.hasError) {
    context.log("contactValidation: ", contactValidation);
    respondWithBadRequest(context, contactValidation.message);
    return;
  }

  try {
    let formattedDate = moment(contact.dateOfBirth).format(
      "DD-MMM-YYYY"
    );
    contact.dateOfBirth = formattedDate;
  } catch(error) {
    respondWithBadRequest(
      context,
      "Invalid date Provided"
    );
  }

  const contactDao = new contactsRepository();
  await contactDao.init();
  const contactCheck = await contactDao.findContactByMobileNumber(
    req.body.mobileNumber,
    req.body.clientId
  );
  context.log("contactCheck: ", contactCheck);

  if (contactCheck.resources.length > 0) {
    errorMessage =
      "Contact with same mobile number and under same client already exists";
    respondWithBadRequest(
      context,
      "Contact with same mobile number and under same client already exists"
    );
    return;
  }
  contact.id = uuidv4();
  await contactDao.saveContact(contact);
  const attributes = contact;
  respondWithCreated(context, {
    type: "contact",
    id: contact.id,
    clientId: contact.clientId,
    attributes: contact,
  });
};

export default httpTrigger;

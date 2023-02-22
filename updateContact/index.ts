import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  respondWithBadRequest,
  respondWithSuccess,
  respondWithNotFound,
} from "../lib/responders/Responses";
import { Validation } from "../lib/validator/Validation";
import { Contact } from "../models/Contact";
import _ from "lodash";
import { contactsRepository } from "../repository/contactsRepository";
import moment from "moment";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const contact: Contact = req.body;
  var errorMessage: string = "";

  try {
    let formattedDate = moment(contact.dateOfBirth).format("DD-MMM-YYYY");
    contact.dateOfBirth = formattedDate;
  } catch (error) {
    respondWithBadRequest(context, "Invalid date Provided");
  }
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

  // TODO
  const clientId = context.bindingData.clientId;
  const id = context.bindingData.id;
  const contactDao = new contactsRepository();
  await contactDao.init();
  const contactCheck = await contactDao.findContactByMobileNumber(
    req.body.mobileNumber,
    clientId
  );

  const contactList = contactCheck.resources.filter(
    (contactCheckObj) => contactCheckObj.id != id
  );
  context.log("contactList: ", contactList);
  if (contactList.length > 0) {
    respondWithBadRequest(
      context,
      "Contact with same mobile number and under same client already exists"
    );
    return;
  }

  const contactSearch = await contactDao.findContactById(
    context.bindingData.id,
    context.bindingData.clientId
  );
  if (!contactSearch) {
    respondWithNotFound(
      context,
      "Document with id " +
        context.bindingData.id +
        " for Client with id " +
        context.bindingData.clientId +
        " not found"
    );
  } else {
    contact.id = context.bindingData.id;
    contact.clientId = context.bindingData.clientId;
    await contactDao.update(contact.id, contact, contact.clientId);
    respondWithSuccess(context, {
      type: "contact",
      id: contact.id,
      clientId: context.bindingData.clientId,
      attributes: contact,
    });
  }
};
export default httpTrigger;

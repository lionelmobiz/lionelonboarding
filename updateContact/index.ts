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
      attributes: {
        data: req.body,
      },
    });
  }
};
export default httpTrigger;

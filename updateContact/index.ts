import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  respondWithBadRequest,
  respondWithSuccess,
  respondWithNotFound,
} from "../lib/responders/Responses";
import {
  phonenumberValidator,
  contactValidator,
} from "../lib/validator/Validator";
import { Contact } from "../models/Contact";
import _ from "lodash";
import { contactsRepository } from "../repository/contactsRepository";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const contactDao = new contactsRepository();
  await contactDao.init();

  const contact = await contactDao.findContactById(
    context.bindingData.id,
    context.bindingData.clientId
  );
  if (!contact) {
    respondWithNotFound(
      context,
      "Document with id " + context.bindingData.id + 
      " for Client with id " + context.bindingData.clientId + " not found"
    );
  } else {
    req.body.id=context.bindingData.id;
    req.body.clientId=context.bindingData.clientId;
   await contactDao.update(
      context.bindingData.id,
      req.body,
      context.bindingData.clientId
    );
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

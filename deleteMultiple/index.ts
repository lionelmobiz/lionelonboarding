import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { contactsRepository } from "../repository/contactsRepository";
import {
  respondWithSuccessNoContent,
  respondWithNotFound,
} from "../lib/responders/Responses";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("contacts To Delete: ", req.body.contactIds);
  const clientId = context.bindingData.clientId;
  const contactDao = new contactsRepository();
  await contactDao.init();
  const contactsToDelete: Array<any> = req.body.contactIds;
  context.log("contacts To Delete: ",contactsToDelete)
  context.log("contactsToDelete: ",contactsToDelete);
  for (let i = 0; i < contactsToDelete.length; i++) {
    await contactDao.deleteContact(contactsToDelete[i], clientId);
  }
  respondWithSuccessNoContent(context);
};

export default httpTrigger;

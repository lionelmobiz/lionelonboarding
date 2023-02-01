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
  const contactId = context.bindingData.id;
  const clientId = context.bindingData.clientId;
  const contactDao = new contactsRepository();
  await contactDao.init();

  const contactSearch = await contactDao.findContactById(contactId, clientId);
  if (!contactSearch) {
    respondWithNotFound(
      context,
      "Document with id " +
        contactId +
        " for Client with id " +
        clientId +
        " not found"
    );
  } else {
    const contactDelete =await contactDao.deleteContact(contactId, clientId);
    respondWithSuccessNoContent(context);
  }
};
export default httpTrigger;

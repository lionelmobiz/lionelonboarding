import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { contactsRepository } from "../repository/contactsRepository";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  
  const contactDao = new contactsRepository();
  await contactDao.init();

  const contactId = context.bindingData.id;
  const clientId = context.bindingData.clientId;
  contactDao.deleteContact(contactId, clientId);
};
export default httpTrigger;

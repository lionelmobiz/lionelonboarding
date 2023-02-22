import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { respondWithSuccess } from "../lib/responders/Responses";
import _ from "lodash";
import { contactsRepository } from "../repository/contactsRepository";
import { Contact } from "../models/Contact";
const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const contactDao = new contactsRepository();
  await contactDao.init();

  var documents = await contactDao.findAllByClientId(
    context.bindingData.clientId
  );
  let contactsSearch: Array<Contact> = documents.resources;
  const attributes = _.map(contactsSearch, (contact) =>
    _.pick(contact, [
      "id",
      "mobileNumber",
      "firstName",
      "lastName",
      "emailAddress",
      "city",
      "country",
      "dateOfBirth",
      "clientId",
    ])
  );
  context.log("contactResponse: ", attributes);
  respondWithSuccess(context, {
    type: "contact",
    clientId: context.bindingData.clientId,
    attributes,
  });
};

export default httpTrigger;

import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { respondWithSuccess } from "../lib/responders/Responses";
import { contactsRepository } from "../repository/contactsRepository";
import { Contact } from "../models/Contact";
import _ from "lodash";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const contactDao = new contactsRepository();
  await contactDao.init();

  const contact  = await contactDao.findContactById(
    context.bindingData.id,
    context.bindingData.clientId
  );
  if (!contact) {
    context.res = {
      status: 404,
      body: "Document with id " + context.bindingData.id + " not found",
    };
  } else {
   const contactResponse =_.pick(contact, [
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
    respondWithSuccess(context, {
      type: "contact",
      id: contact.id,
      clientId: context.bindingData.clientId,
      attributes: {
        data:contactResponse
      },
    });
  }
};
export default httpTrigger;

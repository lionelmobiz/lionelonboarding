import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { respondWithSuccess } from "../lib/responders/Responses";
const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const contact = context.bindings.contact;
  if (!contact) {
    context.res = {
      status: 404,
      body: "Document with id " + context.bindingData.id + " not found",
    };
  } else {
    respondWithSuccess(context, {
      type: "contact",
      id: contact.id,
      clientId: context.bindingData.clientId,
      attributes: {
        mobileNumber: contact.mobileNumber,
        firstName: contact.firstName,
        lastName: contact.lastName,
        emailAddress: contact.emailAddress,
        city: contact.city,
        country: contact.country,
        dateOfBirth: contact.dateOfBirth,
      },
    });
  }
};

export default httpTrigger;

import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { respondWithSuccess } from "../lib/responders/Responses";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  var documents = context.bindings.contactsList;
  var contacts: string[]=[];
  for (var i = 0; i < documents.length; i++) {
    var document = documents[i];
    contacts.push(
      JSON.stringify({
        id: document.id,
        mobileNumber: document.mobileNumber,
        firstName: document.firstName,
        lastName: document.lastName,
        emailAddress: document.emailAddress,
        city: document.city,
        country: document.country,
        dateOfBirth: document.dateOfBirth,
      })
    );
  }
  respondWithSuccess(context, {
    type: "contact",
    clientId: context.bindingData.clientId,
    attributes: {
      data: contacts,
    },
  });
  context.res = {
    //TODO: map out unecessary data
    status: 200,
    body: context.bindings.contactsList,
  };
};

export default httpTrigger;

import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest
): Promise<void> {

    const contact = context.bindings.contactToUpdate
    // context.log(contact);
    if (!contact) {
        context.res = {
            status: 404, 
            body: "Document with id "+context.bindingData.id+" for the client not found "
        };
    }
    
       context.bindings.updateContact = req.body;
    //    context.log(context.bindings.updateContact);
       context.res = {
            status: 201, 
            body: req.body
        };
       
  
         
};

export default httpTrigger;
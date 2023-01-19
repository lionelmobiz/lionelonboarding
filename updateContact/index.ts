import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest
): Promise<void> {

    const contact = context.bindings.contactToUpdate
    if (!contact) {
        context.res = {
            status: 404, 
            body: "Document with id "+context.bindingData.id+" not found"
        };
    }
    else
    {
        if (req.body) 
        {
            req.body.id = context.bindingData.id;
            context.bindings.contact = req.body;
            context.log(context.bindings.contact);
            context.res = {
                status: 200, /* Defaults to 200 */
                body: req.body
            };
        }
        else {
            context.res = {
                status: 400,
                body: "Request body required."
            };
    }  
        
    }
  
         
};

export default httpTrigger;
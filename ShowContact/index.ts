import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest
): Promise<void> {
 
    const contact = context.bindings.contact
    if (!contact) {
        context.res = {
            status: 404, 
            body: "Document with id "+context.bindingData.id+" not found"
        };
    }
    else
    {
        context.res = {
            status: 200,
            body: context.bindings.contact
        };
    }
    

};

export default httpTrigger;
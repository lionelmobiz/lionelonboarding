import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const id = (req.query.id || (req.body && req.body.id));
    context.log('JavaScript queue trigger function processed work item');
    const contact = context.bindings.contact
    if (contact == undefined || contact.length == 0) {
        context.res = {
            status: 404, 
            body: "Document with id "+context.bindingData.id+" not found"
        };
    }
    else
    {
        context.log("Found contact item, Description=" + contact);
        context.res = {
            status: 200,
            body: context.bindings.contact
        };
    }
    

};

export default httpTrigger;
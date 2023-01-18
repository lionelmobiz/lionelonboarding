import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    
    if (req.body) 
    {
        context.bindings.contact = req.body;
        context.res = {
            // 200 is not the correct response code for a create
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
  


};

export default httpTrigger;

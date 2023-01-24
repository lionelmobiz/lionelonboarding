import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    if (req.body) 
    {
        context.bindings.contact = req.body;
        context.res = {
            status: 201, 
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
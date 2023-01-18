import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    
    // result must be tenant specific
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: context.bindings.contactsList
    };
 
};

export default httpTrigger;

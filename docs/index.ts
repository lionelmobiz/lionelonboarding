import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { SwaggerTemplate } from './swaggerTemplate';
import data from '../oaSpecification.json';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const swaggerData = JSON.parse(JSON.stringify(data));
  const jsonObject = {
    ...swaggerData,
    ...{
      servers: [{ url: `/account` }]
    }
  };

  context.res = {
    status: 200,
    headers: {
      'Content-Type': 'text/html'
    },
    body: SwaggerTemplate.getSwaggerUi(jsonObject)
  };
};

export default httpTrigger;

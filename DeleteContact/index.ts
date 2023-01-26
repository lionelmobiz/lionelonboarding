import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";

const endpoint = "https://lionel-onboarding.documents.azure.com:443/";
const key =
  "9sjqsze0dBFWOwxF0eZ2sfaJJbULXDkXsTJRvDL17mqKP4YiMXtMNI3JDszCWfBNlwiXaoSElnzHACDbOBFQJg==";
const client = new CosmosClient({ endpoint, key });

async function main() {
  // The rest of the README samples are designed to be pasted into this function body
}

main().catch((error) => {
  console.error(error);
});

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { database } = await client.databases.createIfNotExists({
    id: "onboarding",
  });
  console.log(database.id);
  const { container } = await database.containers.createIfNotExists({
    id: "contacts",
  });

  const contactId = context.bindingData.id;
  const clientId = context.bindingData.clientId;

  await container.item(contactId, clientId).delete();
};

export default httpTrigger;

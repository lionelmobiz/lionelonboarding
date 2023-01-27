const { CosmosClient } = require("@azure/cosmos");

const endpoint = "https://lionel-onboarding.documents.azure.com:443/";
const key =
  "9sjqsze0dBFWOwxF0eZ2sfaJJbULXDkXsTJRvDL17mqKP4YiMXtMNI3JDszCWfBNlwiXaoSElnzHACDbOBFQJg==;";
const client = new CosmosClient({ endpoint, key });

export async function main() {
  // The rest of the README samples are designed to be pasted into this function body
  const { database } = await client.databases.createIfNotExists({
    id: "onboarding",
  });
  console.log(database.id);
  const { container } = await database.containers.createIfNotExists({
    id: "contacts",
  });
  console.log(container.id);
  await container.item("1").read();
  console.log(container.item("1").read());
}

main().catch((error) => {
  console.error(error);
});

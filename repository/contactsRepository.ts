import {
  Container,
  ContainerResponse,
  CosmosClient,
  Database,
  OperationInput,
  OperationResponse,
  SqlQuerySpec,
  SqlParameter,
  PatchOperation,
} from "@azure/cosmos";
import { Contact } from "../models/Contact";

export class contactsRepository {
  client: CosmosClient;
  database: Database;
  collection: Container;
  databaseId: string;
  containerId: string;

  constructor() {
    this.client = this.createCosmosClient();
    this.database = null;
    this.collection = null;

    this.databaseId = "onboarding";
    this.containerId = "contacts";
  }

  createCosmosClient() {
    const endpoint: string =
      "https://lionel-onboarding.documents.azure.com:443/";
    const key: string =
      "9sjqsze0dBFWOwxF0eZ2sfaJJbULXDkXsTJRvDL17mqKP4YiMXtMNI3JDszCWfBNlwiXaoSElnzHACDbOBFQJg==;";
    return new CosmosClient({ endpoint, key });
  }

  async init(): Promise<void> {
    const dbResponse = await this.client.databases.createIfNotExists({
      id: this.databaseId,
    });
    this.database = dbResponse.database;

    const coResponse = await this.database.containers.createIfNotExists({
      id: this.containerId,
    });
    this.collection = coResponse.container;
  }

  async findContactById(
    id: string,
    partitionKeyValue?: string
  ): Promise<Contact> {
    const { resource } = await this.collection
      .item(id, partitionKeyValue)
      .read();
    return resource;
  }

  async update(
    id: string,
    value: Contact,
    partitionKeyValue?: string
  ): Promise<void> {
    await this.collection.item(id, partitionKeyValue).replace(value);
  }

  async findAllByClientId(clientId: string) {
    return await this.collection.items
      .query({
        query: "SELECT * from c WHERE  c.clientId = @clientId",
        parameters: [{ name: "@clientId", value: clientId }],
      })
      .fetchAll();
  }

  async findContactByMobileNumber(mobileNumber: string, clientId: string) {
    return await this.collection.items
      .query({
        query:
          "SELECT * from c WHERE c.mobileNumber = @mobileNumber and c.clientId = @clientId",
        parameters: [
          { name: "@mobileNumber", value: mobileNumber },
          { name: "@clientId", value: clientId },
        ],
      })
      .fetchAll();
  }

  async deleteContact(contactId: string, clientId: string) {
    return await this.collection.item(contactId, clientId).delete();
  }

  async saveContact(contact: Contact) {
    await this.collection.items.create(contact);
  }
}

import SibApiV3Sdk from "sib-api-v3-typescript";

export const createContact = () => {
  let apiInstance = new SibApiV3Sdk.ContactsApi()

  let apiKey = apiInstance.authentications['apiKey'];

  apiKey.apiKey = 'YOUR API KEY';

  let createContact = new SibApiV3Sdk.CreateContact();

  createContact.email = 'exampletest@example.com';
  createContact.listIds = [2];

  apiInstance.createContact(createContact).then(function(data) {
    console.log('API called successfully. Returned data: ' + JSON.stringify(data));
  }, function(error) {
    console.error(error);
  });
}

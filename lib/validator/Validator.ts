import { validate } from "validate.js";
import { Contact } from "../../models/Contact";

const phoneUtil =
  require("google-libphonenumber").PhoneNumberUtil.getInstance();

const constraints = {
  mail: {
    email: true,
    presence: true,
  },
  firstName: {
    presence: true,
    format: {
      pattern: "[a-z0-9]+",
      flags: "i",
      message: "can only contain a-z and 0-9",
    },
  },
  lastName: {
    presence: true,
    format: {
      pattern: "[a-z0-9]+",
      flags: "i",
      message: "can only contain a-z and 0-9",
    },
  },
};

export function phonenumberValidator(phonenumber: string) {
  try {
    const number = phoneUtil.parseAndKeepRawInput(phonenumber + "", "US");
    if (
      phoneUtil.isValidNumber(number) &&
      phoneUtil.isValidNumberForRegion(number, "US")
    ) {
      return true;
    } else {
      return false;
    }
  } catch (error) {return false;}
}

export function contactValidator(contact: Contact) {
  const validation = validate(
    {
      mail: contact.emailAddress,
      firstName: contact.firstName,
      lastName: contact.lastName,
    },
    constraints
  );
  if (validation != null) {
    return false;
  } else {
    return true;
  }
}

function isEmpty(obj: Record<string, any>): boolean {
  return Object.keys(obj).length === 0;
}

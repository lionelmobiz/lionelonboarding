import { Response } from "../../models/Response";
import { validate } from "validate.js";
import { Contact } from "../../models/Contact";

export class Validation {
  response: Response;
  contact: Contact;
  phoneUtil: any;
  PNF: any;
  validatorConstraints: any;
  constructor() {
    this.phoneUtil = null;
    this.validatorConstraints = null;
    this.response = this.response;
    this.PNF= null;
  }

  async init(): Promise<void> {
    const googleLibPhoneNumber =
      require("google-libphonenumber").PhoneNumberUtil.getInstance();
    this.phoneUtil = googleLibPhoneNumber;
     this.PNF = require('google-libphonenumber').PhoneNumberFormat
    const constraints = await this.initConstraints();
    this.validatorConstraints = constraints;
  }

  async formatPhoneNumberE164(phonenumber:string): Promise<string>{
    const numberRawInput = this.phoneUtil.parseAndKeepRawInput(
      phonenumber + "",
      "US"
    )
    console.log(this.phoneUtil.format(numberRawInput, this.PNF.E164));
    return this.phoneUtil.format(numberRawInput, this.PNF.E164);
  }

  async initConstraints(): Promise<any> {
    return {
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
  }

  async phonenumberValidator(phonenumber: string): Promise<Response> {
    try {
      const number = this.phoneUtil.parseAndKeepRawInput(
        phonenumber + "",
        "US"
      );
      if (
        this.phoneUtil.isValidNumber(number) &&
        this.phoneUtil.isValidNumberForRegion(number, "US")
      ) {
        this.response = { status: "ok", message: "ok", hasError: false };
        return this.response;
      } else {
        this.response = {
          status: "failed",
          message: "error: invalid number",
          hasError: true,
        };
        return this.response;
      }
    } catch (error) {
      this.response = {
        status: "failed",
        message: "Invalid number " + error,
        hasError: true,
      };
      return this.response;
    }
  }

  async contactValidator(contact: Contact): Promise<Response> {
    const validation = validate(
      {
        mail: contact.emailAddress,
        firstName: contact.firstName,
        lastName: contact.lastName,
      },
      this.validatorConstraints
    );
    if (validation != null) {
      this.response = { status: "failed", message: validation, hasError: true };
      return this.response;
    } else {
      this.response = { status: "ok", message: "ok", hasError: false };
      return this.response;
    }
  }

  async isEmpty(obj: Record<string, any>): Promise<boolean> {
    return Object.keys(obj).length === 0;
  }
}

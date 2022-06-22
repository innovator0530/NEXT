import { MongoIdStr } from "../IRelease";

export interface User {
  /**
   * @format email
   */
  email: string;
  createdAt: Date;
  type: "USER" | "ADMIN";
  status: "APPROVAL_NEEDED" | "APPROVED" | "BANNED";
  emailStatus: "VERIFICATION_NEEDED" | "OK" | "FORCE_PASSWORD_RESET";
  completionStatus: "INCOMPLETE" | "COMPLETE";
  firstName: string;
  lastName: string;
  passwordHash: string;
  instagram?: string;
  paypalEmail?: string;
  twintPhoneNumber?: string;
  preferredPayment?: "PAYPAL" | "TWINT";
  emailVerificationCode?: string;
  emailVerified: Date;
  image?: string;
  name?: string;
  adminContextUser?: MongoIdStr;
}

// types/next-auth.d.ts or next-auth.d.ts at the root of your project
// import { User as AdapterUser } from "next-auth/adapters"; // If you're using Prisma or another adapter

// declare module "next-auth" {
//   interface User extends AdapterUser {
//     id: string; // Add the `id` property here
//     active: boolean; // Add any other custom fields if necessary
//   }

//   interface Session {
//     user: {
//       id: string;
//       email: string;
//       name?: string | null;
//       image?: string | null;
//       active: boolean; // Make sure to add the `active` field to the session user
//     };
//   }
// }

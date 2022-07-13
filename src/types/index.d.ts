export {}

declare global {
  namespace Express {
    interface Request {
      slug?: string
    }
  }
}

// declare namespace Express {
//   export interface Response {
//     pageName?: string
//   }
// }

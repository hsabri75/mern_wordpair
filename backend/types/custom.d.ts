declare namespace Express {
    interface Request {
        user?: JwtPayload ;
    }
  }
/*  
  interface JwtPayload {
    _id: string
  }
  */
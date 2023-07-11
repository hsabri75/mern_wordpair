export type WordPair={
    first: string;
    second: string;
    _id: string;
}

export type BagWords={
    bag_id: string
    bagname: string,
    words: WordPair[]
  }

export type UserType = {
    email: string;
    password:string;

  }

export type BagList= BagWords[];


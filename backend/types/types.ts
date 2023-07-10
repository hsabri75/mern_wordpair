export type WordPair={
    first: string;
    second: string;
    _id: string;
}

export type BagWords={
    bag_id: string
    bag: string,
    words: WordPair[]
  }

export type UserType = {
    email: string;
    password:string;

  }

export type BagList= BagWords[];


export interface Manga {
  id: string;
  Title: string;
  production: {
    Title: string;
  };
  Publisher: string;
  Price: number;
  Cover: {
    url: string;
  };
  Rating: number;
  Description: string;
  Author: string;
  NumberOfPages: number;
  SerieSize: string;
  AgeLimit: number;
  documentId: string;
  Genres: Genre[];
}

export interface Genre {
  id: string;
  Title: string;
  Cover: {
    url: string;
  };
}

export interface Feedback {
  Text: string;
  Name: string;
  CustomerStatus: string;
  Photo: {
    url: string;
  };
  Mark: number;
}

export interface Production {
  id: string;
  Title: string;
}

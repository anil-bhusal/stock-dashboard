export interface Stock {
    id: number;
    Symbol: string;
    Name: string;
    Sector: string;
    Industry: string;
    MarketCapitalization: string;
    EPS: string;
    PERatio: string;
    DividendYield: string | null;
    OfficialSite: string;

    favorites?: Favorite[];
  }
  
  export interface Favorite {
    id?: number;
    stockId: number;
    isFavorite: boolean;
}
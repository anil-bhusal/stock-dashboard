import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateStockDto {
  @IsString()
  Symbol: string;

  @IsString()
  AssetType: string;

  @IsString()
  Name: string;

  @IsString()
  Description: string;

  @IsString()
  CIK: string;

  @IsString()
  Exchange: string;

  @IsString()
  Currency: string;

  @IsString()
  Country: string;

  @IsString()
  Sector: string;

  @IsString()
  Industry: string;

  @IsString()
  Address: string;

  @IsOptional()
  @IsString()
  OfficialSite?: string;

  @IsString()
  FiscalYearEnd: string;

  @IsString()
  LatestQuarter: string;

  @IsString()
  MarketCapitalization: string;

  @IsString()
  EBITDA: string;

  @IsString()
  PERatio: string;

  @IsString()
  PEGRatio: string;

  @IsString()
  BookValue: string;

  @IsString()
  DividendPerShare: string;

  @IsString()
  DividendYield: string;

  @IsString()
  EPS: string;

  @IsString()
  RevenuePerShareTTM: string;

  @IsString()
  ProfitMargin: string;

  @IsString()
  OperatingMarginTTM: string;

  @IsString()
  ReturnOnAssetsTTM: string;

  @IsString()
  ReturnOnEquityTTM: string;

  @IsString()
  RevenueTTM: string;

  @IsString()
  GrossProfitTTM: string;

  @IsString()
  DilutedEPSTTM: string;

  @IsString()
  QuarterlyEarningsGrowthYOY: string;

  @IsString()
  QuarterlyRevenueGrowthYOY: string;

  @IsString()
  AnalystTargetPrice: string;

  @IsString()
  AnalystRatingStrongBuy: string;

  @IsString()
  AnalystRatingBuy: string;

  @IsString()
  AnalystRatingHold: string;

  @IsString()
  AnalystRatingSell: string;

  @IsString()
  AnalystRatingStrongSell: string;

  @IsString()
  TrailingPE: string;

  @IsString()
  ForwardPE: string;

  @IsString()
  PriceToSalesRatioTTM: string;

  @IsString()
  PriceToBookRatio: string;

  @IsString()
  EVToRevenue: string;

  @IsString()
  EVToEBITDA: string;

  @IsString()
  Beta: string;

  @IsString()
  ['52WeekHigh']: string;

  @IsString()
  ['52WeekLow']: string;

  @IsString()
  ['50DayMovingAverage']: string;

  @IsString()
  ['200DayMovingAverage']: string;

  @IsString()
  SharesOutstanding: string;

  @IsString()
  DividendDate: string;

  @IsString()
  ExDividendDate: string;

  @IsBoolean()
  isFavorite: boolean;
}

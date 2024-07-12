export interface EventsResponse {
  _embedded: Embedded2;
  _links: Links3;
  page: Page;
}

interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

interface Links3 {
  first: Self;
  self: Self;
  next: Self;
  last: Self;
}

interface Embedded2 {
  events: Event[];
}

export interface Event {
  name: string;
  id: string;
  test: boolean;
  url?: string;
  locale: string;
  images: Image[];
  sales?: Sales;
  dates: Dates;
  classifications?: Classification[];
  promoter?: Promoter;
  promoters?: Promoter[];
  info?: string;
  pleaseNote?: string;
  priceRanges?: PriceRange[];
  seatmap?: Seatmap;
  accessibility?: Accessibility;
  ageRestrictions?: AgeRestrictions;
  ticketing?: Ticketing;
  _links: Links;
  _embedded?: Embedded;
  description?: string;
  place?: Place;
}

interface Place {
  city: City2;
  country: Country;
  address: Address2;
  location: Location;
  area: Area;
  state: State;
  id: string;
}

interface Area {}

interface Address2 {
  line1: string;
}

interface City2 {
  name: string;
}

interface Embedded {
  venues: Venue[];
  attractions?: Attraction[];
}

interface Attraction {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  images: Image[];
  classifications: Classification[];
  upcomingEvents: UpcomingEvents2;
  _links: Links2;
}

interface UpcomingEvents2 {
  ticketmaster: number;
  _total: number;
  _filtered: number;
}

interface Venue {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url?: string;
  locale: string;
  images?: Image[];
  postalCode?: string;
  timezone: string;
  city?: City;
  state?: State;
  country: Country;
  address: Address;
  location?: Location;
  markets?: Segment[];
  dmas?: Dma[];
  boxOfficeInfo?: BoxOfficeInfo;
  parkingDetail?: string;
  accessibleSeatingDetail?: string;
  generalInfo?: GeneralInfo;
  upcomingEvents: UpcomingEvents;
  _links: Links2;
  ada?: Ada;
}

interface Ada {
  adaPhones: string;
  adaCustomCopy: string;
  adaHours: string;
}

interface Links2 {
  self: Self;
}

interface UpcomingEvents {
  ticketmaster?: number;
  _total: number;
  _filtered: number;
  'sportxr-uk_glosccc'?: number;
  archtics?: number;
  'sportxr-uk_bwfc'?: number;
  'sportxr-uk_wrexhamafc'?: number;
  'sportxr-uk_huddersfieldgiants'?: number;
  'sportxr-uk_motherwellfc'?: number;
  'sportxr-uk_sussexcricket'?: number;
  'sportxr-uk_tmsport'?: number;
  'sportxr-uk_bradfordcityafc'?: number;
  'sportxr-uk_bcfc'?: number;
  'sportxr-uk_waterfordfc'?: number;
}

interface GeneralInfo {
  generalRule: string;
  childRule?: string;
}

interface BoxOfficeInfo {
  phoneNumberDetail?: string;
  openHoursDetail?: string;
  acceptedPaymentDetail?: string;
  willCallDetail: string;
}

interface Dma {
  id: number;
}

interface Location {
  longitude: string;
  latitude: string;
}

interface Address {
  line1?: string;
  line2?: string;
}

interface Country {
  name: string;
  countryCode: string;
}

interface State {
  name: string;
  stateCode: string;
}

interface City {
  name?: string;
}

interface Links {
  self: Self;
  attractions?: Self[];
  venues?: Self[];
}

interface Self {
  href: string;
}

interface Ticketing {
  safeTix: SafeTix;
  allInclusivePricing?: AllInclusivePricing;
  id: string;
}

interface AllInclusivePricing {
  enabled: boolean;
}

interface SafeTix {
  enabled: boolean;
  inAppOnlyEnabled?: boolean;
}

interface AgeRestrictions {
  legalAgeEnforced: boolean;
  id: string;
}

interface Accessibility {
  ticketLimit: number;
  id: string;
}

interface Seatmap {
  staticUrl: string;
  id: string;
}

interface PriceRange {
  type?: string;
  currency: string;
  min?: number;
  max?: number;
}

interface Promoter {
  id: string;
  name: string;
  description: string;
}

interface Classification {
  primary: boolean;
  segment: Segment;
  genre: Segment;
  subGenre: Segment;
  type: Segment;
  subType: Segment;
  family: boolean;
}

interface Segment {
  id: string;
  name: string;
}

interface Dates {
  start: Start;
  end: End;
  timezone: string;
  status: Status;
  spanMultipleDays: boolean;
  access?: Access;
}

interface Access {
  startDateTime: string;
  startApproximate: boolean;
  endDateTime: string;
  endApproximate: boolean;
}

interface Status {
  code: string;
}

interface End {
  localDate?: string;
  localTime: string;
  dateTime: string;
  approximate: boolean;
  noSpecificTime: boolean;
}

interface Start {
  localDate: string;
  localTime: string;
  dateTime: string;
  dateTBD: boolean;
  dateTBA: boolean;
  timeTBA: boolean;
  noSpecificTime: boolean;
}

interface Sales {
  public: Public;
  presales?: Presale[];
}

interface Presale {
  startDateTime: string;
  endDateTime: string;
  name: string;
}

interface Public {
  startDateTime: string;
  startTBD: boolean;
  startTBA: boolean;
  endDateTime: string;
}

interface Image {
  ratio: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}

export interface FormFilterParams {
  location?: string;
  startDate?: Date;
  endDate?: Date;
  sortBy?: 'date' | 'name';
  direction?: 'asc' | 'desc';
}

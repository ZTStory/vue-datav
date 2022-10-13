interface HistoryDatas1 {
    hotRouteList: RouteItem[];
    shiftList: CountDateItem[];
    peopleList: CountDateItem[];
    priceList: CountRangeItem[];
    ageList: CountRangeItem[];
    sexList: SexItem[];
    flowDirectionList: FlowDirectionItem[];
}

interface RouteItem {
    sort: string;
    routeName: string;
    count: string;
}

interface CountDateItem {
    timestamp: number;
    dateFormat: string;
    count: string;
}

interface CountRangeItem {
    range: { Minimum: string; Maximum: string };
    rangeFormat: string;
    count: string;
}

interface SexItem {
    sex: string;
    count: string;
}

interface RealTimeDatas1 {
    accumulateTicketCount: string;
    ticketTypeList: TicketTypeItem[];
    ticketPriceList: TicketPriceItem[];
    saleTicketList: CountDateItem[];
    checkTicketList: CountDateItem[];
    flowDirectionList: FlowDirectionItem[];
}

interface TicketTypeItem {
    type: string;
    count: string;
    price: string;
}

interface TicketPriceItem {
    type: string;
    price: string;
}

interface FlowDirectionItem {
    target: string;
    count: string;
}

export type HistoryDatas = Partial<HistoryDatas1>;
export type RealTimeDatas = Partial<RealTimeDatas1>;
export type { RouteItem, CountDateItem, CountRangeItem, TicketPriceItem, TicketTypeItem, FlowDirectionItem, SexItem };

import { Injectable } from '@angular/core';

export type OrderDirection = "asc" | "dsc";

@Injectable()
export class QueryBuilderService {
    private _baseUrl: string;
    private _querySegments: Array<string> = new Array<string>();

    constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    public orderBy(props: Array<{ propName: string, orderDirection?: OrderDirection }>): QueryBuilderService {
        if (props && props.length > 0) {
            let querySegment: string = "$orderby";
            let orderbySegment = props.map(
                p => p.orderDirection ? p.propName.concat(" ", p.orderDirection) : p.propName)
                .join(",");
            this._querySegments.push(orderbySegment);
        }
        return this;
    }

    private _constructQueryString(): string {
        return this._baseUrl.concat("?", this._querySegments.join("&"));
    }
}
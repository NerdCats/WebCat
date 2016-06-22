import { Injectable } from '@angular/core';

export type OrderDirection = "asc" | "desc";

@Injectable()
export class QueryBuilderService {
    private _querySegments: Array<string> = new Array<string>();

    constructor() {
    }

    public orderBy(props: Array<{ propName: string, orderDirection?: OrderDirection }>): QueryBuilderService {
        if (props && props.length > 0) {
            let querySegment: string = "$orderby";
            let orderbySegment = props.map(
                p => p.orderDirection ? p.propName.concat(" ", p.orderDirection) : p.propName.concat(" ", "asc"))
                .join(",");
            this._querySegments.push(querySegment.concat("=" , orderbySegment));
        }
        return this;
    }

    public ToQueryString(): string {
        return "?".concat(this._querySegments.join("&"));
    }
}
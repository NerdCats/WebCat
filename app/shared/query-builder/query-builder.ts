import { Injectable } from '@angular/core';

export type OrderDirection = "asc" | "desc";

@Injectable()
export class QueryBuilder {
    private _querySegments: Array<string> = new Array<string>();

    constructor() {
    }

    public orderBy(props: Array<{ propName: string, orderDirection?: OrderDirection }>): QueryBuilder {
        if (props && props.length > 0) {
            let querySegment: string = "$orderby";
            let orderbySegment = props.map(
                p => p.orderDirection ? p.propName.concat(" ", p.orderDirection) : p.propName.concat(" ", "asc"))
                .join(",");
            this._querySegments.push(querySegment.concat("=" , orderbySegment));
        }
        return this;
    }

    public page(props: number): QueryBuilder {
        let querySegment: string = "page";
        let pageSegment = props.toString();
        this._querySegments.push(querySegment.concat("=", pageSegment));

        return this;
    }

    public pageSize(props: number): QueryBuilder {
        let querySegment: string = "pageSize";
        let pageSegment = props.toString();
        this._querySegments.push(querySegment.concat("=", pageSegment));

        return this;
    }


    public toQueryString(): string {
        return "?".concat(this._querySegments.join("&"));
    }
}
import { Injectable } from '@angular/core';

@Injectable()
export class QueryBuilder {
    private _querySegments: Array<string> = new Array<string>();

    constructor() {
    }

    public orderBy(props: Array<{ propName: string, orderDirection: string }>): QueryBuilder {
        if (props && props.length > 0) {
            let querySegment: string = "$orderby";
            let orderbySegment = props.map(
                p => p.orderDirection ? p.propName.concat(" ", p.orderDirection) : p.propName.concat(" ", "asc"))
                .join(",");
            this._querySegments.push(querySegment.concat("=" , orderbySegment));
        }
        return this;
    }

    public filterBy(props: Array<{propName: string, comparator: string, value: string}>){
        if (props && props.length > 0) {
            let querySegment: string = "$filter";
            let filterbySegment = props.map(p => p.value ? p.propName.concat(" " + p.comparator + " " , p.value).trim() : "").join(" and ");
            this._querySegments.push(querySegment.concat("=" , filterbySegment));
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
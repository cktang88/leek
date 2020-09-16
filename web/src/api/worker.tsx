import {search} from "./search";

export interface Task {
    filter(
        app_name: string,
        hostname: string | null,
        size: number,
        from_: number,
        state: string | null,
    ): any;

    getById(
        app_name: string,
        hostname: string,
    ): any;
}

export class WorkerSearch implements Task {
    filter(
        app_name: string,
        hostname: string | null,
        size: number,
        from_: number,
        state: string | null,
    ) {
        let filters = [
            {"match": {"kind": "worker"}},
            state && {"match": {"state": state}},
            hostname && {"match": {"hostname": hostname}}
        ];
        filters = filters.filter(Boolean);
        return search(
            app_name,
            {
                query: {
                    "bool": {
                        "must": filters
                    }
                }
            },
            {
                size: size,
                from_: from_
            }
        )
    }

    getById(
        app_name: string,
        hostname: string,
    ) {
        return search(
            app_name,
            {
                query: {
                    "term": {
                        "_id": hostname
                    }
                }
            },
            {
                size: 1,
                from_: 0
            }
        )
    }
}

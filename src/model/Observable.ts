type Subscribers<Data, Result> = Map<number, [Mapper<Data, Result>, Subscriber<Result>]>;
type Subscriber<Data> = (data: Data) => void;
type Mapper<Input, Output> = (input: Input) => Output;

export class Observable<Data> {
    private data: Data;
    private subscribers: Subscribers<Data, unknown> = new Map();
    private lastId = 0;

    constructor(data: Data) {
        this.data = data;
    }

    subscribe<Result>(
        cb: Subscriber<Result>,
        mapper: Mapper<Data, Result> = (data: Data) => data as unknown as Result
    ) {
        cb(mapper(this.data));
        this.subscribers.set(this.lastId, [mapper, cb as Subscriber<unknown>]);
        return this.lastId++;
    }

    notify(data: Data) {
        const prevData = this.data;
        this.data = data;
        this.subscribers.forEach(([mapper, cb]) => {
            const newResult = mapper(this.data);
            const lastResult = mapper(prevData);
            if (newResult !== lastResult) {
                cb(newResult);
            }
        });
    }

    unsubscribe(id: number) {
        this.subscribers.delete(id);
    }

    public getData(): Data {
        return this.data;
    }
}

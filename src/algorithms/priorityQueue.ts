export class PriorityQueue<T> {
    private readonly items: T[] = [];
    private readonly compare: (a: T, b: T) => number;

    constructor(compare: (a: T, b: T) => number) {
        this.compare = compare;
    }

    get size(): number {
        return this.items.length;
    }

    push(item: T): void {
        this.items.push(item);
        this.bubbleUp(this.items.length - 1);
    }

    pop(): T | undefined {
        if (this.items.length === 0) return undefined;

        const top = this.items[0];
        const last = this.items.pop()!;
        if (this.items.length > 0) {
            this.items[0] = last;
            this.bubbleDown(0);
        }
        return top;
    }

    private bubbleUp(index: number): void {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.compare(this.items[index], this.items[parent]) >= 0) break;
            this.swap(index, parent);
            index = parent;
        }
    }

    private bubbleDown(index: number): void {
        const length = this.items.length;
        while (true) {
            const left = 2 * index + 1;
            const right = left + 1;
            let smallest = index;

            if (left < length && this.compare(this.items[left], this.items[smallest]) < 0) {
                smallest = left;
            }
            if (right < length && this.compare(this.items[right], this.items[smallest]) < 0) {
                smallest = right;
            }
            if (smallest === index) break;

            this.swap(index, smallest);
            index = smallest;
        }
    }

    private swap(i: number, j: number): void {
        const temp = this.items[i];
        this.items[i] = this.items[j];
        this.items[j] = temp;
    }
}
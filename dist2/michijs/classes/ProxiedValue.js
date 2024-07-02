import { hasToJSON } from "../typeWards/hasToJSON";
import { deepEqual, unproxify } from "../utils";
import { useComputedObserve } from "../hooks/useComputedObserve";
import { Observable } from "./Observable";

/**
 * @typedef {import('../types').Subscription} Subscription
 * @typedef {import('../types').ObservableType} ObservableType
 * @typedef {import('../types').ProxiedValueInterface} ProxiedValueInterface
 * @typedef {import('../types').Typeof} Typeof
 */







/**
 * @template T
 * @implements {ProxiedValueInterface<T, T>}
 */
export class ProxiedValue extends Observable {
    /**
     * @private
     * @type {T}
     */
    $privateValue;

    static transactionsInProgress = 0;
    /**
     * @type {Set< InstanceType<typeof ProxiedValue<any>> >}
     */
    static valuesToNotifyOnTransactionFinish = new Set();
    static startTransaction() {
        ProxiedValue.transactionsInProgress++;
    }
    static endTransaction() {
        if (ProxiedValue.transactionsInProgress === 1) {
            ProxiedValue.valuesToNotifyOnTransactionFinish.forEach((x) => {
                x.forceNotifyCurrentValue();
            });
            ProxiedValue.valuesToNotifyOnTransactionFinish.clear();
            // Intentionally at the end to avoid notifying twice
        }
        ProxiedValue.transactionsInProgress--;
    }

    /**
     * @param {T} [initialValue]
     * @param {Subscription<T>[]} [initialObservers]
     */
    constructor(initialValue, initialObservers) {
        super(initialObservers);
        this.$privateValue = initialValue;
        // To avoid issues with isolatedDeclarations
        this[Symbol.toStringTag] = () => this.toString();
        this[Symbol.toPrimitive] = () => this.valueOf();
    }

    set $value(newValue) {
        if (this.shouldNotify()) {
            if (!deepEqual(newValue, this.$privateValue)) {
                this.$privateValue = newValue;
                this.notifyCurrentValue();
            }
        }
        else
            this.$privateValue = newValue;
    }
    get $value() {
        return this.$privateValue;
    }

    notifyCurrentValue() {
        if (this.shouldNotify()) {
            if (ProxiedValue.transactionsInProgress > 0)
                ProxiedValue.valuesToNotifyOnTransactionFinish.add(this);
            else
                this.notify(this.valueOf());
        }
    }
    forceNotifyCurrentValue() {
        this.notify(this.valueOf());
    }

    // @ts-ignore
    valueOf() {
        // if (typeof this.$value === 'object') {
        //   console.log('pase', this.$value)
        //   throw this.$value
        // }
        return unproxify(this.$value);
    }

    /**
     * @public
     */
    toObservableString() {
        return useComputedObserve(() => this.toString(), [this]);
    }

    /**
     * @public
     */
    toBoolean() {
        return Boolean(this.$value);
    }

    /**
     * @public
     */
    not() {
        return !this.$value;
    }

    /**
     * @public
     * @param {?} anotherValue
     */
    is(anotherValue) {
        return this.$value === anotherValue?.valueOf();
    }

    toJSON() {
        if (this.$value && hasToJSON(this.$value))
            return this.$value.toJSON();

        return this.$value;
    }

    toString() {
        // @ts-ignore
        return this.$value.toString();
    }
    unproxify() {
        return this.valueOf();
    }

    shouldNotify() {
        return !!this.observers;
    }

    typeof() {
        return typeof this.$value;
    }

    // Only for jest
    /**
     * @param {?} prop
     */
    asymmetricMatch(prop) {
        return this.is(prop);
    }
}

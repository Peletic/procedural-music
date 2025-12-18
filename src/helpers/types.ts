export type Permutations<T extends string, U extends string = T> =
    T extends any ? (T | `${T}${Permutations<Exclude<U, T>>}`) : never;

export type JoinedNumberCombinations<J extends string, T extends number, U extends number> =
    T extends any ? (`${T}${J}${U}` | `${Exclude<`${T}${J}${U}`, JoinedNumberCombinations<J, Exclude<T, T>, U>>}`) : never;

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc['length']]>

type Negate<N extends number> =
    N extends 0 ? 0 :
        `${N}` extends `-${infer S extends number}` ? S :
            `-${N}` extends `${infer S extends number}` ? S :
                never;

type NonNegativeIntRange<F extends number, T extends number> =
    Exclude<Enumerate<T>, Enumerate<F>> | T

type NegativeIntRange<F extends number, T extends number> =
    Exclude<Negate<NonNegativeIntRange<Negate<T>, Negate<F>>> | F, T>;

type MixedIntRange<F extends number, T extends number> =
    F | Negate<Enumerate<Negate<F>>> | Enumerate<T> | T

export type NumRange<F extends number, T extends number> =
    `${F}` extends `-${string}` ?
        `${T}` extends `-${string}` ?
            NegativeIntRange<F, T> :
            MixedIntRange<F, T> :
        NonNegativeIntRange<F, T>;
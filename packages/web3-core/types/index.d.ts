/*
    This file is part of web3.js.
    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file index.d.ts
 * @author Josh Stevens <joshstevens19@hotmail.co.uk>
 * @date 2018
 */

import * as net from "net";
import {AbstractProviderAdapter, ProvidersModuleFactory, provider, HttpProvider, WebsocketProvider, IpcProvider} from 'web3-providers';

export class AbstractWeb3Module {
    constructor(
        provider: AbstractProviderAdapter | provider,
        providersModuleFactory: ProvidersModuleFactory,
        providers: Providers,
        methodModuleFactory: any,
        methodFactory?: any,
        options?: Web3ModuleOptions
    );
    readonly defaultGasPrice: string;
    readonly defaultGas: number;
    readonly transactionPollingTimeout: number;
    readonly transactionConfirmationBlocks: number;
    readonly transactionBlockTimeout: number;
    readonly defaultBlock: string | number;
    readonly defaultAccount: string | null;
    readonly currentProvider: AbstractProviderAdapter;
    readonly providers: Providers;
    readonly givenProvider: provider | null;
    setProvider(provider: AbstractProviderAdapter | provider, net?: net.Server): boolean;
    isSameProvider(provider: AbstractProviderAdapter | provider): boolean;
    clearSubscriptions(): void;
}

export interface Web3ModuleOptions {
    defaultAccount?: string;
    defaultBlock?: string | number;
    transactionBlockTimeout?: number;
    transactionConfirmationBlocks?: number;
    transactionPollingTimeout?: number;
    defaultGasPrice?: string;
    defaultGas?: number;
}

export interface Providers {
    HttpProvider: HttpProvider;
    WebsocketProvider: WebsocketProvider;
    IpcProvider: IpcProvider;
}

export interface PromiEvent<T> extends Promise<T> {
    once(type: 'transactionHash', handler: (receipt: string) => void): PromiEvent<T>
    once(type: 'receipt', handler: (receipt: TransactionReceipt) => void): PromiEvent<T>
    once(type: 'confirmation', handler: (confNumber: number, receipt: TransactionReceipt) => void): PromiEvent<T>
    once(type: 'error', handler: (error: Error) => void): PromiEvent<T>
    once(type: 'error' | 'confirmation' | 'receipt' | 'transactionHash', handler: (error: Error | TransactionReceipt | string) => void): PromiEvent<T>
    on(type: 'transactionHash', handler: (receipt: string) => void): PromiEvent<T>
    on(type: 'receipt', handler: (receipt: TransactionReceipt) => void): PromiEvent<T>
    on(type: 'confirmation', handler: (confNumber: number, receipt: TransactionReceipt) => void): PromiEvent<T>
    on(type: 'error', handler: (error: Error) => void): PromiEvent<T>
    on(type: 'error' | 'confirmation' | 'receipt' | 'transactionHash', handler: (error: Error | TransactionReceipt | string) => void): PromiEvent<T>
}

export interface Transaction {
    from?: string | number;
    to?: string;
    gasPrice?: string;
    gas?: number | string;
    value?: number | string;
    chainId?: number;
    data?: string;
    nonce?: number;
    v?: string;
    r?: string;
    s?: string;
    hash?: string;
}

export interface RLPEncodedTransaction {
    raw: string,
    tx: Transaction
}

export interface TransactionReceipt {
    transactionHash: string
    transactionIndex: number
    blockHash: string
    blockNumber: number
    from: string
    to: string
    contractAddress: string
    cumulativeGasUsed: number
    gasUsed: number
    logs?: Log[]
    events?: {
        [eventName: string]: EventLog
    }
}

export interface EventLog {
    event: string
    address: string
    returnValues: object
    logIndex: number
    transactionIndex: number
    transactionHash: string
    blockHash: string
    blockNumber: number
    raw?: { data: string, topics: any[] }
}

export interface Log {
    address: string;
    data: string;
    topics: Array<string | string[]>;
    logIndex: number;
    transactionIndex: number;
    transactionHash: string;
    blockHash: string;
    blockNumber: number;
}
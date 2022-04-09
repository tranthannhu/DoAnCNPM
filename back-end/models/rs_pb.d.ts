// package: Recommendation
// file: rs.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class UserRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): UserRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UserRequest): UserRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserRequest;
    static deserializeBinaryFromReader(message: UserRequest, reader: jspb.BinaryReader): UserRequest;
}

export namespace UserRequest {
    export type AsObject = {
        id: string,
    }
}

export class ItemResponse extends jspb.Message { 
    clearItemidsList(): void;
    getItemidsList(): Array<string>;
    setItemidsList(value: Array<string>): ItemResponse;
    addItemids(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ItemResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ItemResponse): ItemResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ItemResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ItemResponse;
    static deserializeBinaryFromReader(message: ItemResponse, reader: jspb.BinaryReader): ItemResponse;
}

export namespace ItemResponse {
    export type AsObject = {
        itemidsList: Array<string>,
    }
}

export class Check extends jspb.Message { 
    getMessage(): string;
    setMessage(value: string): Check;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Check.AsObject;
    static toObject(includeInstance: boolean, msg: Check): Check.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Check, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Check;
    static deserializeBinaryFromReader(message: Check, reader: jspb.BinaryReader): Check;
}

export namespace Check {
    export type AsObject = {
        message: string,
    }
}

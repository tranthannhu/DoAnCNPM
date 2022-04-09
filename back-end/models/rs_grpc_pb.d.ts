// package: Recommendation
// file: rs.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as rs_pb from "./rs_pb";

interface IRecommendationService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getItemRecommended: IRecommendationService_IGetItemRecommended;
    trackChange: IRecommendationService_ITrackChange;
}

interface IRecommendationService_IGetItemRecommended extends grpc.MethodDefinition<rs_pb.UserRequest, rs_pb.ItemResponse> {
    path: "/Recommendation.Recommendation/GetItemRecommended";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<rs_pb.UserRequest>;
    requestDeserialize: grpc.deserialize<rs_pb.UserRequest>;
    responseSerialize: grpc.serialize<rs_pb.ItemResponse>;
    responseDeserialize: grpc.deserialize<rs_pb.ItemResponse>;
}
interface IRecommendationService_ITrackChange extends grpc.MethodDefinition<rs_pb.Check, rs_pb.Check> {
    path: "/Recommendation.Recommendation/TrackChange";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<rs_pb.Check>;
    requestDeserialize: grpc.deserialize<rs_pb.Check>;
    responseSerialize: grpc.serialize<rs_pb.Check>;
    responseDeserialize: grpc.deserialize<rs_pb.Check>;
}

export const RecommendationService: IRecommendationService;

export interface IRecommendationServer extends grpc.UntypedServiceImplementation {
    getItemRecommended: grpc.handleUnaryCall<rs_pb.UserRequest, rs_pb.ItemResponse>;
    trackChange: grpc.handleUnaryCall<rs_pb.Check, rs_pb.Check>;
}

export interface IRecommendationClient {
    getItemRecommended(request: rs_pb.UserRequest, callback: (error: grpc.ServiceError | null, response: rs_pb.ItemResponse) => void): grpc.ClientUnaryCall;
    getItemRecommended(request: rs_pb.UserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: rs_pb.ItemResponse) => void): grpc.ClientUnaryCall;
    getItemRecommended(request: rs_pb.UserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: rs_pb.ItemResponse) => void): grpc.ClientUnaryCall;
    trackChange(request: rs_pb.Check, callback: (error: grpc.ServiceError | null, response: rs_pb.Check) => void): grpc.ClientUnaryCall;
    trackChange(request: rs_pb.Check, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: rs_pb.Check) => void): grpc.ClientUnaryCall;
    trackChange(request: rs_pb.Check, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: rs_pb.Check) => void): grpc.ClientUnaryCall;
}

export class RecommendationClient extends grpc.Client implements IRecommendationClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getItemRecommended(request: rs_pb.UserRequest, callback: (error: grpc.ServiceError | null, response: rs_pb.ItemResponse) => void): grpc.ClientUnaryCall;
    public getItemRecommended(request: rs_pb.UserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: rs_pb.ItemResponse) => void): grpc.ClientUnaryCall;
    public getItemRecommended(request: rs_pb.UserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: rs_pb.ItemResponse) => void): grpc.ClientUnaryCall;
    public trackChange(request: rs_pb.Check, callback: (error: grpc.ServiceError | null, response: rs_pb.Check) => void): grpc.ClientUnaryCall;
    public trackChange(request: rs_pb.Check, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: rs_pb.Check) => void): grpc.ClientUnaryCall;
    public trackChange(request: rs_pb.Check, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: rs_pb.Check) => void): grpc.ClientUnaryCall;
}

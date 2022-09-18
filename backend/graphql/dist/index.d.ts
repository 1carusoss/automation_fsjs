import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export declare type RequireFields<T, K extends keyof T> = {
    [X in Exclude<keyof T, K>]?: T[X];
} & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    AWSDate: any;
    AWSDateTime: any;
    AWSEmail: any;
    AWSIPAddress: any;
    AWSJSON: any;
    AWSPhone: any;
    AWSTime: any;
    AWSTimestamp: any;
    AWSURL: any;
};
export declare type CreateUserInput = {
    id: Scalars['ID'];
    name: Scalars['String'];
    username: Scalars['String'];
};
export declare type EditUserInput = {
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    username?: Maybe<Scalars['String']>;
};
export declare type Mutation = {
    __typename?: 'Mutation';
    createUser: User;
    deleteUser: User;
    editUser: User;
};
export declare type MutationCreateUserArgs = {
    input: CreateUserInput;
};
export declare type MutationDeleteUserArgs = {
    username: Scalars['String'];
};
export declare type MutationEditUserArgs = {
    input: EditUserInput;
};
export declare type Query = {
    __typename?: 'Query';
    getAllUsers?: Maybe<Array<Maybe<UserConnection>>>;
    getUser: User;
};
export declare type QueryGetAllUsersArgs = {
    nextToken?: Maybe<Scalars['String']>;
};
export declare type QueryGetUserArgs = {
    username: Scalars['String'];
};
export declare type TableBooleanFilterInput = {
    eq?: Maybe<Scalars['Boolean']>;
    ne?: Maybe<Scalars['Boolean']>;
};
export declare type TableFloatFilterInput = {
    between?: Maybe<Array<Maybe<Scalars['Float']>>>;
    contains?: Maybe<Scalars['Float']>;
    eq?: Maybe<Scalars['Float']>;
    ge?: Maybe<Scalars['Float']>;
    gt?: Maybe<Scalars['Float']>;
    le?: Maybe<Scalars['Float']>;
    lt?: Maybe<Scalars['Float']>;
    ne?: Maybe<Scalars['Float']>;
    notContains?: Maybe<Scalars['Float']>;
};
export declare type TableIdFilterInput = {
    beginsWith?: Maybe<Scalars['ID']>;
    between?: Maybe<Array<Maybe<Scalars['ID']>>>;
    contains?: Maybe<Scalars['ID']>;
    eq?: Maybe<Scalars['ID']>;
    ge?: Maybe<Scalars['ID']>;
    gt?: Maybe<Scalars['ID']>;
    le?: Maybe<Scalars['ID']>;
    lt?: Maybe<Scalars['ID']>;
    ne?: Maybe<Scalars['ID']>;
    notContains?: Maybe<Scalars['ID']>;
};
export declare type TableIntFilterInput = {
    between?: Maybe<Array<Maybe<Scalars['Int']>>>;
    contains?: Maybe<Scalars['Int']>;
    eq?: Maybe<Scalars['Int']>;
    ge?: Maybe<Scalars['Int']>;
    gt?: Maybe<Scalars['Int']>;
    le?: Maybe<Scalars['Int']>;
    lt?: Maybe<Scalars['Int']>;
    ne?: Maybe<Scalars['Int']>;
    notContains?: Maybe<Scalars['Int']>;
};
export declare type TableStringFilterInput = {
    beginsWith?: Maybe<Scalars['String']>;
    between?: Maybe<Array<Maybe<Scalars['String']>>>;
    contains?: Maybe<Scalars['String']>;
    eq?: Maybe<Scalars['String']>;
    ge?: Maybe<Scalars['String']>;
    gt?: Maybe<Scalars['String']>;
    le?: Maybe<Scalars['String']>;
    lt?: Maybe<Scalars['String']>;
    ne?: Maybe<Scalars['String']>;
    notContains?: Maybe<Scalars['String']>;
};
export declare type User = {
    __typename?: 'User';
    id: Scalars['ID'];
    name: Scalars['String'];
    username: Scalars['String'];
};
export declare type UserConnection = {
    __typename?: 'UserConnection';
    items?: Maybe<Array<Maybe<User>>>;
    nextToken?: Maybe<Scalars['String']>;
};
export declare type CreateUserMutationVariables = Exact<{
    input: CreateUserInput;
}>;
export declare type CreateUserMutation = {
    __typename?: 'Mutation';
    createUser: {
        __typename?: 'User';
        id: string;
        username: string;
        name: string;
    };
};
export declare type EditUserMutationVariables = Exact<{
    input: EditUserInput;
}>;
export declare type EditUserMutation = {
    __typename?: 'Mutation';
    editUser: {
        __typename?: 'User';
        id: string;
        username: string;
        name: string;
    };
};
export declare type DeleteUserMutationVariables = Exact<{
    username: Scalars['String'];
}>;
export declare type DeleteUserMutation = {
    __typename?: 'Mutation';
    deleteUser: {
        __typename?: 'User';
        id: string;
        username: string;
        name: string;
    };
};
export declare type GetUserQueryVariables = Exact<{
    username: Scalars['String'];
}>;
export declare type GetUserQuery = {
    __typename?: 'Query';
    getUser: {
        __typename?: 'User';
        id: string;
        username: string;
        name: string;
    };
};
export declare type GetAllUsersQueryVariables = Exact<{
    nextToken?: Maybe<Scalars['String']>;
}>;
export declare type GetAllUsersQuery = {
    __typename?: 'Query';
    getAllUsers?: Maybe<Array<Maybe<{
        __typename?: 'UserConnection';
        items?: Maybe<Array<Maybe<{
            __typename?: 'User';
            id: string;
            username: string;
            name: string;
        }>>>;
    }>>>;
};
export declare type ResolverTypeWrapper<T> = Promise<T> | T;
export declare type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;
export declare type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export declare type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;
export declare type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export declare type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export declare type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export declare type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export declare type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export declare type NextResolverFn<T> = () => Promise<T>;
export declare type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export declare type ResolversTypes = {
    AWSDate: ResolverTypeWrapper<Scalars['AWSDate']>;
    AWSDateTime: ResolverTypeWrapper<Scalars['AWSDateTime']>;
    AWSEmail: ResolverTypeWrapper<Scalars['AWSEmail']>;
    AWSIPAddress: ResolverTypeWrapper<Scalars['AWSIPAddress']>;
    AWSJSON: ResolverTypeWrapper<Scalars['AWSJSON']>;
    AWSPhone: ResolverTypeWrapper<Scalars['AWSPhone']>;
    AWSTime: ResolverTypeWrapper<Scalars['AWSTime']>;
    AWSTimestamp: ResolverTypeWrapper<Scalars['AWSTimestamp']>;
    AWSURL: ResolverTypeWrapper<Scalars['AWSURL']>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    CreateUserInput: CreateUserInput;
    EditUserInput: EditUserInput;
    Float: ResolverTypeWrapper<Scalars['Float']>;
    ID: ResolverTypeWrapper<Scalars['ID']>;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    Mutation: ResolverTypeWrapper<{}>;
    Query: ResolverTypeWrapper<{}>;
    String: ResolverTypeWrapper<Scalars['String']>;
    TableBooleanFilterInput: TableBooleanFilterInput;
    TableFloatFilterInput: TableFloatFilterInput;
    TableIDFilterInput: TableIdFilterInput;
    TableIntFilterInput: TableIntFilterInput;
    TableStringFilterInput: TableStringFilterInput;
    User: ResolverTypeWrapper<User>;
    UserConnection: ResolverTypeWrapper<UserConnection>;
};
/** Mapping between all available schema types and the resolvers parents */
export declare type ResolversParentTypes = {
    AWSDate: Scalars['AWSDate'];
    AWSDateTime: Scalars['AWSDateTime'];
    AWSEmail: Scalars['AWSEmail'];
    AWSIPAddress: Scalars['AWSIPAddress'];
    AWSJSON: Scalars['AWSJSON'];
    AWSPhone: Scalars['AWSPhone'];
    AWSTime: Scalars['AWSTime'];
    AWSTimestamp: Scalars['AWSTimestamp'];
    AWSURL: Scalars['AWSURL'];
    Boolean: Scalars['Boolean'];
    CreateUserInput: CreateUserInput;
    EditUserInput: EditUserInput;
    Float: Scalars['Float'];
    ID: Scalars['ID'];
    Int: Scalars['Int'];
    Mutation: {};
    Query: {};
    String: Scalars['String'];
    TableBooleanFilterInput: TableBooleanFilterInput;
    TableFloatFilterInput: TableFloatFilterInput;
    TableIDFilterInput: TableIdFilterInput;
    TableIntFilterInput: TableIntFilterInput;
    TableStringFilterInput: TableStringFilterInput;
    User: User;
    UserConnection: UserConnection;
};
export interface AwsDateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSDate'], any> {
    name: 'AWSDate';
}
export interface AwsDateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSDateTime'], any> {
    name: 'AWSDateTime';
}
export interface AwsEmailScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSEmail'], any> {
    name: 'AWSEmail';
}
export interface AwsipAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSIPAddress'], any> {
    name: 'AWSIPAddress';
}
export interface AwsjsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSJSON'], any> {
    name: 'AWSJSON';
}
export interface AwsPhoneScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSPhone'], any> {
    name: 'AWSPhone';
}
export interface AwsTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSTime'], any> {
    name: 'AWSTime';
}
export interface AwsTimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSTimestamp'], any> {
    name: 'AWSTimestamp';
}
export interface AwsurlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSURL'], any> {
    name: 'AWSURL';
}
export declare type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
    createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
    deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'username'>>;
    editUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationEditUserArgs, 'input'>>;
};
export declare type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
    getAllUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserConnection']>>>, ParentType, ContextType, RequireFields<QueryGetAllUsersArgs, never>>;
    getUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserArgs, 'username'>>;
};
export declare type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type UserConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserConnection'] = ResolversParentTypes['UserConnection']> = {
    items?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
    nextToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type Resolvers<ContextType = any> = {
    AWSDate?: GraphQLScalarType;
    AWSDateTime?: GraphQLScalarType;
    AWSEmail?: GraphQLScalarType;
    AWSIPAddress?: GraphQLScalarType;
    AWSJSON?: GraphQLScalarType;
    AWSPhone?: GraphQLScalarType;
    AWSTime?: GraphQLScalarType;
    AWSTimestamp?: GraphQLScalarType;
    AWSURL?: GraphQLScalarType;
    Mutation?: MutationResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    User?: UserResolvers<ContextType>;
    UserConnection?: UserConnectionResolvers<ContextType>;
};
export declare const CreateUserDocument = "\n    mutation CreateUser($input: CreateUserInput!) {\n  createUser(input: $input) {\n    id\n    username\n    name\n  }\n}\n    ";
export declare const useCreateUserMutation: <TError = unknown, TContext = unknown>(dataSource: {
    endpoint: string;
    fetchParams?: RequestInit;
}, options?: UseMutationOptions<CreateUserMutation, TError, Exact<{
    input: CreateUserInput;
}>, TContext> | undefined) => import("@tanstack/react-query").UseMutationResult<CreateUserMutation, TError, Exact<{
    input: CreateUserInput;
}>, TContext>;
export declare const EditUserDocument = "\n    mutation EditUser($input: EditUserInput!) {\n  editUser(input: $input) {\n    id\n    username\n    name\n  }\n}\n    ";
export declare const useEditUserMutation: <TError = unknown, TContext = unknown>(dataSource: {
    endpoint: string;
    fetchParams?: RequestInit;
}, options?: UseMutationOptions<EditUserMutation, TError, Exact<{
    input: EditUserInput;
}>, TContext> | undefined) => import("@tanstack/react-query").UseMutationResult<EditUserMutation, TError, Exact<{
    input: EditUserInput;
}>, TContext>;
export declare const DeleteUserDocument = "\n    mutation DeleteUser($username: String!) {\n  deleteUser(username: $username) {\n    id\n    username\n    name\n  }\n}\n    ";
export declare const useDeleteUserMutation: <TError = unknown, TContext = unknown>(dataSource: {
    endpoint: string;
    fetchParams?: RequestInit;
}, options?: UseMutationOptions<DeleteUserMutation, TError, Exact<{
    username: Scalars['String'];
}>, TContext> | undefined) => import("@tanstack/react-query").UseMutationResult<DeleteUserMutation, TError, Exact<{
    username: Scalars['String'];
}>, TContext>;
export declare const GetUserDocument = "\n    query GetUser($username: String!) {\n  getUser(username: $username) {\n    id\n    username\n    name\n  }\n}\n    ";
export declare const useGetUserQuery: <TData = GetUserQuery, TError = unknown>(dataSource: {
    endpoint: string;
    fetchParams?: RequestInit;
}, variables: GetUserQueryVariables, options?: UseQueryOptions<GetUserQuery, TError, TData, import("@tanstack/react-query").QueryKey> | undefined) => import("@tanstack/react-query").UseQueryResult<TData, TError>;
export declare const GetAllUsersDocument = "\n    query GetAllUsers($nextToken: String) {\n  getAllUsers(nextToken: $nextToken) {\n    items {\n      id\n      username\n      name\n    }\n  }\n}\n    ";
export declare const useGetAllUsersQuery: <TData = GetAllUsersQuery, TError = unknown>(dataSource: {
    endpoint: string;
    fetchParams?: RequestInit;
}, variables?: GetAllUsersQueryVariables, options?: UseQueryOptions<GetAllUsersQuery, TError, TData, import("@tanstack/react-query").QueryKey> | undefined) => import("@tanstack/react-query").UseQueryResult<TData, TError>;

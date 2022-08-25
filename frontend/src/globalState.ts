import { createContext } from "react";
import { Interpreter, ResolveTypegenMeta, TypegenDisabled, BaseActionObject, ServiceMap } from 'xstate';
import { AuthContext, AuthEvent } from "./machine";

export default createContext<any>({});

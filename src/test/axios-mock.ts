import { api } from "@/service/axios/api";
import MockAdapter from "axios-mock-adapter";

export const axiosMock = new MockAdapter(api, { delayResponse: 200 });

import { ApiPayload } from './api';

type DispatchProp<SuccessData = any, FailData = any> = (payload: ApiPayload<SuccessData, FailData>) => void

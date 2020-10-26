import { EventEmitter } from 'events';
import { Emitter } from 'nest-event';

@Emitter()
export class MainEventEmitterService extends EventEmitter {}

import { Subject } from 'rxjs';

export default interface WebsocketMessages {
    projectsMonitorSubject: Subject<MessageEvent>;
    stopProjectsMonitorSubject: Subject<MessageEvent>;
}

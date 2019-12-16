import { Observable, Subject } from 'rxjs';

export default interface WebsocketMessages {
    projectsMonitorSubject: Subject<MessageEvent>;
    stopProjectsMonitorSubject: Subject<MessageEvent>;
    projectsMonitorCountdown$: Observable<MessageEvent>;
}

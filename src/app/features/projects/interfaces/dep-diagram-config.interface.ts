export default interface DepDiagramConfig {
    name: string;
    statusText: string;
    deps: DepDiagramConfig[];
    trace: string[];
}

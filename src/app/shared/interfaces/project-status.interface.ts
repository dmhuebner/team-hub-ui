import PathChecked from './path-checked.interface';

export default interface ProjectStatus {
    name: string;
    up: boolean;
    pathsChecked: PathChecked[];
}

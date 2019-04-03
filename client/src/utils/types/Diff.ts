type Diff<T, U> = T extends U ? never : T;

export default Diff;

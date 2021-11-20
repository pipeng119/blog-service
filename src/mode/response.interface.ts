export interface IRes<T> {
    code: number;
    data: T,
    message: "success" | "error";
}

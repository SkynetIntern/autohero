//@ts-ignore
export const IsObjEmpty = (obj) => {
    for (let key in obj) return false;
    return true;
}
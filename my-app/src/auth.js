import { v4 as uuidv4 } from 'uuid';
// export const Authorization = "Bearer fc4bdab584b220286c02ac42e42bd47e66d34e03257b96b390c40f3433806539b81d098908f461b03444294ec1e0afd6970da0e606503a84b4bb904851bc66f7690df389bfca726cbb813f21e7e954651703861fb2569afee95ee07bdd524874cefa4d5398cab838bf548de35770d6e62ef4fbd927ab43c0bf7ccd8fda3b7f81"
export const ApiRoot = "http://localhost:1337"
export const Authorization = "Bearer da3c249bed88883388d1ec4fa87f0d52f700c50a788b5e3ec40927e534481f73bb31a205085584fbaf04e81b181e8d98d499e272c097007fd718b4f6854800e6fb92aca2222b7f2b9ec22392a8700c1aa9b3290671287a22851ccada8040ed47f5445926727a9bb7fa356886f39ab0c4596de7b56a41137ee497597e9d381a10"
let sessions = [];

export const CreateSession = (email) => {
    const session = {
        id: uuidv4(),
        email,
    };
    sessions.push(session);
    return Promise.resolve(session);
};
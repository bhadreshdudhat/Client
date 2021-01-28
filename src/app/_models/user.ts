export interface User {
    id: number;
    username: string;
    token: string;
    photoUrl: string; // photo functionality
    knownAs: string;
    gender: string;
    roles: string[];
}

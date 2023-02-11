export class User {
    nickName!: string;
    passWord!: string;
    email!: string;
    phone!: string;
    country!: string;

    constructor(
        nickName?: string,
        passWord?: string,
        email?: string,
        phone?: string,
        country?: string,
    ) {
        this.nickName = nickName!;
        this.passWord = passWord!;
        this.email = email!;
        this.phone = phone!;
        this.country = country!;
    }
}

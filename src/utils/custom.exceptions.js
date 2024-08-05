export class UserAlreadyExists extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class UserByEmailExists extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ShiftExists extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ShiftByDateByScheduleExists extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class PartnerExists extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class PartnerByEmailMembershipNumberExists extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class PartnerByEmailExists extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ProviderExists extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ProviderByCuitCuilExists extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ProviderByBusinessNameExists extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ProviderByEmailExists extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ProductAlreadyExists extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ProductByTitleExists extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class PriceAlreadyExists extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class PriceByPriceOfExists extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class InvalidCredentials extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ExpiredToken extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class HolidayExists extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
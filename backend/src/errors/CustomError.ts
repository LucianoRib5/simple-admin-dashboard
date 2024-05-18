export class CustomError extends Error {
    statusCode: number = 400;
    errorCode: string;

    constructor(message: string, errorCode: string, statusCode?: number) {
        super(message);
        this.name = this.constructor.name;
        this.errorCode = errorCode;

        if(statusCode) this.statusCode = statusCode;
    }

    errorHandler() {
        return {
            'message': this.message,
            'statusCode': this.statusCode,
            'errorCode': this.errorCode
        }
    }
}
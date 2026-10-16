export class CustomHTTPError extends Error {
    private constructor(
        public readonly message: string,
        public readonly statusCode: number) {

        super(message);
    };

    static InternalServerError(message: string): CustomHTTPError {
        return new CustomHTTPError(message, 500);
    }

    static BadRequestError(message: string): CustomHTTPError {
        return new CustomHTTPError(message, 400);
    }

    static NotFoundError(message: string): CustomHTTPError {
        return new CustomHTTPError(message, 404);
    }
};
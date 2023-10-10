/**
 * Error
 */

class DBError extends Error {
    statement: string;
    constructor(message: string, statement: string) {
        super(message);
        this.name = "[DB ERROR]";
        this.statement = statement;
    }
}

enum RequestErrorType {
    // API Errors
    API_REQUEST_FAILED = "API request failed",
    API_AUTH_ERROR = "API authentication error",
    API_NOT_FOUND = "API resource not found",
    API_TIMEOUT = "API request timed out",
    API_RATE_LIMIT_EXCEEDED = "API rate limit exceeded",
    API_MISSING_ARG = "API request is missing some arguments",
    // Database Errors
    DB_CONNECTION_ERROR = "Database connection error",
    DB_QUERY_FAILED = "Database query failed",
    DB_DUPLICATE_ENTRY = "Duplicate database entry",
    DB_RECORD_NOT_FOUND = "Database record not found",
    DB_TRANSACTION_ERROR = "Database transaction error"
}

class RequestError extends Error {
    statement: string;
    constructor(message: string, statement: string) {
        super(message);
        this.name = "[REQUEST ERROR]";
        this.statement = statement;
    }
}

export { DBError, RequestError, RequestErrorType };

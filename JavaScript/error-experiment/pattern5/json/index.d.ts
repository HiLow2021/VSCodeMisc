/**
 * エラー詳細
 */
export type ErrorDetail = {
    /**
     * エラーコード
     */
    errorCode: string;
    /**
     * エラーメッセージ
     */
    errorMessage: string;
};

declare const ErrorDetails: Readonly<ErrorDetail[]>;

export default ErrorDetails;

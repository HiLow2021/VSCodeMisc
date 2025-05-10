export type ErrorCode = 'errorCode1' | 'errorCode2';
export const ErrorCode = {
    /**
     * エラーコード1の説明
     */
    errorCode1: 'errorCode1',

    /**
     * エラーコード2の説明
     */
    errorCode2: 'errorCode2'
} as const;

/**
 * エラー詳細
 */
export type ErrorDetail = {
    /**
     * エラーコード
     */
    errorCode: ErrorCode;
    /**
     * エラーメッセージ
     */
    errorMessage: string;
};

/**
 * エラー詳細テーブル
 */
export const ErrorDetails: Readonly<ErrorDetail[]> = [
    { errorCode: ErrorCode.errorCode1, errorMessage: 'エラーメッセージ1' },
    { errorCode: ErrorCode.errorCode2, errorMessage: 'エラーメッセージ2' }
] as const;

export function getErrorDetail(errorCode: ErrorCode | undefined): ErrorDetail | undefined {
    if (!errorCode) {
        return undefined;
    }

    return ErrorDetails.find((errorDetail) => errorDetail.errorCode === errorCode);
}

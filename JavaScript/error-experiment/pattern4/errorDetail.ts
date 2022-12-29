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

/**
 * エラー詳細辞書テーブル
 */
export const ErrorDetails: { [key: string]: Readonly<ErrorDetail> } = {
    /**
     * エラーコード1の説明
     */
    errorCode1: { errorCode: 'errorCode1', errorMessage: 'エラーメッセージ1' },

    /**
     * エラーコード2の説明
     */
    errorCode2: { errorCode: 'errorCode2', errorMessage: 'エラーメッセージ2' }
} as const;

export function getErrorDetail(errorCode: string | undefined): ErrorDetail | undefined {
    if (!errorCode) {
        return undefined;
    }

    return ErrorDetails[errorCode];
}

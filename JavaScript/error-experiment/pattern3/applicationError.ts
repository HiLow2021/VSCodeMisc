import { ErrorCode, ErrorDetail, getErrorDetail } from './errorDetail';

/**
 * アプリケーションエラー基底クラス
 */
export class ApplicationError extends Error {
    /**
     * ステータスコード
     */
    private readonly _statusCode: number | undefined;

    /**
     * エラー詳細
     */
    private readonly errorDetail?: ErrorDetail;

    public get statusCode(): number {
        throw new Error();
    }

    public constructor(message?: string, errorCode?: ErrorCode) {
        super(message);

        this.errorDetail = getErrorDetail(errorCode);
    }
}

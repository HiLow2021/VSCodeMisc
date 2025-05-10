/**
 * アプリケーションエラー基底クラス
 */
export class ApplicationError extends Error {
    /**
     * ステータスコード
     */
    private readonly _statusCode: number | undefined;

    /**
     * エラーコード
     */
    private readonly errorCode: string;

    /**
     * エラーメッセージ
     */
    private readonly errorMessage: string;

    public get statusCode(): number {
        throw new Error();
    }

    public constructor(message?: string, errorCode?: string, errorMessage?: string) {
        super(message);

        this.errorCode = errorCode ?? '';
        this.errorMessage = errorMessage ?? '';
    }
}

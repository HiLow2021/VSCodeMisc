'use client';

import { Button, FormControl, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

export default function Form() {
    const { control, handleSubmit } = useForm({ mode: 'onBlur' });

    return (
        <main className="w-full flex justify-center">
            <div className="flex flex-col w-full max-w-5xl text-3xl">
                <h1 className="flex justify-center p-2 lg:p-4">Form Page</h1>
                <FormControl component="form" className="flex flex-col gap-4" onSubmit={handleSubmit((data) => console.log(data))}>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: { value: true, message: '入力が必須です' }
                        }}
                        render={({ field, formState: { errors } }) => (
                            <TextField
                                {...field}
                                label="名前 *"
                                fullWidth
                                placeholder="名無し"
                                variant="standard"
                                error={errors.name ? true : false}
                                helperText={errors.name?.message as string}
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: { value: true, message: '入力が必須です' },
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: '不正なメールアドレスです'
                            }
                        }}
                        render={({ field, formState: { errors } }) => (
                            <TextField
                                {...field}
                                label="メールアドレス *"
                                type="email"
                                fullWidth
                                placeholder=""
                                variant="standard"
                                error={errors.email ? true : false}
                                helperText={errors.email?.message as string}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: { value: true, message: '入力が必須です' },
                            minLength: {
                                value: 8,
                                message: '8文字以上の入力が必須です'
                            }
                        }}
                        render={({ field, formState: { errors } }) => (
                            <TextField
                                {...field}
                                label="パスワード *"
                                type="password"
                                fullWidth
                                placeholder=""
                                variant="standard"
                                error={errors.password ? true : false}
                                helperText={errors.password?.message as string}
                            />
                        )}
                    />
                    <div className="flex justify-center">
                        <Button type="submit" variant="contained" size="large">
                            送信
                        </Button>
                    </div>
                </FormControl>
            </div>
        </main>
    );
}

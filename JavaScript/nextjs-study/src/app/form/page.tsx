'use client';

import { Prefectures } from '@/shared/const/prefecture';
import {
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField
} from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function Form() {
    const { control, handleSubmit, setValue } = useForm({ mode: 'onBlur' });
    const [submitted, setSubmitted] = useState(false);

    return (
        <main className="flex w-full justify-center">
            <div className="flex w-full max-w-5xl flex-col text-3xl">
                <h1 className="flex justify-center p-2 lg:p-4">Form Page</h1>
                <FormControl component="form" className="flex flex-col gap-4" onSubmit={handleSubmit((data) => setSubmitted(true))}>
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
                        name="sex"
                        control={control}
                        rules={{
                            required: { value: true, message: '入力が必須です' }
                        }}
                        render={({ field, formState: { errors } }) => (
                            <FormControl {...field} error={errors.sex ? true : false}>
                                <FormLabel id="sex-group-label">性別</FormLabel>
                                <RadioGroup name="sex" row aria-labelledby="sex-group-label">
                                    <FormControlLabel value={0} control={<Radio />} label="男" />
                                    <FormControlLabel value={1} control={<Radio />} label="女" />
                                    <FormControlLabel value={2} control={<Radio />} label="その他" />
                                </RadioGroup>
                                <FormHelperText className="ml-0">{errors.sex?.message as string}</FormHelperText>
                            </FormControl>
                        )}
                    />
                    <div className="flex items-end gap-8">
                        <Controller
                            name="prefecture"
                            control={control}
                            defaultValue={12}
                            render={({ field, formState: { errors } }) => (
                                <FormControl className="w-32" variant="standard" error={errors.prefecture ? true : false}>
                                    <FormLabel id="prefecture-label">都道府県</FormLabel>
                                    <Select labelId="prefecture-label" id="prefecture" label="prefecture" {...field}>
                                        {Prefectures.map((x, i) => (
                                            <MenuItem key={x} value={i}>
                                                {x}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{errors.prefecture?.message as string}</FormHelperText>
                                </FormControl>
                            )}
                        />
                        <Button
                            className="w-32"
                            variant="contained"
                            size="large"
                            onClick={() => {
                                setValue('prefecture', 12);
                            }}
                        >
                            デフォルト
                        </Button>
                    </div>
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
                        <Button className="w-32" type="submit" variant="contained" size="large">
                            送信
                        </Button>
                    </div>
                    <div className="flex justify-center">
                        <p className="text-lg font-semibold text-green-600">{submitted ? '送信されました' : ''}</p>
                    </div>
                </FormControl>
            </div>
        </main>
    );
}

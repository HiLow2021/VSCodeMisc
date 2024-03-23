'use client';

import { FormControl, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

export default function Form() {
    const { control, handleSubmit } = useForm();

    return (
        <main className="w-full flex justify-center">
            <div className="flex flex-col w-full max-w-5xl text-3xl">
                <h1 className="flex justify-center p-2 lg:p-4">Form Page</h1>
                <div className="flex flex-col p-4">
                    <FormControl>
                        <Controller
                            name="text"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: { value: true, message: '必須入力' }
                            }}
                            render={({ field, formState: { errors } }) => (
                                <TextField
                                    {...field}
                                    label="名前"
                                    fullWidth
                                    placeholder="名無し"
                                    variant="standard"
                                    error={errors.text ? true : false}
                                    helperText={errors.text?.message as string}
                                />
                            )}
                        />
                    </FormControl>
                </div>
            </div>
        </main>
    );
}

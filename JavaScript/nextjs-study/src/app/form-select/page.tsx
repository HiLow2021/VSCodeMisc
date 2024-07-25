'use client';

import { Button, FormControl, FormHelperText, FormLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

export default function FormSelect() {
    const options = [];

    const form = useForm({
        mode: 'onBlur',
        defaultValues: {
            color: 2
        }
    });
    const [submitted, setSubmitted] = useState(false);

    return (
        <main className="flex w-full justify-center">
            <div className="flex w-full max-w-5xl flex-col text-3xl">
                <h1 className="flex justify-center p-2 lg:p-4">Form Page</h1>
                <FormProvider {...form}>
                    <FormControl component="form" className="flex flex-col gap-4" onSubmit={form.handleSubmit((data) => setSubmitted(true))}>
                        <div>
                            <Controller
                                name="color"
                                control={form.control}
                                render={({ field, formState: { errors } }) => (
                                    <FormControl className="w-32" variant="standard" error={errors.color ? true : false}>
                                        <FormLabel id="color-label">色</FormLabel>
                                        <Select labelId="color-label" id="color" label="color" {...field}>
                                            {['赤', '緑', '青'].map((x, i) => (
                                                <MenuItem key={x} value={i}>
                                                    {x}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText>{errors.color?.message as string}</FormHelperText>
                                    </FormControl>
                                )}
                            />
                        </div>
                        <div className="flex justify-center">
                            <Button className="w-32" type="submit" variant="contained" size="large">
                                送信
                            </Button>
                        </div>
                        <div className="flex justify-center">
                            <p className="text-lg font-semibold text-green-600">{submitted ? '送信されました' : ''}</p>
                        </div>
                    </FormControl>
                </FormProvider>

                <Button
                    className="w-32"
                    variant="contained"
                    size="large"
                    onClick={() => {
                        form.setValue('color', 0);
                    }}
                >
                    変更
                </Button>
            </div>
        </main>
    );
}

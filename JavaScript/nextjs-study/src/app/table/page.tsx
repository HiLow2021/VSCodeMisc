'use client';

import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { SnackbarProvider, closeSnackbar, enqueueSnackbar } from 'notistack';

export type Gender = (typeof Gender)[keyof typeof Gender];

export const Gender = {
    Male: 'Male',
    Female: 'Female',
    Other: 'Other'
} as const;

export default function Table() {
    const columns: GridColDef<(typeof rows)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 150,
            editable: true
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 150,
            editable: true
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 110,
            editable: true
        },
        {
            field: 'gender',
            headerName: 'Gender',
            width: 150,
            editable: true,
            type: 'singleSelect',
            valueOptions: Object.values(Gender)
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 110,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => enqueueSnackbar(JSON.stringify(params.row), { variant: 'info' })}
                >
                    Click
                </Button>
            )
        }
    ];

    const rows = [
        { id: 1, lastName: 'Smith', firstName: 'John', age: 14, gender: Gender.Male },
        { id: 2, lastName: 'Johnson', firstName: 'Jane', age: 31, gender: Gender.Female },
        { id: 3, lastName: 'Williams', firstName: 'James', age: 31, gender: Gender.Male },
        { id: 4, lastName: 'Brown', firstName: 'Emily', age: 11, gender: Gender.Female },
        { id: 5, lastName: 'Jones', firstName: 'Sarah', age: null, gender: Gender.Female },
        { id: 6, lastName: 'Garcia', firstName: 'Maria', age: 150, gender: Gender.Female },
        { id: 7, lastName: 'Miller', firstName: 'Michael', age: 44, gender: Gender.Male },
        { id: 8, lastName: 'Davis', firstName: 'David', age: 36, gender: Gender.Male },
        { id: 9, lastName: 'Martinez', firstName: 'Sophia', age: 65, gender: Gender.Female }
    ];

    return (
        <main className="flex w-full justify-center">
            <SnackbarProvider
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                action={(snackbarKey) => (
                    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
                        <CloseIcon className="text-white" />
                    </IconButton>
                )}
            />
            <div className="flex w-full max-w-5xl flex-col gap-8 text-3xl">
                <h1 className="flex w-full justify-center p-2 lg:p-4">Table Page</h1>
                <div className="flex justify-center">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5
                                }
                            }
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                </div>
            </div>
        </main>
    );
}

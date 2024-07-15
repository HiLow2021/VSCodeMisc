export type Gender = 'male' | 'female' | 'misc';

export const Gender = {
    Male: 'male',

    Female: 'female',

    Misc: 'misc',

    from: (gender: number): Gender => {
        switch (gender) {
            case 0:
                return Gender.Male;
            case 1:
                return Gender.Female;
            case 2:
                return Gender.Misc;
            default:
                throw Error("don't come here");
        }
    }
} as const;

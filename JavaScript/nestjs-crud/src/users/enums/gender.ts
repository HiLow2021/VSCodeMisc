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
    },

    to: (gender: Gender): number => {
        switch (gender) {
            case Gender.Male:
                return 0;
            case Gender.Female:
                return 1;
            case Gender.Misc:
                return 2;
            default:
                throw Error("don't come here");
        }
    }
} as const;

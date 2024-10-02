import { useEffect, useMemo, useState } from 'react';

type FormState = {
    [key: string]: any;
};

type ValidationFunction = (value: any) => boolean;
type ValidationResult = [ValidationFunction, string];

type FormValidations = {
    [key: string]: ValidationResult;
};

export const useForm = <T extends FormState>(initialForm: T = {} as T, formValidations: FormValidations = {}) => {
    const [formState, setFormState] = useState<T>(initialForm);
    const [formValidation, setFormValidation] = useState<{ [key: string]: string | null }>({});

    useEffect(() => {
        createValidators();
    }, [formState]);

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm]);

    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }
        return true;
    }, [formValidation]);

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };

    const createValidators = () => {
        const formCheckedValues: { [key: string]: string | null } = {};

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }

        setFormValidation(formCheckedValues);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    };
};

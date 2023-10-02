import { useRouter } from 'next/navigation';
import { forwardRef } from 'react';

interface BaseInputProps {
    type: string;
    placeholder?: string;
    name?: string;
    onChange?: (value: string) => void;
    className?: string;
}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange && props.onChange(e.target.value);
    };

    return (
        <input type={props.type} placeholder={props.placeholder} name={props.name} onChange={handleChange} className="border border-primary-black py-2 px-4 w-full text-primary-black" ref={ref} />
    );
});

export default BaseInput;
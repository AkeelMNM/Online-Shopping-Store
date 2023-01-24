import React from 'react';

type InputProps = {
	name: string;
	label: string;
	value: string;
	type: string;
	required: boolean;
	onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
	name,
	label,
	onChangeInput,
	value,
	type,
	required,
}: InputProps) => {
	return (
		<div className={inputStyle.inputContainer}>
			<label className={inputStyle.inputLabel}>{label}</label>
			<input
				name={name}
				type={type}
				value={value}
				onChange={onChangeInput}
				className={inputStyle.input}
				required={required}
			/>
		</div>
	);
};

const inputStyle = {
	inputContainer: 'mb-4',
	inputLabel: 'block mb-2 text-sm font-medium text-gray-900 ',
	input: 'bg-white border border-gray-300 text-black text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500',
};

export { Input };

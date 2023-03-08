import React from 'react';

type InputProps = {
	name: string;
	label: string;
	value: string;
	type: string;
	error: string;
	onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
	name,
	label,
	onChangeInput,
	value,
	type,
	error,
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
			/>
			{error && <span className={inputStyle.errorText}>{error}</span>}
		</div>
	);
};

const inputStyle = {
	inputContainer: 'mb-4',
	inputLabel: 'block mb-2 text-sm font-medium text-gray-900 ',
	input: 'form-control block w-full px-4 py-2 text-s font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none',
	errorText:
		'block mb-2 text-sm font-medium text-red-700 dark:text-red-500 mt-1 italic',
};

export { Input };

import React from 'react';

type CheckboxProps = {
	value: string;
	onSelect: (value: string) => void;
};

const Checkbox = ({ value, onSelect }: CheckboxProps) => {
	return (
		<div className={checkboxStyles.inputContainer}>
			<input
				type="checkbox"
				value={value}
				onChange={() => {
					onSelect(value);
				}}
				className={checkboxStyles.input}
			/>
			<label className={checkboxStyles.label}>{value}</label>
		</div>
	);
};

const checkboxStyles = {
	inputContainer: 'flex items-center mb-4',
	input: 'w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600',
	label: 'ml-2 text-sm font-medium text-gray-900 dark:text-black-300',
};

export { Checkbox };

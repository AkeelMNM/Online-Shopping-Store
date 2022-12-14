import React from 'react';

interface CheckboxProps {
	value: string;
	onSelect: (value: string) => void;
}

const Checkbox = (props: CheckboxProps) => {
	return (
		<div className="flex items-center mb-4">
			<input
				type="checkbox"
				value={props.value}
				onChange={() => {
					props.onSelect(props.value);
				}}
				className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
			/>
			<label className="ml-2 text-sm font-medium text-gray-900 dark:text-black-300">
				{props.value}
			</label>
		</div>
	);
};

export { Checkbox };

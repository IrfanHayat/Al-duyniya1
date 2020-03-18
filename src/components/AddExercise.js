import React, { useState, useRef } from 'react';
import SelectMedia from './SelectMedia';
import { useForm } from 'react-hook-form';
import api from '../apiCalls/api';
import { ToastContainer, createNotification } from '../components/Toast';
export default function AddExercise({ setNewExerciseData }) {
	const [open, setOpen] = useState(false);
	const [type, setType] = useState('');
	const [file, setFile] = useState('');
	const inputFile = useRef(null);
	const { register, handleSubmit } = useForm();

	//to get image

	const onSubmit = data => {
		let formdata = new FormData();
		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				formdata.append('' + key + '', data[key]);
			}
		}
		formdata.append('file', file);
		console.log(formdata.get('file'));

		api.addExercise(formdata).then(result => {
			if (result.status === 200) {
				setNewExerciseData(result.data);
				createNotification('success', result.data.Message);
			}
		});
	};
	return (
		<div className="col-sm-12 text-center">
			<ToastContainer />
			<h3>Add Excercise</h3>
			<div className="col-sm-12 text-left d-flex">
				<div className="col-sm-4 justify-content-center align-items-center d-flex flex-column position-relative">
					{open && (
						<SelectMedia
							type={type}
							setType={setType}
							setFile={setFile}
							setOpen={setOpen}
							ref={inputFile}
						/>
					)}
					<div
						className="plus-circle img-circle background-active shadow client-image d-flex text-center justify-content-center align-items-center p-2 mr-2"
						type="button"
						onClick={() => setOpen(!open)}
					>
						{file === '' ? (
							<i className="fas fa-plus text-grey font-36px text-light" />
						) : (
							<i className="far fa-check-circle text-grey font-36px text-light" />
						)}
					</div>
					<h4 className="py-2">Add Media</h4>
				</div>
				<div className="col-sm-8 justify-content-center d-flex flex-column">
					<div className="d-flex">
						Name
						<div className="ml-3 w-50 border-bottom-custom">
							<input
								type="text"
								className="border-0 w-100"
								name="name"
								ref={register({ required: true })}
							/>
						</div>
					</div>
					<div className="d-flex flex-column py-3">
						Discription
						<div className="border-active mt-2 w-75 h-100">
							<textarea
								className="w-100 h-100 p-0"
								name="description"
								ref={register({ required: true })}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="col-sm-12 text-center pb-3">
				<button className="btn btn-custom" type="submit" onClick={handleSubmit(onSubmit)}>
					Save
				</button>
			</div>
		</div>
	);
}
